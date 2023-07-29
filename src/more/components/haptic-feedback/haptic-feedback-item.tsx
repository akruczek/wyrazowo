import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutAnimation } from 'react-native'
import wrzw from 'wrzw'
import { OptionItem } from '../option-item/option-item'
import { hapticFeedbackEnabledSelector } from '../../../settings/store/settings.selectors'
import { setHapticFeedbackEnabledAction } from '../../../settings/store/settings.slice'

interface Props {
  item: 'on' | 'off';
}

export const HapticFeedbackItem = ({ item }: Props) => {
  const dispatch = useDispatch()
  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)

  const onChange = () => {
    LayoutAnimation.easeInEaseOut()
    dispatch(setHapticFeedbackEnabledAction(wrzw.toNumberFlag(item === 'on')))
  }

  const isChecked = item === 'on' && hapticFeedbackEnabled || item === 'off' && !hapticFeedbackEnabled

  return (
    <OptionItem
      icon={isChecked ? "check-bold" : undefined}
      local={item}
      onChange={onChange}
      uppercase
    />
  )
}
