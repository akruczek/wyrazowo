import * as React from 'react'
import { Host } from 'react-native-portalize'
import { useTheme } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { Text } from 'react-native'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { OptionItem, PremiumModal } from '../more/components'
import { MoreContainer } from '../more/more.styled'
import { useRealTimeUserData } from './hooks/use-real-time-user-data.hook'
import { usePremium } from './hooks/use-premium.hook'
import { useUserAuth } from './hooks/use-user-auth.hook'

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

          <Text style={{ color: 'black' }}>{userData?.points?.value}</Text>
        </MoreContainer>
      </SafeAreaFlexContainer>

      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
