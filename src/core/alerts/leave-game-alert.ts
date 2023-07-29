import { Alert } from 'react-native'
import { Localization, LocalizeParams } from '@core/localize/localize.models'
import { noop } from '../noop/noop'

export const leaveGameAlert = (
  localize: (params?: LocalizeParams) => typeof Localization,
  onLeave: () => void,
) => {
  Alert.alert(localize().leave_game_title, localize().leave_game_description, [
    {
      text: localize().cancel,
      onPress: noop,
    },
    {
      text: localize().leave,
      style: 'destructive',
      onPress: onLeave,
    }
  ])
}
