import * as React from 'react'
import * as R from 'ramda'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { MoreOption } from '../more.models'
import { COLOR } from '../../core/colors/colors.constants'
import { clearSearchHistoryAlert } from '../../core/alerts/clear-seearch-history-alert'
import { Storage } from '../../core/storage/storage'
import { STORAGE_KEY } from '../../core/storage/storage.constants'
import { hapticFeedbackEnabledSelector } from '../../settings/store/settings.selectors'
import { deactivatePremiumAlert } from '../../core/alerts/deactivate-premium-alert'
import { premiumService } from '../../core/premium-service/premium-service'
import {
  setHapticFeedbackEnabledAction, setNativeSearchEngineEnabledAction,
} from '../../settings/store/settings.slice'

type Options = [
  MoreOption<any>,
  MoreOption<boolean>,
  MoreOption<boolean>,
  MoreOption<any>,
] | []

interface UseMoreOptions {
  handleDeactivatePremium: () => void;
  getOptions: () => Options;
}

export const useMoreOptions = (
  premiumModalRef: React.MutableRefObject<Modalize | null>,
  nativeSearchEngineEnabled: boolean,
  premium: number,
): UseMoreOptions => {
  const dispatch = useDispatch()

  const hapticFeedbackEnabled = useSelector(hapticFeedbackEnabledSelector)

  const isPending = R.any(
    R.isNil,
    [ hapticFeedbackEnabled, nativeSearchEngineEnabled, premium ],
  )

  const isPremium = premium > 0

  const handleChangeHapticFeedback = (_hapticFeedbackEnabled: boolean) =>
    dispatch(setHapticFeedbackEnabledAction(_hapticFeedbackEnabled))

  const handleChangeNativeSearchEngine = (_nativeSearchEngineEnabled: boolean) =>
    dispatch(setNativeSearchEngineEnabledAction(_nativeSearchEngineEnabled))

  const handleClearSearchHistory = () => {
    clearSearchHistoryAlert(() => {
      Storage.set(STORAGE_KEY.SEARCH_RESULT, JSON.stringify([]))
    })
  }

  const handleDeactivatePremium = () => {
    deactivatePremiumAlert(() => {
      premiumService.deactivateOnce(dispatch)
    })
  }

  const handleOpenPremiumModal = () => {
    premiumModalRef?.current?.open?.()
  }

  const getOptions: () => Options =
    React.useCallback(() => isPending ? [] : [
      {
        title: 'Premium',
        icon: 'star',
        iconColor: isPremium ? COLOR.GOLD : COLOR.DIM_GREY,
        onChange: isPremium ? undefined : handleOpenPremiumModal,
      },
      {
        title: 'Haptic feedback',
        value: !!hapticFeedbackEnabled,
        onChange: handleChangeHapticFeedback,
      },
      {
        title: 'Native search engine',
        value: !!nativeSearchEngineEnabled,
        onChange: handleChangeNativeSearchEngine,
      },
      {
        title: 'Clear search history',
        onChange: handleClearSearchHistory,
        icon: 'delete',
      }
    ], [ hapticFeedbackEnabled, nativeSearchEngineEnabled, premium, isPending ])

    return { handleDeactivatePremium, getOptions }
}
