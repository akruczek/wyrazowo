import { Localization } from '@core/localize/localize.models'
import { Alert } from 'react-native'

export const saveSearchHistoryAlert = (
  localize: () => Localization,
  onPress: () => void,
) => {
  Alert.alert(localize().save_search_history, localize().overwrite_search_history_confirmation, [
    {
      text: localize().cancel,
      onPress: () => null,
    },
    {
      text: localize().confirm,
      style: 'destructive',
      onPress,
    }
  ])
}
