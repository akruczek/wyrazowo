import { Alert } from 'react-native'
import { noop } from '../noop/noop'

export const goPremiumAlert = (
  onGoPremium: () => void,
) => {
  Alert.alert('Want longer results?', 'Buy PREMIUM Plan for only $9.99 / month', [
    {
      text: 'Cancel',
      onPress: noop,
    },
    {
      text: 'Go Premium',
      onPress: onGoPremium,
    }
  ])
}
