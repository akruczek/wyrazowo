import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { allWordsByLength } from '../../dashboard/helpers'
import { getRandomWords } from '../../dictionary/helpers'
import { SCREEN } from '../../navigation/navigation.constants'

interface UseCharadePlay {
  handlePlayCharade: () => void;
  count: number;
  setCount: (count: number) => void;
}

export const useCharadePlay = (): UseCharadePlay => {
  const DEFAULT_COUNT = 5

  const [ count, setCount ] = React.useState(DEFAULT_COUNT)
  const navigation = useNavigation<any>()

  const handlePlayCharade = () => {
    const getWords = (words: string[]) => getRandomWords(words, (word: string) => word.length === count)
    const allWords = getWords(allWordsByLength)
    const word = allWords[Math.floor(Math.random() * allWords.length)]?.toUpperCase?.()
    navigation.navigate(SCREEN.CHARADE_PLAY, { word, allWords })
  }

  return { handlePlayCharade, count, setCount }
}
