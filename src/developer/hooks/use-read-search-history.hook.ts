import * as React from 'react'
import { useDispatch } from 'react-redux'
import { DeviceEventEmitter, NativeEventEmitter, NativeModules, Platform } from 'react-native'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { setSearchHistoryTimestampAction } from '../../dashboard/store/dashboard.slice'

export const useReadSearchHistory = () => {
  const dispatch = useDispatch()

  const eventEmitter = Platform.OS === 'android'
    ? null
    : new NativeEventEmitter(NativeModules.EventEmitter) as any

  React.useEffect(() => {
    if (Platform.OS === 'android') {
      DeviceEventEmitter.addListener('readSearchHistory', (searchHistory: string) => {
        Storage.set(STORAGE_KEY.SEARCH_RESULT, searchHistory)
        dispatch(setSearchHistoryTimestampAction(new Date().getTime()))
      })
    } else {
      eventEmitter.addListener('readSearchHistory', (searchHistory: string) => {
        Storage.set(STORAGE_KEY.SEARCH_RESULT, searchHistory)
        dispatch(setSearchHistoryTimestampAction(new Date().getTime()))
      })
    }
  }, [])
}
