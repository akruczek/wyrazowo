import * as React from 'react'
import * as R from 'ramda'
import { allWordsByLength } from '../../dashboard/helpers/find-possible-words.helper'
import { longWordsByLength } from '../../dashboard/helpers/find-possible-long-words.helper'

interface UseDictionaryWord {
  state: boolean | null;
  isPending: boolean;
  wordFromDB: string | null;
  word: string;
  handlePressRandom: () => void;
  handleChange: (_word: string) => void;
  onSearch: () => void;
}

export const useDictionaryWord = (): UseDictionaryWord => {
  const [ word, setWord ] = React.useState('')
  const [ state, setState ] = React.useState<boolean | null>(null)
  const [ isPending, setPending ] = React.useState(false)
  const [ wordFromDB, setWordFromDB ] = React.useState<null | string>(null)

  const handlePressRandom = () => {
    setWord('')
    setState(null)
    setPending(true)
    setWordFromDB(null)

    setTimeout(() => {
      const getWords = (words: string[]) => words
        .map((str: string) => str.length > 0 ? str.split(',') : null)
        .filter((elements: string[] | null) => elements !== null)
        .flat() as string[]
  
      const allWords = [ ...getWords(allWordsByLength), ...getWords(longWordsByLength) ]
      const random = Math.floor(Math.random() * allWords.length)
  
      setWordFromDB(allWords[random])
      setWord(allWords[random].toUpperCase())
      setState(true)
      setPending(false)
    })
  }

  const handleChange = (_word: string) => {
    setState(null)
    setWordFromDB(null)
    setWord(_word)
  }

  const onSearch = () => {
    if (word.length < 2) {
      setState(false)
      return
    }

    setPending(true)
    setTimeout(() => {
      const _wordFromDB = R.pipe<string[], any[], string | undefined>(
        R.split(','),
        R.find(
          R.equals(
            R.toLower(word),
          ),
        ),
      )(allWordsByLength[word.length] ?? longWordsByLength[word.length] ?? [])

      setPending(false)
      setState(!!_wordFromDB?.length)

      if (_wordFromDB?.length) {
        setWordFromDB(_wordFromDB)
      }
    })
  }

  return { state, word, isPending, wordFromDB, handlePressRandom, handleChange, onSearch }
}
