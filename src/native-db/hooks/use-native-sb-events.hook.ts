import * as React from 'react'
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native'

export const useNativeDBEvents = () => {
  React.useEffect(() => {
    const eventEmitter = new NativeEventEmitter(NativeModules.EventEmitter)

    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('findPossibleWordsResult', (result: string) => {
        console.log('FROM NATIVE: findPossibleWordsResult: ', JSON.parse(result)[0])
      })
    } else {
      eventEmitter.addListener('findPossibleWordsResult', (result: string) => {
        console.log('FROM NATIVE: findPossibleWordsResult: ', result)
      })
    }

    return () => {
      eventEmitter.removeAllListeners(NativeModules.EventEmitter)
      DeviceEventEmitter.removeAllListeners()
    }
  }, [])
}