import { RootState } from '../../store/store'

export const hapticFeedbackEnabledSelector = (state: RootState) =>
  state?.settings?.hapticFeedbackEnabled ?? true

export const nativeSearchEngineEnabledSelector = (state: RootState) =>
  state?.settings?.nativeSearchEngineEnabled ?? true
