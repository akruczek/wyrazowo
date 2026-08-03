import { User, UserCredential } from '@react-native-firebase/auth'

export interface AuthService {
  init: () => void;
  googleSignIn: () => Promise<false | UserCredential>;
  getCurrentUser: () => User | null;
}
