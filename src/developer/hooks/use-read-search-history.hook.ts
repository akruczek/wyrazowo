import * as React from 'react'
import { NativeModules } from 'react-native'
import { useDispatch } from 'react-redux'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { setSearchHistoryTimestampAction } from '../../dashboard/store/dashboard.slice'

export const useReadSearchHistory = () => {
  const dispatch = useDispatch()

  const importSearchHistory = React.useCallback(async () => {
    const searchHistory: string = await NativeModules.FSModule.readSearchHistory()
    await Storage.set(STORAGE_KEY.SEARCH_RESULT, searchHistory)
    dispatch(setSearchHistoryTimestampAction(new Date().getTime()))
  }, [ dispatch ])

  return { importSearchHistory }
}
