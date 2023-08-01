import { Alert } from 'react-native'
import { Localization } from '@core/localize/localize.models'
import { isPlatform } from '@core/is-platform/is-platform'
import { noop } from '../noop/noop'

export const newVersionAvailableAlert = (
  localize: () => typeof Localization,
) => {
  Alert.alert(
    localize().new_version_title,
    isPlatform('ios') ? localize().new_version_description_ios : localize().new_version_description_android,
    [
      {
        text: 'OK',
        onPress: noop,
      },
    ],
  )
}
