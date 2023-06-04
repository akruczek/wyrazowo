import * as React from 'react'
import { Keyboard } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { useNavigation } from '@react-navigation/native'
import { getNavigationParam } from '../../navigation/navigation.helpers'

interface UseDictionarlyPlayProgress {
  progress: number;
  steps: number;
  setChances: React.Dispatch<React.SetStateAction<number>>;
}

export const useDictionarlyPlayProgress = (
  modalizeRef: React.MutableRefObject<Modalize | null>,
): UseDictionarlyPlayProgress => {
  const navigation = useNavigation()
  const DEFAULT_CHANCES = 12

  const difficulty = getNavigationParam<number>('difficulty', navigation)
  const CHANCES = [ 14, 12, 10, 8 ][difficulty] ?? DEFAULT_CHANCES

  const [ chances, setChances ] = React.useState(CHANCES)

  React.useEffect(() => {
    if (!chances) {
      Keyboard.dismiss()
      modalizeRef?.current?.open?.()
    }
  }, [ chances ])

  return {
    progress: CHANCES - chances,
    steps: CHANCES,
    setChances,
  }
}
