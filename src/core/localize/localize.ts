import pl from './localization/pl.json'
import en from './localization/en.json'
import de from './localization/de.json'
import ar from './localization/ar.json'
import { LANGUAGE_CODES, Localization, LocalizeParams } from './localize.models'

export const localize = (languageCode: LANGUAGE_CODES, params?: LocalizeParams): typeof Localization => {
  let localizationsStringified = JSON.stringify({ pl, en, de, ar }[languageCode])

  if (params) {
    Object.keys(params).forEach((key) => {
      localizationsStringified = localizationsStringified.replace(`{{${key}}}`, params[key] as any)
    })
  }

  return JSON.parse(localizationsStringified) as typeof Localization
}
