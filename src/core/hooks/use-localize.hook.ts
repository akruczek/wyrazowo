import * as React from 'react'
import { useSelector } from 'react-redux'
import { SYSTEM_LANGUAGE } from '@core/system-language/system-language'
import { LANGUAGE_CODES, Localization, LocalizeParams } from '../localize/localize.models'
import { localize } from '../localize/localize'
import { languageCodeSelector } from '../../settings/store/settings.selectors'

export const useLocalize = (params?: LocalizeParams): () => typeof Localization => {
  const _languageCode = useSelector(languageCodeSelector)
  const languageCode = _languageCode ?? SYSTEM_LANGUAGE ?? LANGUAGE_CODES.EN

  const handleChange = React.useCallback(() => {
    return localize(languageCode, params)
  }, [ _languageCode ])

  return handleChange
}
