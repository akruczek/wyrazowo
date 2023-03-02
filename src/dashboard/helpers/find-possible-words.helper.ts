import * as R from 'ramda'
import { LETTER_SOAP } from '../../core/letter-card/letter-card.constants'

interface PromiseReturn {
  result: string[];
  searchBreakIndex: number;
}

export const findPossibleWords = async (
  allWords: string[],
  selectedLetters: string[],
  wordLength: [ number, number ],
  [ maxResults, searchIndex ]: [ number, number ],
) => new Promise<PromiseReturn>((resolve) => {
  // Time breakpoint for performance testing
  // let time = new Date().getTime()

  let resultsCount = 0
  let searchBreakIndex = 0
  const wordsToSearch = allWords.slice(searchIndex ?? 0)

  // Map all words from database
  const result = wordsToSearch.filter((word: string, wordIndex: number) => {
    // If maxResult reached -> RETURN FALSE
    if (resultsCount >= maxResults) {
      if (!searchBreakIndex) {
        searchBreakIndex = wordIndex
      }
      return false
    }

    // If word which is currently in verification does not match word length selected from slider -> RETURN FALSE
    const wordDoesNotMatchWordLength = word.length < wordLength[0] || word.length > wordLength[1]
    if (wordDoesNotMatchWordLength) return false

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
        resultsCount += 1
        satisfiesLetters = true
      }
    })

    // Return verification flag
    return satisfiesLetters
  })

  // Resolve with all possible words
  resolve({ result, searchBreakIndex })
})
