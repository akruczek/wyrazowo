import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { deactivatePremiumAlert } from '@core/alerts/deactivate-premium-alert'
import { premiumService } from '@core/premium-service/premium-service'
import { premiumSelector } from '../../settings/store/settings.selectors'

interface UsePremium {
  isPremium: boolean;
  handleOpenPremiumModal: () => void;
  handleDeactivatePremium: () => void;
}

export const usePremium = (
  premiumModalRef: React.MutableRefObject<Modalize | null>,
): UsePremium => {
  const dispatch = useDispatch()
  const premium = useSelector(premiumSelector)

  const isPremium = premium > 0

  const handleOpenPremiumModal = () => {
    premiumModalRef?.current?.open?.()
  }

  const handleDeactivatePremium = () => {
    deactivatePremiumAlert(() => {
      premiumService.deactivateOnce(dispatch)
    })
  }

  return { isPremium, handleOpenPremiumModal, handleDeactivatePremium }
}
