import * as React from 'react'
import { AnyAction } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { Storage } from '../storage/storage'
import { STORAGE_KEY } from '../storage/storage.constants'

interface UseRehydrateStore<V> {
  value: V | null;
  isPending: boolean;
}

export const useRehydrateStore = <V>(
  key: STORAGE_KEY,
  action: (value: V) => AnyAction,
  raw?: boolean,
): UseRehydrateStore<V> => {
  const [ value, setValue ] = React.useState<V | null>(null)
  const [ isPending, setPending ] = React.useState(true)

  const dispatch = useDispatch()

  React.useEffect(() => {
    Storage.get(key, raw).then((value: any) => {
      setValue(value)
      setPending(false)
      dispatch(action(value))
    })
  }, [])

  return { value, isPending }
}
