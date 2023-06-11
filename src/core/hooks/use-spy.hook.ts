import { spyAlert } from '@core/alerts/spy-alert'
import * as React from 'react'
import { EmitterSubscription } from 'react-native'
import RNShake from 'react-native-shake'

interface UseSpy {
  spyFlag: boolean;
  setSpyFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useSpy = (
  value: any,
  defaultSpyFlag?: boolean,
): UseSpy => {
  let subscription: any

  const [ spyFlag, setSpyFlag ] = React.useState(defaultSpyFlag ?? false)

  const onSpy = React.useCallback(() => {
    console.log('spyFlag: ', spyFlag)
    if (spyFlag) {
      spyAlert(value)
    }
  }, [ spyFlag ])

  React.useEffect(() => {
    if (spyFlag) {
      subscription = RNShake.addListener(onSpy)
    }
  }, [ spyFlag ])

  React.useEffect(() => {
    return () => {
      subscription?.remove?.()
    }
  }, [])

  return { spyFlag, setSpyFlag }
}
