import { RootState } from '../../store/store'

export const selectedLettersSelector = (state: RootState) =>
  state?.dashboard?.selectedLetters ?? []

export const searchHistoryTimestampSelector = (state: RootState) =>
  state?.dashboard?.searchHistoryTimestamp ?? 0
