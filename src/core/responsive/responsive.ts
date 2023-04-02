import { Dimensions } from 'react-native'

export const RESPONSIVE = {
  WIDTH: (percent?: number) => Dimensions.get('screen').width * ((percent ?? 100) / 100),
  HEIGHT: (percent?: number) => Dimensions.get('screen').height * ((percent ?? 100) / 100),
}
