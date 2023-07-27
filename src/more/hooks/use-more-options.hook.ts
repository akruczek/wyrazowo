import * as React from 'react'
import * as R from 'ramda'
import wrzw from 'wrzw'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { LANGUAGE_LABELS } from '@core/localize/localize.constants'
import { SYSTEM_LANGUAGE } from '@core/system-language/system-language'
import { MoreOption } from '../more.models'
import { darkThemeEnabledSelector, hapticFeedbackEnabledSelector, languageCodeSelector } from '../../settings/store/settings.selectors'
import { userDisplayNameSelector, userImageSelector } from '../../user/store/user.selectors'
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
] | []

interface UseMoreOptions {
  getOptions: () => Options;
}

export const useMoreOptions = (): UseMoreOptions => {
  const dispatch = useDispatch()
  const localize = useLocalize()
  const navigation = useNavigation<any>()

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)
  const languageCode = useSelector(languageCodeSelector)
  const darkThemeEnabled = useSelector(darkThemeEnabledSelector)
  const imageUrl = useSelector(userImageSelector)
  const displayName = useSelector(userDisplayNameSelector)

  const isPending = R.any(
    R.isNil,
    [ hapticFeedbackEnabled ],
  )

  const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
    dispatch(setHapticFeedbackEnabledAction(wrzw.toNumberFlag(_hapticFeedbackEnabled)))

  const handleChangeTheme = (value: 0 | 1 | -1) =>
    dispatch(setDarkThemeEnabledAction(value))

  const handleChangeLanguage = (newLanguageCode: LANGUAGE_CODES) => {
    dispatch(setLanguageCodeAction(newLanguageCode))
  }

  const getOptions: () => Options =
    React.useCallback(() => isPending ? [] : [
      {
        tx: displayName,
        onChange: () => navigation.navigate(SCREEN.MORE_USER),
        imageUrl,
      },
      {
        local: 'language',
        values: Object.values(LANGUAGE_CODES),
        labels: LANGUAGE_LABELS,
        value: languageCode ?? SYSTEM_LANGUAGE,
        onChange: handleChangeLanguage,
      },
      {
        local: 'theme',
        values: [ 0, 1, -1 ],
        labels: [ localize().light, localize().dark, localize().auto ],
        value: darkThemeEnabled,
        onChange: handleChangeTheme,
      },
      {
        local: 'haptic_feedback',
        value: !!hapticFeedbackEnabled,
        onChange: handleChangeHapticFeedback,
      },
      {
        local: 'scrabblemania',
        onChange: () => navigation.navigate(SCREEN.MORE_MANIA),
        icon: 'web',
      },
      {
        local: 'help',
        onChange: () => navigation.navigate(SCREEN.MORE_HELP),
        icon: 'help',
      },
      {
        local: 'advanced_settings',
        onChange: () => navigation.navigate(SCREEN.DEVELOPER),
        icon: 'wrench',
        // TODO: hidden: !__DEV__,
      },
      {
        local: 'about_author',
        onChange: () => navigation.navigate(SCREEN.MORE_AUTHOR),
        icon: 'account-question',
      },
    ], [ hapticFeedbackEnabled, isPending, languageCode, darkThemeEnabled, displayName, imageUrl ])

    return { getOptions }
}
