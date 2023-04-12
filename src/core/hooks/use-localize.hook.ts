import { LANGUAGE_CODES, Localization } from '../localize/localize.models'
import { localize } from '../localize/localize'

export const useLocalize = (): () => Localization => {
  const languageCode = LANGUAGE_CODES.PL

  return () => localize(languageCode)
}
