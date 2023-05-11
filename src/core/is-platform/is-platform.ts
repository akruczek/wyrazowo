import { Platform } from 'react-native'

export const isPlatform = (platform: 'android' | 'ios'): boolean =>
  Platform.OS === platform
