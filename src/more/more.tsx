import * as React from 'react'
import * as R from 'ramda'
import app from '../../package.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoreActivityIndicatorWrapper, MoreContainer } from './more.styled'
import { ListedOption } from './components/listed-option/listed-option'
import { CustomSwitch } from '../core/custom-switch/custom-switch'
import { TEXT_SIZE } from '../core/text/text.constants'
import { ActivityIndicator, FlatList } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { hapticFeedbackEnabledSelector } from '../settings/store/settings.selectors'
import { setHapticFeedbackEnabledAction } from '../settings/store/settings.slice'

interface MoreOption<V> {
  title: string;
  onChange: (newValue: V) => void;
}

export const More = () => {
  const { top: topInset } = useSafeAreaInsets()
  const dispatch = useDispatch()

  const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
    dispatch(setHapticFeedbackEnabledAction(_hapticFeedbackEnabled))

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)

  const renderItem = ({ item: { title, onChange } }: { item: MoreOption<any> }) => (
    <ListedOption title={title}>
      <CustomSwitch defaultValue={!!hapticFeedbackEnabled} onValueChange={onChange} />
    </ListedOption>
  )

  const isPending = R.any(R.isNil, [hapticFeedbackEnabled])

  const options: [ MoreOption<boolean> ] | [] = isPending ? [] : [
    {
      title: 'Haptic feedback',
      onChange: handleChangeHapticFeedback,
    },
  ]

  return (
    <MoreContainer topInset={topInset}>
      <FlatList
        renderItem={renderItem}
        ListEmptyComponent={(
          <MoreActivityIndicatorWrapper>
            <ActivityIndicator size="large" />
          </MoreActivityIndicatorWrapper>
        )}
        data={options}
      />

      <ListedOption titleSize={TEXT_SIZE.XS} title={`App version: ${app.version}`} />
    </MoreContainer>
  )
}
