import { RootState } from '../../store/store'

export const selectedLettersSelector = (state: RootState) =>
  state?.dashboard?.selectedLetters ?? []