import * as React from 'react'
import { Host } from 'react-native-portalize'
import { useTheme } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { useRealTimeUserData, usePremium, useUserAuth } from './hooks'
import { OptionItem, PremiumModal } from '../more/components'
import { MoreContainer } from '../more/more.styled'
import { UserStatistics } from './components/user-statistics/user-statistics'

export const User = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const premiumModalRef = React.useRef<Modalize | null>(null)

  const { userData, getRealTimeDatabaseData } = useRealTimeUserData()
  const { isPremium, handleOpenPremiumModal, handleDeactivatePremium } = usePremium(premiumModalRef)
  const { imageUrl, displayName } = useUserAuth(getRealTimeDatabaseData)

  return (
    <Host>
      <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
        <Header type="more" title={localize().user.toUpperCase()} backButton />
        
        <MoreContainer>
          <OptionItem
            title={displayName}
            imageUrl={imageUrl}
            onChange={() => null}
          />

          <OptionItem
            title={localize().premium}
            icon="star"
            iconColor={isPremium ? COLOR.GOLD : theme.textSecondary}
            onChange={isPremium ? undefined : handleOpenPremiumModal}
            handleDeactivatePremium={handleDeactivatePremium}
          />

          <UserStatistics userData={userData} />
        </MoreContainer>
      </SafeAreaFlexContainer>
      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
