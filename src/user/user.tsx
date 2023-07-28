import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { ThemeModel } from '@core/styled/models'
import { COLOR } from '@core/colors/colors.constants'
import { Template } from '@core/template/template'
import { noop } from '@core/noop/noop'
import { useRealTimeUserData, usePremium, useUserAuth } from './hooks'
import { OptionItem, PremiumModal } from '../more/components'
import { UserStatistics } from './components/user-statistics/user-statistics'

export const User = () => {
  const theme = useTheme() as ThemeModel
  const premiumModalRef = React.useRef<Modalize | null>(null)

  const { userData, getRealTimeDatabaseData } = useRealTimeUserData()
  const { isPremium, handleOpenPremiumModal, handleDeactivatePremium } = usePremium(premiumModalRef)
  const { imageUrl, displayName } = useUserAuth(getRealTimeDatabaseData)

  return (
    <Template type="more" local="user" backButton>
      <OptionItem
        tx={displayName}
        imageUrl={imageUrl}
        onChange={noop}
        withPadding
      />

      <OptionItem
        local="premium"
        icon="star"
        iconColor={isPremium ? COLOR.GOLD : theme.textSecondary}
        onChange={isPremium ? undefined : handleOpenPremiumModal}
        handleDeactivatePremium={handleDeactivatePremium}
        withPadding
      />

      <UserStatistics userData={userData} />

      <PremiumModal modalizeRef={premiumModalRef} />
    </Template>
  )
}
