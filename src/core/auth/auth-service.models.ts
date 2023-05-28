import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export interface AuthService {
  init: () => void;
  googleSignIn: () => Promise<false | FirebaseAuthTypes.UserCredential>;
  getCurrentUser: () => FirebaseAuthTypes.User | null;
}
