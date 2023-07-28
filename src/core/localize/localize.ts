import pl from './localization/pl.json'
import en from './localization/en.json'
import de from './localization/de.json'
import { LANGUAGE_CODES, Localization } from './localize.models'

export const localize = (languageCode: LANGUAGE_CODES): typeof Localization => {
  return { pl, en, de }[languageCode] as typeof Localization
}
