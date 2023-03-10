import * as R from 'ramda'
import { LETTER_SOAP } from '../../core/letter-card/letter-card.constants'
import slowa2 from '../../assets/slowa2'
import slowa3 from '../../assets/slowa3'
import slowa4 from '../../assets/slowa4'
import slowa5 from '../../assets/slowa5'
import slowa6 from '../../assets/slowa6'
import slowa7 from '../../assets/slowa7'
import slowa8 from '../../assets/slowa8'
import slowa9 from '../../assets/slowa9'

const allWordsByLength = ['', '', slowa2, slowa3, slowa4, slowa5, slowa6, slowa7, slowa8, slowa9]

export const findPossibleWords = async (
  selectedLetters: string[],
  [ minLength, maxLength ]: [ number, number ],
) => new Promise<string[]>((resolve) => {
  const allWords = R.times(
    (index: number) => allWordsByLength[minLength + index].split(','),
    maxLength - minLength + 1
  ).flat().reverse()

  // Map all words from database for specific length
  const result = allWords
    .filter((word: string) => {
      // If word which is currently in verification is longer than all possible letter -> RETURN FALSE
      const tooLongWord = word.length > selectedLetters.length
      if (tooLongWord) return false

      let soap_letters = selectedLetters.filter((letter: string) => letter === LETTER_SOAP)
      let _letters = selectedLetters.filter((letter: string) => letter !== LETTER_SOAP)
      let satisfiesLetters: null | boolean = null

      // Map all word characters (uppercase)
      word.toUpperCase().split('').forEach((char: string, index: number) => {
        // If word verification is complete (satisfiesLetters is NOT null) -> BREAK
        if (satisfiesLetters !== null) return

        const missingChar = !_letters.includes(char)
        const noSoapAvailable = !soap_letters.length

        // If there is no character and no soap available -> VERIFICATION FALSE
        if (missingChar && noSoapAvailable) {
          satisfiesLetters = false
          return
        }

        if (missingChar) {
          // If there is no character but soap available -> use one soap
          soap_letters = R.dropLast(1, soap_letters)
        } else {
          // If there is given character -> drop one character
          const charIndex = _letters.findIndex((_char: string) => _char === char)
          _letters = R.remove(charIndex, 1, _letters)
        }

        // When loop get to last character -> VERIFICATION TRUE 
        if (index === word?.length - 1) {
          satisfiesLetters = true
        }
      })

      // Return verification flag
      return satisfiesLetters
    })

  // Resolve with all possible words
  resolve(result)
})
