import * as React from 'react'
import * as R from 'ramda'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { allWordsByLength, longWordsByLength } from '../../dashboard/helpers'
import { getNavigationParam } from '../../navigation/navigation.helpers'
import { appendSortedWords, getDictionaryWords } from '../helpers'

interface UseDictionarlyPlay {
  difficulty: number;
  value: string;
  wordsBefore: string[];
  wordsAfter: string[];
  word: string;
  state: boolean | null;
  handleChange: (newValue: string) => void;
  onSend: () => void;
}

export const useDictionarlyPlay = (
  setChances: React.Dispatch<React.SetStateAction<number>>,
  modalizeRef: React.MutableRefObject<Modalize | null>,
): UseDictionarlyPlay => {
  const navigation = useNavigation()

  const [ state, setState ] = React.useState<boolean | null>(null)
  const [ value, setValue ] = React.useState<string>('')
  const [ wordsAfter, setWordsAfter ] = React.useState<string[]>([])
  const [ wordsBefore, setWordsBefore ] = React.useState<string[]>([])

  const handleChange = (newValue: string) => {
    setState(null)
    setValue(newValue)
  }

  const onSend = () => {
    const allWords = difficulty ? getDictionaryWords(longWordsByLength) : getDictionaryWords(allWordsByLength)

    if (!allWords.includes(value.toLowerCase())) {
      setState(false)
      return
    }

    const comparison = value.localeCompare(word)

    if (comparison > 0) {
      setWordsAfter(appendSortedWords(value))
      setValue('')
    } else if (comparison < 0) {
      setWordsBefore(appendSortedWords(value))
      setValue('')
    } else {
      setState(true)
      modalizeRef?.current?.open?.()
    }

    setChances(R.dec)
  }

  const word = getNavigationParam<string>('word', navigation)
  const difficulty = getNavigationParam<number>('difficulty', navigation)

  return { difficulty, value, wordsBefore, wordsAfter, word, state, handleChange, onSend }
}
