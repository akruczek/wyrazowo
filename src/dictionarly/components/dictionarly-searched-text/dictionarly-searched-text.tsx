import * as React from 'react'
import { DictionarlyText } from '../dictionarly-play/dictionarly-play.styled'
import { isCharOK, getSearchedWordContent } from '../../helpers'

interface Props {
  searchedWords: string[];
  word: string;
}

export const DictionarlySearchedText = ({ searchedWords, word }: Props) => (
  <>
    {searchedWords.map((searchedWord: string) => (
      <DictionarlyText key={searchedWord}>
        {searchedWord.split('').map((char: string, index: number) => (
          <DictionarlyText
            isOK={isCharOK(searchedWord, word)(index)}
            key={`${searchedWord}-${char}-${index}`}
            children={getSearchedWordContent(char, index, searchedWord, word)}
          />
        ))}
      </DictionarlyText>
    ))}
  </>
)
