import * as R from 'ramda'

export const findPossibleWords = async (
  allWords: string[],
  selectedLetters: string[],
  handleSetSearchingWord: (searchingWord: string) => void,
) => new Promise<string[]>((resolve) => {
  // let time = new Date().getTime()

  const result = allWords.filter((word: string) => {
    if (handleSetSearchingWord) handleSetSearchingWord(word)

    const tooLongWord = word.length > selectedLetters.length

    if (tooLongWord) {
      return false
    }

    let _letters = selectedLetters
    let satisfiesLetters: null | boolean = null

    word.toUpperCase().split('').forEach((char: string, index: number) => {
      if (satisfiesLetters !== null) return

      const missingChar = !_letters.includes(char)

      if (missingChar) {
        satisfiesLetters = false
        return
      }

      const charIndex = _letters.findIndex((_char: string) => _char === char)
        _letters = R.remove(charIndex, 1, _letters)

      if (index === word?.length - 1) {
        satisfiesLetters = true
      }
    })

    return satisfiesLetters
  })

  resolve(result)
})
