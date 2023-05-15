import { useNavigation } from '@react-navigation/native'
import { getNavigationParam } from '../../navigation/navigation.helpers'

interface UseCharadeWords {
  word: string;
  allWords: string[];
}

export const useCharadeWords = (): UseCharadeWords => {
  const navigation = useNavigation()
  const word = getNavigationParam<string>('word', navigation)
  const allWords = getNavigationParam<string[]>('allWords', navigation)

  return { word, allWords }
}