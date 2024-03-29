import { Alert } from 'react-native'
import { Localization, LocalizeParams } from '@core/localize/localize.models'
import { noop } from '../noop/noop'

export const restartAppAlert = (
  localize: (params?: LocalizeParams) => typeof Localization,
  onConfirm: () => void,
) => {
  Alert.alert(localize().change_language, localize().change_language_description, [
    {
      text: localize().cancel,
      onPress: noop,
    },
    {
      text: localize().confirm,
      style: 'destructive',
      onPress: onConfirm,
    }
  ])
}
