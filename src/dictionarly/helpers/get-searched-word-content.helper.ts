import { isCharOK } from './is-char-ok.helper'

export const getSearchedWordContent = (
  char: string,
  index: number,
  searchedWord: string,
  word: string,
) => {
  return `${char}${index === searchedWord.length - 1 && isCharOK(searchedWord, word)(index) ?  '...' : ''}`
}
