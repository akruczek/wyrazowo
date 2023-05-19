import { GoogleSignin } from '@react-native-google-signin/google-signin'
import auth from '@react-native-firebase/auth'
import googleServicesJson from '../../../android/app/google-services.json'
import { AuthService } from './auth-service.models'

export const authService: AuthService = {
  init: () => {
    const webClientId = googleServicesJson
      ?.client
      ?.[0]
      ?.oauth_client
      ?.find?.(({ client_type }) => client_type === (__DEV__ ? 3 : 1)) // TODO: verify on production build
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

    const { idToken } = await GoogleSignin.signIn()
    const googleCredential = auth.GoogleAuthProvider.credential(idToken)

    return auth().signInWithCredential(googleCredential)
  },
  getCurrentUser: () => {
    return auth().currentUser
  },
}
