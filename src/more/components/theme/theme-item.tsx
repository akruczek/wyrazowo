import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { LayoutAnimation } from 'react-native'
import { THEME_LABELS, ThemeNumberFlag } from '@core/styled/theme'
import { OptionItem } from '../option-item/option-item'
import { darkThemeEnabledSelector } from '../../../settings/store/settings.selectors'
import { setDarkThemeEnabledAction } from '../../../settings/store/settings.slice'

interface Props {
  item: ThemeNumberFlag;
  index: number;
}

export const ThemeItem = ({ item, index }: Props) => {
  const dispatch = useDispatch()
  const darkThemeEnabled = useSelector(darkThemeEnabledSelector)

  const onChange = () => {
    LayoutAnimation.easeInEaseOut()
    dispatch(setDarkThemeEnabledAction(item))
  }

  return (
    <OptionItem
      icon={darkThemeEnabled === item ? "check-bold" : undefined}
      local={THEME_LABELS[index]}
      onChange={onChange}
    />
  )
}
