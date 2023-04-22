import * as R from 'ramda'
import slowa2 from '@assets/slowa2'
import slowa3 from '@assets/slowa3'
import slowa4 from '@assets/slowa4'
import slowa5 from '@assets/slowa5'
import slowa6 from '@assets/slowa6'
import slowa7 from '@assets/slowa7'
import slowa8 from '@assets/slowa8'
import slowa9 from '@assets/slowa9'
import { NumberFlag } from '@core/models'
import { LETTER_INDEX_SEPARATOR, LETTER_SOAP, LETTER_SOAP_PLACEHOLDER } from '@core/letter-card/letter-card.constants'
import { DB } from '../../native-db/native-db'
import { NATIVE_DB_TAG } from '../../native-db/native-db.constants'
import { longWordsByLength } from './find-possible-long-words.helper'

export const allWordsByLength = ['', '', slowa2, slowa3, slowa4, slowa5, slowa6, slowa7, slowa8, slowa9]

const log = (enabled: boolean, wordFilter: string | null, word: string, message: string) => {
  if (enabled && (word === wordFilter || !wordFilter)) {
    console.log(message)
  }
}

export const findPossibleWords = async (
  selectedLetters: string[],
  [ minLength, maxLength ]: [ number, number ],
  nativeSearchEngineEnabled: NumberFlag | null,
) => new Promise<string[]>((resolve) => {
  const LOGS_ENABLED = false
  const LOGS_WORD_FILTER = ''

  const allWords = R.times(
    (index: number) => (allWordsByLength[minLength + index] ?? longWordsByLength[minLength + index]).split('.'),
    maxLength - minLength + 1
  ).flat().reverse()

  // Native search engine (native DBModule)
  if (nativeSearchEngineEnabled) {
    DB.findPossibleWords(allWords, selectedLetters)
    resolve([ NATIVE_DB_TAG ])
    return [ NATIVE_DB_TAG ]
  }

  // Map all words from database for specific length
  const result = allWords
    .filter((word: string) => {
      const _log = (message: string) => log(LOGS_ENABLED, LOGS_WORD_FILTER, word, message)

      // If word which is currently in verification is longer than all possible letter -> RETURN FALSE
      const tooLongWord = word.length > selectedLetters.length
      _log(`#1 ${word}, tooLongWord: ${tooLongWord}`)
      if (tooLongWord) return false

      let soap_letters = selectedLetters
        .filter((letter: string) => letter === LETTER_SOAP)

      _log(`#2 ${word}, soap_letters: ${soap_letters}`)

      let custom_soap_letters = selectedLetters
        .filter((letter: string) => letter.includes(LETTER_SOAP_PLACEHOLDER))
        .map((customSoapLetters: string) => customSoapLetters.split(LETTER_SOAP_PLACEHOLDER))

      let force_index_letters = selectedLetters
        .filter((letter: string) => letter.includes(LETTER_INDEX_SEPARATOR))

      _log(`#2.1 ${word}, custom_soap_letters: ${custom_soap_letters}`)

      let _letters = selectedLetters
        .filter((letter: string) => letter !== LETTER_SOAP && !letter.includes(LETTER_SOAP_PLACEHOLDER))

      _log(`#3 ${word}, _letters: ${_letters}`)

      let satisfiesLetters: null | boolean = null

      // Map all word characters (uppercase)
      word.toUpperCase().split('').forEach((char: string, index: number) => {
        // If word verification is complete (satisfiesLetters is NOT null) -> BREAK
        if (satisfiesLetters !== null) return

        const forcedIndexes = force_index_letters
          .map((forcedIndexLetter: string) => Number(forcedIndexLetter?.split?.(LETTER_INDEX_SEPARATOR)?.[1]))

        // If there is forced index for given letter - verify letter at this index
        if (forcedIndexes.includes(index)) {
          const forcedIndexLetter = force_index_letters
            .find((_forcedIndexLetter: string) =>
              Number(_forcedIndexLetter?.split?.(LETTER_INDEX_SEPARATOR)?.[1]) === index,
            )

          _log(`#3.1 ${word}, forcedIndexes: ${forcedIndexes}, forcedIndexLetter: ${forcedIndexLetter}, char: ${char}, index: ${index}, forcedIndexLetter: ${forcedIndexLetter}`)
          if (forcedIndexLetter?.split?.(LETTER_INDEX_SEPARATOR)?.[0] === char) {
            const forcedIndexLetterIndex = force_index_letters
              .findIndex((_forcedIndexLetter: string) =>
                Number(_forcedIndexLetter?.split?.(LETTER_INDEX_SEPARATOR)?.[1]) === index,
              )

            _log(`#3.2 ${word}, forcedIndexLetterIndex: ${forcedIndexLetterIndex}, force_index_letters: ${force_index_letters}`)
            force_index_letters = R.remove(forcedIndexLetterIndex, 1, force_index_letters)

            // Additional check for last character in word
            if (index === word?.length - 1) {
              _log(`#3.3 ${word}, char: ${char}, satisfiesLetters: TRUE`)
              satisfiesLetters = true
            }
          } else {
            satisfiesLetters = false
          }

          return
        }

        const missingChar = !_letters.includes(char)
        const noSoapAvailable = !soap_letters.length
        const noCustomSoapAvailable = !custom_soap_letters.length

        _log(`#4 ${word}, char: ${char}, missingChar: ${missingChar}, noSoapAvailable: ${noSoapAvailable}, noCustomSoapAvailable: ${noCustomSoapAvailable}`)

        // If there is no character and no soap available -> VERIFICATION FALSE
        if (missingChar && noSoapAvailable && noCustomSoapAvailable) {
          _log(`#5 ${word}, char: ${char}, satisfiesLetters: FALSE`)
          satisfiesLetters = false
          return
        }

        if (missingChar) {
          const customSoapLetterAvailableIndexes = custom_soap_letters
            .map((customSoapLetters: string[], index: number) => customSoapLetters.includes(char) ? index : false)
            .filter((index: number | false) => index !== false) as number[]

          _log(`#5.1 ${word}, char: ${char}, customSoapLetterAvailableIndexes: ${customSoapLetterAvailableIndexes}`)

          // If there is character available in custom soap letters -> use one custom soap
          if (customSoapLetterAvailableIndexes.length) {
            custom_soap_letters = R.remove(customSoapLetterAvailableIndexes[0], 1, custom_soap_letters)
          } else {
            // If no more soap available -> VERIFICATION FALSE
            if (noSoapAvailable) {
              satisfiesLetters = false
              return
            } else {
              // If there is no character but soap available -> use one soap
              soap_letters = R.dropLast(1, soap_letters)
            }
          }
        } else {
          // If there is given character -> drop one character
          const charIndex = _letters.findIndex((_char: string) => _char === char)
          _letters = R.remove(charIndex, 1, _letters)
        }

        _log(`#6 ${word}, char: ${char}, soap_letters: ${soap_letters}`)
        _log(`#7 ${word}, char: ${char}, _letters: ${_letters}`)

        // When loop get to last character -> VERIFICATION TRUE 
        if (index === word?.length - 1) {
          _log(`#8 ${word}, char: ${char}, satisfiesLetters: TRUE`)
          satisfiesLetters = true
        }
      })

      _log(`#9 ${word}, satisfiesLetters: ${satisfiesLetters}`)

      // Return verification flag
      return satisfiesLetters
    })

  // Resolve with all possible words
  resolve(result)
})
