import * as React from 'react'
import RNShake from 'react-native-shake'
import { useIsFocused } from '@react-navigation/native'
import { spyAlert } from '@core/alerts/spy-alert'

interface UseSpy {
  spyFlag: boolean;
  setSpyFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSpy = (
  value: any,
  defaultSpyFlag?: boolean,
): UseSpy => {
  const [ spyFlag, setSpyFlag ] = React.useState(defaultSpyFlag ?? false)
  const isFocused = useIsFocused()

  const onSpy = React.useCallback(() => {
    if (spyFlag) {
      spyAlert(value)
    }
  }, [ spyFlag, isFocused ])

  React.useEffect(() => {
    const subscription = RNShake.addListener(onSpy)

    if (spyFlag && !isFocused) {
      subscription?.remove?.()
    }

    return () => {
      subscription?.remove?.()
    }
  }, [ spyFlag, isFocused ])

  return { spyFlag, setSpyFlag }
}
