import { Localization } from '@core/localize/localize.models'
import { Alert } from 'react-native'

export const overwriteSearchHistoryAlert = (
  localize: () => Localization,
  onPress: () => void,
) => {
  Alert.alert(localize().are_you_sure, localize().overwrite_search_history_confirmation, [
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
