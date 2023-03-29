import * as React from 'react'
import { FlatList } from 'react-native'
import { Modalize } from 'react-native-modalize'
import { Portal } from 'react-native-portalize'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { Storage } from '../../../core/storage/storage'
import { STORAGE_KEY } from '../../../core/storage/storage.constants'
import { SearchResultModel } from '../../../core/storage/storage.models'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'
import { SearchHistoryModalItem } from './search-history-modal-item'
import { SearchHistoryModalContainer } from './search-history-modal.styled'

interface Props {
  historyModalizeRef: React.MutableRefObject<any>;
  soapCharactersIndexes: (word: string, _selectedLetters?: string[]) => number[];
  historyAvailable: boolean;
  setHistoryAvailable: (historyAvailable: boolean) => void;
}

export const SearchHistoryModal = ({
  historyModalizeRef, historyAvailable, soapCharactersIndexes, setHistoryAvailable,
}: Props) => {
  const { top: topInset } = useSafeAreaInsets()
  const [ searchHistory, setSearchHistory ] = React.useState<SearchResultModel[] | null>([])

  React.useEffect(() => {
    if (!historyAvailable && searchHistory?.length) {
      setHistoryAvailable(true)
    }
  }, [ searchHistory?.length ])
  
  const getSearchHistory = () => {
    Storage.get<SearchResultModel[]>(STORAGE_KEY.SEARCH_RESULT).then(setSearchHistory)
  }

  React.useEffect(getSearchHistory, [])

  return (
    <Portal>
      <Modalize
        ref={historyModalizeRef}
        modalTopOffset={topInset + BOTTOM_NAVIGATION_HEIGHT + 30}
        onOpen={getSearchHistory}
        disableScrollIfPossible
        avoidKeyboardLikeIOS
        useNativeDriver
      >
        <SearchHistoryModalContainer>
          <FlatList
            renderItem={({ item }) => (
              <SearchHistoryModalItem {...{ item, soapCharactersIndexes }} />
            )}
            data={searchHistory}
            scrollEnabled={false}
          />
        </SearchHistoryModalContainer>
      </Modalize>
    </Portal>
  )
}
