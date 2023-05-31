import * as React from 'react'
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'

export const useReadSearchHistory = () => {
  const eventEmitter = Platform.OS === 'android'
    ? null
    : new NativeEventEmitter(NativeModules.EventEmitter) as any

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('readSearchHistory', (searchHistory: string) => {
        Storage.set(STORAGE_KEY.SEARCH_RESULT, searchHistory)
      })
    } else {
      eventEmitter.addListener('readSearchHistory', (searchHistory: string) => {
        Storage.set(STORAGE_KEY.SEARCH_RESULT, searchHistory)
      })
    }
  }, [])
}
