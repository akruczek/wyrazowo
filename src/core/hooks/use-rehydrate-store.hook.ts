import * as React from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { Storage } from '../storage/storage'
import { STORAGE_KEY } from '../storage/storage.constants'

export const useRehydrateStore = (
  key: STORAGE_KEY,
  action: (value: any) => AnyAction,
) => {
  const dispatch = useDispatch()

  React.useEffect(() => {
    Storage.get(key).then((value: any) => {
      dispatch(action(value))
    })
  }, [])
}
