import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { useSelector } from 'react-redux'
import { Storage } from '@core/storage/storage'
import { SearchResultModel } from '@core/storage/storage.models'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { searchHistoryTimestampSelector } from '../store/dashboard.selectors'

interface UseSearchHistory {
  historyModalizeRef: React.MutableRefObject<any>;
  openHistoryModal: () => void;
  historyAvailable: boolean;
  setHistoryAvailable: (historyAvailable: boolean) => void;
}

export const useSearchHistory = (): UseSearchHistory => {
  const historyModalizeRef = React.useRef<Modalize>(null)
  const searchHistoryTimestamp = useSelector(searchHistoryTimestampSelector)
  const [ historyAvailable, setHistoryAvailable ] = React.useState(false)

  const checkHistoryAvailable = () => {
    Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT).then(result => {
      setHistoryAvailable(!!result?.length && result.length > 0)
    })
  }

  React.useEffect(() => {
    checkHistoryAvailable()
  }, [ searchHistoryTimestamp ])

  const openHistoryModal = () => {
    historyModalizeRef?.current?.open?.()
  }

  return { historyModalizeRef, openHistoryModal, historyAvailable, setHistoryAvailable }
}
