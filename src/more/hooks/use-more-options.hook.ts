import * as React from 'react'
import * as R from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { useTheme } from 'styled-components/native'
import { useNavigation } from '@react-navigation/native'
import { O } from '_otils'
import { NumberFlag } from '@core/models'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { clearSearchHistoryAlert } from '@core/alerts/clear-seearch-history-alert'
import { Storage } from '@core/storage/storage'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { deactivatePremiumAlert } from '@core/alerts/deactivate-premium-alert'
import { premiumService } from '@core/premium-service/premium-service'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { LANGUAGE_CODES } from '@core/localize/localize.models'
import { LANGUAGE_LABELS } from '@core/localize/localize.constants'
import { MoreOption } from '../more.models'
import { darkThemeEnabledSelector, hapticFeedbackEnabledSelector, languageCodeSelector } from '../../settings/store/settings.selectors'
import { SCREEN } from '../../navigation/navigation.constants'
import {
  setDarkThemeEnabledAction,
  setHapticFeedbackEnabledAction, setLanguageCodeAction, setNativeSearchEngineEnabledAction,
} from '../../settings/store/settings.slice'

type Options = [
  MoreOption<undefined>,
  MoreOption<LANGUAGE_CODES>,
  MoreOption<0 | 1 | -1>,
  MoreOption<boolean>,
  MoreOption<boolean>,
  MoreOption<undefined>,
  MoreOption<undefined>,
  MoreOption<undefined>,
  MoreOption<undefined>,
] | []

interface UseMoreOptions {
  handleDeactivatePremium: () => void;
  getOptions: () => Options;
}

export const useMoreOptions = (
  premiumModalRef: React.MutableRefObject<Modalize | null>,
  nativeSearchEngineEnabled: NumberFlag,
  premium: number,
): UseMoreOptions => {
  const theme = useTheme() as ThemeModel
  const dispatch = useDispatch()
  const localize = useLocalize()
  const navigation = useNavigation<any>()

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)
  const languageCode = useSelector(languageCodeSelector)
  const darkThemeEnabled = useSelector(darkThemeEnabledSelector)

  const isPending = R.any(
    R.isNil,
    [ hapticFeedbackEnabled, nativeSearchEngineEnabled, premium ],
  )

  const isPremium = premium > 0

  const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
    dispatch(setHapticFeedbackEnabledAction(O.toNumberFlag(_hapticFeedbackEnabled)))

  const handleChangeNativeSearchEngine = (_nativeSearchEngineEnabled: boolean) =>
    dispatch(setNativeSearchEngineEnabledAction(O.toNumberFlag(_nativeSearchEngineEnabled)))

  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(() => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
    })
  }

  const handleChangeTheme = (value: 0 | 1 | -1) =>
    dispatch(setDarkThemeEnabledAction(value))

  const handleDeactivatePremium = () => {
    deactivatePremiumAlert(() => {
      premiumService.deactivateOnce(dispatch)
    })
  }

  const handleChangeLanguage = (newLanguageCode: LANGUAGE_CODES) => {
    dispatch(setLanguageCodeAction(newLanguageCode))
  }

  const handleOpenPremiumModal = () => {
    premiumModalRef?.current?.open?.()
  }

  const getOptions: () => Options =
    React.useCallback(() => isPending ? [] : [
      {
        title: localize().premium,
        icon: 'star',
        iconColor: isPremium ? COLOR.GOLD : theme.textSecondary,
        onChange: isPremium ? undefined : handleOpenPremiumModal,
      },
      {
        title: localize().language,
        values: Object.values(LANGUAGE_CODES),
        labels: LANGUAGE_LABELS,
        value: languageCode,
        onChange: handleChangeLanguage,
      },
      {
        title: localize().theme,
        values: [ 0, 1, -1 ],
        labels: [ localize().light, localize().dark, localize().auto ],
        value: darkThemeEnabled,
        onChange: handleChangeTheme,
      },
      {
        title: localize().haptic_feedback,
        value: !!hapticFeedbackEnabled,
        onChange: handleChangeHapticFeedback,
      },
      {
        title: localize().native_search_engine,
        value: !!nativeSearchEngineEnabled,
        onChange: handleChangeNativeSearchEngine,
      },
      {
        title: localize().clear_search_history,
        onChange: handleClearSearchHistory,
        icon: 'delete',
      },
      {
        title: 'Scrabble Mania',
        onChange: () => navigation.navigate(SCREEN.MORE_MANIA),
        icon: 'web',
      },
      {
        title: localize().playground,
        onChange: () => navigation.navigate(SCREEN.MORE_PLAYGROUND),
        icon: 'checkerboard',
      },
      {
        title: localize().help,
        onChange: () => navigation.navigate(SCREEN.MORE_HELP),
        icon: 'help',
      },
    ], [ hapticFeedbackEnabled, nativeSearchEngineEnabled, premium, isPending, languageCode, darkThemeEnabled ])

    return { handleDeactivatePremium, getOptions }
}
