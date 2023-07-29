import { Alert } from 'react-native'
import { Localization, LocalizeParams } from '@core/localize/localize.models'

export const saveSearchHistoryAlert = (
  localize: (params?: LocalizeParams) => typeof Localization,
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
