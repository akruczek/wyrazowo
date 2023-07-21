import * as React from 'react'
import { useTheme } from 'styled-components/native'
import { Modalize } from 'react-native-modalize'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { Template } from '@core/template/template'
import { noop } from '@core/noop/noop'
import { useRealTimeUserData, usePremium, useUserAuth } from './hooks'
import { OptionItem } from '../more/components'
import { UserStatistics } from './components/user-statistics/user-statistics'

export const User = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const premiumModalRef = React.useRef<Modalize | null>(null)

  const { userData, getRealTimeDatabaseData } = useRealTimeUserData()
  const { isPremium, handleOpenPremiumModal, handleDeactivatePremium } = usePremium(premiumModalRef)
  const { imageUrl, displayName } = useUserAuth(getRealTimeDatabaseData)

  return (
    <Template type="more" title={localize().user.toUpperCase()} backButton>
      <OptionItem
        title={displayName}
        imageUrl={imageUrl}
        onChange={noop}
        withPadding
      />

      <OptionItem
        title={localize().premium}
        icon="star"
        iconColor={isPremium ? COLOR.GOLD : theme.textSecondary}
        onChange={isPremium ? undefined : handleOpenPremiumModal}
        handleDeactivatePremium={handleDeactivatePremium}
        withPadding
      />

      <UserStatistics userData={userData} />
    </Template>
  )
}
