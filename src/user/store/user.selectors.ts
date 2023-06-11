import { localize } from '@core/localize/localize'
import { RootState } from '../../store/store'
import { LANGUAGE_CODES } from '@core/localize/localize.models'

export const DEFAULT_IMAGE_URL = 'https://raw.githubusercontent.com/akruczek/wyrazowo/develop/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png'

export const userImageSelector = (state: RootState) =>
  state?.user?.authData?.photoURL ?? DEFAULT_IMAGE_URL

export const userUidSelector = (state: RootState): string | null =>
  state?.user?.authData?.uid ?? null

export const userDisplayNameSelector = (state: RootState) =>
  state?.user?.authData?.displayName ??
  state?.user?.authData?.email ??
  localize(state?.settings?.languageCode ?? LANGUAGE_CODES.EN).user
