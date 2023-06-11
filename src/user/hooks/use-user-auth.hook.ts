import * as React from 'react'
import { useDispatch } from 'react-redux'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'
import { authService } from '@core/auth/auth-service'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { DEFAULT_IMAGE_URL } from '../../user/store/user.selectors'
import { setUserAction } from '../../user/store/user.slice'

interface UseUserAuth {
  imageUrl: string;
  displayName: string;
}

export const useUserAuth = (
  getRealTimeDatabaseData: (uid: string) => void,
): UseUserAuth => {
  const localize = useLocalize()
  const dispatch = useDispatch()

  const [ imageUrl, setImageUrl ] = React.useState<string>(DEFAULT_IMAGE_URL)
  const [ displayName, setDisplayName ] = React.useState<string>(localize().user)

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
      getRealTimeDatabaseData(user.uid)
    } else {
      authService.googleSignIn().then((response) => {
        if (response) {
          const { user } = response
          setUserState(user)
          dispatch(setUserAction(user))
          getRealTimeDatabaseData(user.uid)
        } else {
          // TODO: handle error
        }
      })
    }
  }, [])

  return { imageUrl, displayName }
}
