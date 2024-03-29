import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { SCREEN } from '../../navigation/navigation.constants'
import { allWordsByLength, longWordsByLength } from '../../dashboard/helpers'

interface UsePlayDictionarly {
  handlePlay: () => void;
  wordsLength: number;
  setWordsLength: React.Dispatch<React.SetStateAction<number>>;
  difficulty: number;
  setDifficulty: React.Dispatch<React.SetStateAction<number>>;
}

export const usePlayDictionarly = (): UsePlayDictionarly => {
  const [ wordsLength, setWordsLength ] = React.useState<number>(0)
  const [ difficulty, setDifficulty ] = React.useState<number>(1)

  const navigation = useNavigation<any>()

  const handlePlay = () => {
    const getWords = (words: string[]) => words
      .map((str: string) => str.length > 0 ? str.split('.') : null)
      .filter((elements: string[] | null) => elements !== null)
      .flat<any, number>()

    const allWords = wordsLength ? getWords(longWordsByLength) : getWords(allWordsByLength)
    const word = allWords[Math.floor(Math.random() * allWords.length)]?.toUpperCase?.()
    navigation.navigate(SCREEN.DICTIONARY_PLAY, { word, wordsLength, difficulty })
  }

  return { handlePlay, wordsLength, setWordsLength, difficulty, setDifficulty }
}
