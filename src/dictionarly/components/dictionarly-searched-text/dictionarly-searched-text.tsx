import * as React from 'react'
import { Tx } from '@core/tx'
import { isCharOK, getSearchedWordContent } from '../../helpers'

interface Props {
  searchedWords: string[];
  word: string;
}

export const DictionarlySearchedText = ({ searchedWords, word }: Props) => (
  <>
    {searchedWords.map((searchedWord: string, groupIndex: number) => (
      <Tx key={`${searchedWord}-${groupIndex}`} themeColor="textSecondary" margins={[ 0, 0, 0, 10 ]} XL>
        {searchedWord.split('').map((char: string, index: number) => (
          <Tx
            key={`${searchedWord}-${char}-${index}`}
            tx={getSearchedWordContent(char, index, searchedWord, word)}
            ok={isCharOK(searchedWord, word)(index)}
            themeColor="textSecondary"
            margins={[ 0, 0, 0, 10 ]}
            XL
          />
        ))}
      </Tx>
    ))}
  </>
)
