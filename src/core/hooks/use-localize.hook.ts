import * as React from 'react'
import { NativeModules, Platform } from 'react-native';
import { LANGUAGE_CODES, Localization } from '../localize/localize.models'
import { localize } from '../localize/localize'
import { useSelector } from 'react-redux'
import { languageCodeSelector } from '../../settings/store/settings.selectors'

export const useLocalize = (): () => Localization => {
  const deviceLanguage = Platform.select({
    ios: NativeModules?.SettingsManager?.settings?.AppleLocale,
    android: NativeModules?.I18nManager?.localeIdentifier,
  })

  const _languageCode = useSelector(languageCodeSelector)

  const languageCode = _languageCode
    ?? deviceLanguage
    ?? LANGUAGE_CODES.EN

  const handleChange = React.useCallback(() => {
    return localize(languageCode)
  }, [ _languageCode ])

  return handleChange
}
