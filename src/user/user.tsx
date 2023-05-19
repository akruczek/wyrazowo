import * as React from 'react'
import { Host } from 'react-native-portalize'
import { useTheme } from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { Modalize } from 'react-native-modalize'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { deactivatePremiumAlert } from '@core/alerts/deactivate-premium-alert'
import { premiumService } from '@core/premium-service/premium-service'
import { OptionItem, PremiumModal } from '../more/components'
import { premiumSelector } from '../settings/store/settings.selectors'

export const User = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const premiumModalRef = React.useRef<Modalize | null>(null)
  const premium = useSelector(premiumSelector)
  const dispatch = useDispatch()

  const isPremium = premium > 0

  const handleOpenPremiumModal = () => {
    premiumModalRef?.current?.open?.()
  }

  const handleDeactivatePremium = () => {
    deactivatePremiumAlert(() => {
      premiumService.deactivateOnce(dispatch)
    })
  }

  const options = [
    {
      title: localize().premium,
      icon: 'star',
      iconColor: isPremium ? COLOR.GOLD : theme.textSecondary,
      onChange: isPremium ? undefined : handleOpenPremiumModal,
    },
  ]

  return (
    <Host>
      <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
        <Header type="more" title={localize().user.toUpperCase()} backButton />

        <OptionItem {...{ ...options[0] }} handleDeactivatePremium={handleDeactivatePremium} />
      </SafeAreaFlexContainer>

      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
