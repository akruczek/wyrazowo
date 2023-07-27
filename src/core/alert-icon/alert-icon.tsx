import * as React from 'react'
import { Alert } from 'react-native'
import { Localization } from '@core/localize/localize.models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { AlertType } from './alert-icon.models'
import { AlertIconStyled, AlertIconTouchable } from './alert-icon.styled'

interface Props {
  type?: AlertType;
  titleLocal: keyof typeof Localization;
  descriptionLocal: keyof typeof Localization;
  isVisible?: boolean;
}

export const AlertIcon = ({ isVisible, titleLocal, descriptionLocal, type }: Props) => {
  const localize = useLocalize()

  const onPress = () => {
    Alert.alert(localize()[titleLocal], localize()[descriptionLocal], [ { text: 'OK' } ])
  }

  return isVisible ? (
    <AlertIconTouchable onPress={onPress}>
      <AlertIconStyled name="alert-circle-outline" {...{ type }} />
    </AlertIconTouchable>
  ) : null
}
