import * as React from 'react'
import * as R from 'ramda'
import app from '../../package.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { MoreActivityIndicatorWrapper, MoreContainer } from './more.styled'
import { ListedOption } from './components/listed-option/listed-option'
import { CustomSwitch } from '../core/custom-switch/custom-switch'
import { TEXT_SIZE } from '../core/text/text.constants'
import { ActivityIndicator, FlatList, Platform, TouchableOpacity } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { hapticFeedbackEnabledSelector, nativeSearchEngineEnabledSelector } from '../settings/store/settings.selectors'
import { setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction } from '../settings/store/settings.slice'
import { useRehydrateStore } from '../core/hooks/use-rehydrate-store.hook'
import { STORAGE_KEY } from '../core/storage/storage.constants'
import { Storage } from '../core/storage/storage'
import { CustomButton } from '../core/custom-button/custom-button'
import { COLOR } from '../core/colors/colors.constants'
import { clearSearchHistoryAlert } from '../core/alerts/clear-seearch-history-alert'

interface MoreOption<V> {
  title: string;
  onChange: (newValue: V) => void;
  value?: V;
  hidden?: boolean;
}

export const More = () => {
  const { top: topInset } = useSafeAreaInsets()
  const dispatch = useDispatch()

  const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
    dispatch(setHapticFeedbackEnabledAction(_hapticFeedbackEnabled))

  const handleChangeNativeSearchEngine = (_nativeSearchEngineEnabled: boolean) =>
    dispatch(setNativeSearchEngineEnabledAction(_nativeSearchEngineEnabled))

  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(() => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
    })
  }

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)
  const nativeSearchEngineEnabled = useSelector(nativeSearchEngineEnabledSelector)

  const renderItem = ({ item: { title, value, hidden, onChange } }: { item: MoreOption<any> }) => hidden ? (
    null
  ) : value !== undefined ? (
    <ListedOption title={title}>
      <CustomSwitch defaultValue={value} onValueChange={onChange} />
    </ListedOption>
  ) : (
    <ListedOption title={title}>
      <TouchableOpacity hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }} onPress={onChange}>
        <MaterialCommunityIcons name="delete" color={COLOR.BLACK} size={26} />
      </TouchableOpacity>
    </ListedOption>
  )

  const isPending = R.any(R.isNil, [hapticFeedbackEnabled, nativeSearchEngineEnabled])

  const getOptions: () => [ MoreOption<boolean>, MoreOption<boolean>, MoreOption<any> ] | [] =
    React.useCallback(() => isPending ? [] : [
      {
        title: 'Haptic feedback',
        value: !!hapticFeedbackEnabled,
        onChange: handleChangeHapticFeedback,
      },
      {
        title: 'Native search Engine (beta)',
        value: !!nativeSearchEngineEnabled,
        onChange: handleChangeNativeSearchEngine,
      },
      {
        title: 'Clear search history',
        onChange: handleClearSearchHistory,
        hidden: Platform.OS === 'ios',
      }
    ], [ hapticFeedbackEnabled, nativeSearchEngineEnabled, isPending ])

  return (
    <MoreContainer topInset={topInset}>
      {nativeSearchEngineEnabled}
      <FlatList
        renderItem={renderItem}
        ListEmptyComponent={(
          <MoreActivityIndicatorWrapper>
            <ActivityIndicator size="large" />
          </MoreActivityIndicatorWrapper>
        )}
        keyExtractor={({ title }) => title}
        extraData={nativeSearchEngineEnabled}
        data={getOptions()}
      />

      <ListedOption titleSize={TEXT_SIZE.XS} title={`App version: ${app.version}`} />
    </MoreContainer>
  )
}
