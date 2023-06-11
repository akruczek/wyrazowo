import * as React from 'react'
import * as R from 'ramda'
import { Modalize } from 'react-native-modalize'
import { Keyboard } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { allWordsByLength, longWordsByLength } from '../../dashboard/helpers'
import { getNavigationParam } from '../../navigation/navigation.helpers'
import { appendSortedWords, getDictionaryWords } from '../helpers'

interface UseDictionarlyPlay {
  wordsLength: number;
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
    setValue(newValue.trim())
  }

  const onSend = () => {
    const allWords = wordsLength ? getDictionaryWords(longWordsByLength) : getDictionaryWords(allWordsByLength)

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
      Keyboard.dismiss()
      modalizeRef?.current?.open?.()
    }

    setChances(R.dec)
  }

  const word = getNavigationParam<string>('word', navigation)
  const wordsLength = getNavigationParam<number>('wordsLength', navigation)

  console.log('word: ', word)

  return { wordsLength, value, wordsBefore, wordsAfter, word, state, handleChange, onSend }
}
