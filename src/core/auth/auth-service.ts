import { GoogleSignin, isSuccessResponse } from '@react-native-google-signin/google-signin'
import { getAuth, GoogleAuthProvider, signInWithCredential } from '@react-native-firebase/auth'
import googleServicesJson from '../../../android/app/google-services.json'
import { AuthService } from './auth-service.models'

export const authService: AuthService = {
  init: () => {
    const webClientId = googleServicesJson
      ?.client
      ?.[0]
      ?.oauth_client
      ?.find?.(({ client_type }) => client_type === (__DEV__ ? 3 : 3)) // TODO: verify on production build
      ?.client_id

    GoogleSignin.configure({ webClientId })
  },
  googleSignIn: async () => {
    const hasPlayServices = await GoogleSignin.hasPlayServices({
      showPlayServicesUpdateDialog: true
    })

    if (!hasPlayServices) {
      return false
    }

    const response = await GoogleSignin.signIn()

    if (!isSuccessResponse(response) || !response.data.idToken) {
      return false
    }

    const googleCredential = GoogleAuthProvider.credential(response.data.idToken)

    return signInWithCredential(getAuth(), googleCredential)
  },
  getCurrentUser: () => {
    return getAuth().currentUser
  },
}
