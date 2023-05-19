import * as React from 'react'
import { Keyboard } from 'react-native'
import { Modalize } from 'react-native-modalize'

interface UseDictionarlyPlayProgress {
  progress: number;
  steps: number;
  setChances: React.Dispatch<React.SetStateAction<number>>;
}

export const useDictionarlyPlayProgress = (
  modalizeRef: React.MutableRefObject<Modalize | null>,
): UseDictionarlyPlayProgress => {
  const DEFAULT_CHANCES = 10

  const [ chances, setChances ] = React.useState(DEFAULT_CHANCES)

  React.useEffect(() => {
    if (!chances) {
      Keyboard.dismiss()
      modalizeRef?.current?.open?.()
    }
  }, [ chances ])

  return {
    progress: DEFAULT_CHANCES - chances,
    steps: DEFAULT_CHANCES,
    setChances,
  }
}
