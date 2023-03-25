import { Alert } from 'react-native'

export const goPremiumAlert = () => {
  Alert.alert('Want longer results?', 'Buy PREMIUM Plan for only $9.99 / month', [
    {
      text: 'Cancel',
      onPress: () => null,
    },
    {
      text: 'Go Premium',
      onPress: () => null,
    }
  ])
}
