import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { RootState } from '../../store/store'

export const hapticFeedbackEnabledSelector = (state: RootState) =>
  state?.settings?.hapticFeedbackEnabled ?? 1

export const nativeSearchEngineEnabledSelector = (state: RootState) =>
  state?.settings?.nativeSearchEngineEnabled ?? 1

export const darkThemeEnabledSelector = (state: RootState) =>
  state?.settings?.darkThemeEnabled ?? 0

export const premiumSelector = (state: RootState) =>
  state?.settings?.premium ?? 0

export const languageCodeSelector = (state: RootState) =>
  state?.settings?.languageCode ?? null
