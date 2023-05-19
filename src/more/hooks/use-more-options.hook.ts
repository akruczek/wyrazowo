import * as React from 'react'
import * as R from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { O } from '_otils'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { deactivatePremiumAlert } from '@core/alerts/deactivate-premium-alert'
import { premiumService } from '@core/premium-service/premium-service'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { LANGUAGE_LABELS } from '@core/localize/localize.constants'
import { MoreOption } from '../more.models'
import { darkThemeEnabledSelector, hapticFeedbackEnabledSelector, languageCodeSelector } from '../../settings/store/settings.selectors'
import { SCREEN } from '../../navigation/navigation.constants'
import {
  setDarkThemeEnabledAction, setHapticFeedbackEnabledAction, setLanguageCodeAction,
} from '../../settings/store/settings.slice'

type Options = [
  MoreOption<undefined>,
  MoreOption<LANGUAGE_CODES>,
  MoreOption<0 | 1 | -1>,
  MoreOption<boolean>,
  MoreOption<undefined>,
  MoreOption<undefined>,
  MoreOption<undefined>,
  MoreOption<undefined>,
  MoreOption<undefined>,
] | []

interface UseMoreOptions {
  getOptions: () => Options;
}

export const useMoreOptions = (): UseMoreOptions => {
  const theme = useTheme() as ThemeModel
  const dispatch = useDispatch()
  const localize = useLocalize()
  const navigation = useNavigation<any>()

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)
  const languageCode = useSelector(languageCodeSelector)
  const darkThemeEnabled = useSelector(darkThemeEnabledSelector)

  const isPending = R.any(
    R.isNil,
    [ hapticFeedbackEnabled ],
  )

  const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
    dispatch(setHapticFeedbackEnabledAction(O.toNumberFlag(_hapticFeedbackEnabled)))

  const handleChangeTheme = (value: 0 | 1 | -1) =>
    dispatch(setDarkThemeEnabledAction(value))

  const handleChangeLanguage = (newLanguageCode: LANGUAGE_CODES) => {
    dispatch(setLanguageCodeAction(newLanguageCode))
  }

  const getOptions: () => Options =
    React.useCallback(() => isPending ? [] : [
      {
        title: localize().user,
        imageUrl: 'https://raw.githubusercontent.com/akruczek/wyrazowo/develop/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png',
        onChange: () => navigation.navigate(SCREEN.MORE_USER),
      },
      {
        title: localize().language,
        values: Object.values(LANGUAGE_CODES),
        labels: LANGUAGE_LABELS,
        value: languageCode,
        onChange: handleChangeLanguage,
      },
      {
        title: localize().theme,
        values: [ 0, 1, -1 ],
        labels: [ localize().light, localize().dark, localize().auto ],
        value: darkThemeEnabled,
        onChange: handleChangeTheme,
      },
      {
        title: localize().haptic_feedback,
        value: !!hapticFeedbackEnabled,
        onChange: handleChangeHapticFeedback,
      },
      {
        title: 'Scrabble Mania',
        onChange: () => navigation.navigate(SCREEN.MORE_MANIA),
        icon: 'web',
      },
      {
        title: localize().playground,
        onChange: () => navigation.navigate(SCREEN.MORE_PLAYGROUND),
        icon: 'checkerboard',
      },
      {
        title: localize().help,
        onChange: () => navigation.navigate(SCREEN.MORE_HELP),
        icon: 'help',
      },
      {
        title: localize().advanced_settings,
        onChange: () => navigation.navigate(SCREEN.DEVELOPER),
        icon: 'wrench',
        // TODO: hidden: !__DEV__,
      },
      {
        title: localize().about_author,
        onChange: () => navigation.navigate(SCREEN.MORE_AUTHOR),
        icon: 'account-question',
      },
    ], [ hapticFeedbackEnabled, isPending, languageCode, darkThemeEnabled ])

    return { getOptions }
}
