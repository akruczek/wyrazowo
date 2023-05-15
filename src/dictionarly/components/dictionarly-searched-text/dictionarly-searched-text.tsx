import * as React from 'react'
import { DictionarlyText } from '../dictionarly-play/dictionarly-play.styled'
import { isCharOK } from 'dictionary/helpers'

interface Props {
  searchedWords: string[];
  word: string;
}

export const DictionarlySearchedText = ({ searchedWords, word }: Props) => {
  return (
    <>
      {searchedWords.map((searchedWord: string) => (
        <DictionarlyText key={searchedWord}>
          {searchedWord.split('').map((char: string, index: number) => (
            <DictionarlyText
              isOK={isCharOK(searchedWord, word)(index)}
              key={`${searchedWord}-${char}-${index}`}
              children={char}
            />
          ))}
        </DictionarlyText>
      ))}
    </>
  )
}
