import { Alert } from 'react-native'
import { noop } from '../noop/noop'
import { Localization } from '@core/localize/localize.models'

export const leaveGameAlert = (
  localize: () => Localization,
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
