import { Alert } from 'react-native'

export const spyAlert = (value: any) => {
  Alert.alert('🕵🏼', String(value), [
    {
      text: 'OK',
      onPress: () => null,
    },
  ])
}