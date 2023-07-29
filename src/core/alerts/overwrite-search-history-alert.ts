import { Alert } from 'react-native'
import { Localization, LocalizeParams } from '@core/localize/localize.models'

export const overwriteSearchHistoryAlert = (
  localize: (params?: LocalizeParams) => typeof Localization,
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
