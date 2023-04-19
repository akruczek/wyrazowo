import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { RootState } from '../../store/store'

export const hapticFeedbackEnabledSelector = (state: RootState) =>
  state?.settings?.hapticFeedbackEnabled ?? true

export const nativeSearchEngineEnabledSelector = (state: RootState) =>
  state?.settings?.nativeSearchEngineEnabled ?? true

export const premiumSelector = (state: RootState) =>
  state?.settings?.premium ?? 0

export const languageCodeSelector = (state: RootState) =>
  state?.settings?.languageCode ?? LANGUAGE_CODES.EN
