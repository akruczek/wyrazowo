import * as React from 'react'
import { Host } from 'react-native-portalize'
import { useTheme } from 'styled-components/native'
import { useDispatch, useSelector } from 'react-redux'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { Modalize } from 'react-native-modalize'
import { Header } from '@core/header/header'
import { SafeAreaFlexContainer } from '@core/styled'
import { ThemeModel } from '@core/styled/models'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { COLOR } from '@core/colors/colors.constants'
import { deactivatePremiumAlert } from '@core/alerts/deactivate-premium-alert'
import { premiumService } from '@core/premium-service/premium-service'
import { authService } from '@core/auth/auth-service'
import { OptionItem, PremiumModal } from '../more/components'
import { premiumSelector } from '../settings/store/settings.selectors'
import { MoreContainer } from '../more/more.styled'

export const User = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const premiumModalRef = React.useRef<Modalize | null>(null)
  const premium = useSelector(premiumSelector)
  const dispatch = useDispatch()

  const [ imageUrl, setImageUrl ] = React.useState('https://raw.githubusercontent.com/akruczek/wyrazowo/develop/android/app/src/main/res/mipmap-xhdpi/ic_launcher.png')

  const isPremium = premium > 0

  const handleOpenPremiumModal = () => {
    premiumModalRef?.current?.open?.()
  }

  const handleDeactivatePremium = () => {
    deactivatePremiumAlert(() => {
      premiumService.deactivateOnce(dispatch)
    })
  }

  React.useEffect(() => {
    const user = authService.getCurrentUser()
    console.log('Already logged in user: ', user?.email)

    if (user) {
      if (user?.photoURL) {
        setImageUrl(user.photoURL)
      }
    } else {
      authService.googleSignIn().then((response) => {
        if (response) {
          const { user } = response
          console.log('New logged in user: ', user.email)
        } else {
          // TODO: handle error
        }
      })
    }

  })

  return (
    <Host>
      <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
        <Header type="more" title={localize().user.toUpperCase()} backButton />
        
        <MoreContainer>
          <OptionItem
            title={localize().user}
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
        </MoreContainer>
      </SafeAreaFlexContainer>

      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
