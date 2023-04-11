import { Alert } from 'react-native'
import { noop } from '../noop/noop'

export const deactivatePremiumAlert = (onDeactivate: () => void) => {
  Alert.alert('Deactivate Premium?', 'Are you sure you want to deactivate Premium?', [
    {
      text: 'Cancel',
      onPress: noop,
    },
    {
      text: 'DEACTIVATE',
      style: 'destructive',
      onPress: onDeactivate,
    }
  ])
}
