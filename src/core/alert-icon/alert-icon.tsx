import * as React from 'react'
import { Alert } from 'react-native'
import { AlertType } from './alert-icon.models'
import { AlertIconStyled, AlertIconTouchable } from './alert-icon.styled'

interface Props {
  type?: AlertType;
  title?: string;
  description?: string;
  isVisible?: boolean;
}

export const AlertIcon = ({ isVisible, title, description, type }: Props) => {
  const onPress = () => {
    if (title) {
      Alert.alert(title, description, [ { text: 'OK' } ])
    }
  }

  return isVisible ? (
    <AlertIconTouchable onPress={onPress}>
      <AlertIconStyled name="alert-circle-outline" {...{ type }} />
    </AlertIconTouchable>
  ) : null
}
