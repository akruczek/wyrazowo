import pl from './localization/pl.json'
import en from './localization/en.json'
import { LANGUAGE_CODES, Localization } from './localize.models'

export const localize = (languageCode: LANGUAGE_CODES): Localization => {
  return { pl, en }[languageCode] as Localization
}
