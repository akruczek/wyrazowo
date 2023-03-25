import * as React from 'react'
import { Modalize } from 'react-native-modalize'

interface UseSearchHistory {
  historyModalizeRef: React.MutableRefObject<any>;
  openHistoryModal: () => void;
  historyAvailable: boolean;
  setHistoryAvailable: (historyAvailable: boolean) => void;
}

export const useSearchHistory = (): UseSearchHistory => {
  const historyModalizeRef = React.useRef<Modalize>(null)
  const [ historyAvailable, setHistoryAvailable ] = React.useState(false)

  const openHistoryModal = () => {
    historyModalizeRef?.current?.open?.()
  }

  return { historyModalizeRef, openHistoryModal, historyAvailable, setHistoryAvailable }
}
