import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useHapticFeedback } from '@core/hooks/use-haptic-feedback.hook'
import { allWordsByLength, longWordsByLength } from '../../dashboard/helpers'
import { DictionaryRandomFiltersModel } from '../dictionary.models'
import { getRandomWords } from '../helpers/get-random-words.helper'
import { getWordFromDB } from '../helpers/get-word-from-db.helper'

interface UseDictionaryWord {
  state: boolean | null;
  isPending: boolean;
  wordFromDB: string | null;
  word: string;
  handlePressRandom: () => void;
  handleLongPressRandom: () => void;
  handleChange: (_word: string) => void;
  onSearch: () => void;
}

export const useDictionaryWord = (
  customizeRandomModalizeRef: React.MutableRefObject<Modalize>,
  filtersRef: React.MutableRefObject<DictionaryRandomFiltersModel | null>
): UseDictionaryWord => {
  const [ word, setWord ] = React.useState('')
  const [ state, setState ] = React.useState<boolean | null>(null)
  const [ isPending, setPending ] = React.useState(false)
  const [ wordFromDB, setWordFromDB ] = React.useState<null | string>(null)

  const { triggerHaptic } = useHapticFeedback()

  const filterRandomResults = (word: string) => filtersRef.current?.minMax
    ? word.length >= filtersRef.current?.minMax[0] && word.length <= filtersRef.current?.minMax[1]
    : true

  const handlePressRandom = () => {
    triggerHaptic()
    setPending(true)
    setWord('')
    setState(null)
    setWordFromDB(null)

    setTimeout(() => {
      const getWords = (words: string[]) => getRandomWords(words, filterRandomResults)
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
      const _wordFromDB = getWordFromDB(word)(allWordsByLength[word.length] ?? longWordsByLength[word.length] ?? [])
      setState(!!_wordFromDB?.length)

      if (_wordFromDB?.length) {
        setWordFromDB(_wordFromDB)
      }

      setPending(false)
    })
  }

  const handleLongPressRandom = () => {
    triggerHaptic()
    customizeRandomModalizeRef?.current?.open?.()
  }

  return { state, word, isPending, wordFromDB, handlePressRandom, handleLongPressRandom, handleChange, onSearch }
}
