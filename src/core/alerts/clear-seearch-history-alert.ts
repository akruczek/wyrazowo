import { Alert } from 'react-native'

export const clearSearchHistoryAlert = (
  onPress: () => void,
) => {
  Alert.alert('Are you sure?', 'Do you really want to clear your search history?', [
    {
      text: 'Cancel',
      onPress: () => null,
    },
    {
      text: 'Clear',
      onPress,
    }
  ])
}
