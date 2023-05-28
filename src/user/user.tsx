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
import { setUserAction } from './store/user.slice'
import { DEFAULT_IMAGE_URL } from './store/user.selectors'

export const User = () => {
  const theme = useTheme() as ThemeModel
  const localize = useLocalize()
  const premiumModalRef = React.useRef<Modalize | null>(null)
  const premium = useSelector(premiumSelector)
  const dispatch = useDispatch()

  const [ imageUrl, setImageUrl ] = React.useState<string>(DEFAULT_IMAGE_URL)
  const [ displayName, setDisplayName ] = React.useState<string>(localize().user)

  const isPremium = premium > 0

  const handleOpenPremiumModal = () => {
    premiumModalRef?.current?.open?.()
  }

  const handleDeactivatePremium = () => {
    deactivatePremiumAlert(() => {
      premiumService.deactivateOnce(dispatch)
    })
  }

  const setUserState = (user: FirebaseAuthTypes.User) => {
    if (user?.photoURL) {
      setImageUrl(user.photoURL)
    }

    if (user?.displayName) {
      setDisplayName(user.displayName)
    } else if (user?.email) {
      setDisplayName(user.email)
    }
  }

  React.useEffect(() => {
    const user = authService.getCurrentUser()

    if (user) {
      setUserState(user)
      dispatch(setUserAction(user))
    } else {
      authService.googleSignIn().then((response) => {
        if (response) {
          const { user } = response
          setUserState(user)
          dispatch(setUserAction(user))
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
        </MoreContainer>
      </SafeAreaFlexContainer>

      <PremiumModal modalizeRef={premiumModalRef} />
    </Host>
  )
}
