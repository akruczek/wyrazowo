import * as React from 'react'
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native'

export const useNativeDBEvents = (
  resultCallback: (result: string[]) => void,
) => {
  React.useEffect(() => {
    const eventEmitter = Platform.OS === 'android' ? null : new NativeEventEmitter(NativeModules.EventEmitter) as any

    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('findPossibleWordsResult', (result: string) => {
        resultCallback(JSON.parse(result))
      })
    } else {
      eventEmitter.addListener('findPossibleWordsResult', (result: string[]) => {
        resultCallback(result)
      })
    }

    return () => {
      if (Platform.OS === 'ios') {
        eventEmitter.removeAllListeners(NativeModules.EventEmitter)
      } else {
        DeviceEventEmitter.removeAllListeners('findPossibleWordsResult')
      }
    }
  }, [])
}
