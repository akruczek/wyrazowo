import { Localization } from '@core/localize/localize.models'
import { Alert } from 'react-native'

export const clearSearchHistoryAlert = (
  localize: () => Localization,
  onPress: () => void,
) => {
  Alert.alert(localize().are_you_sure, localize().clear_search_history_confirmation, [
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
