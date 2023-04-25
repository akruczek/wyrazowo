import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../navigation/navigation.constants'

export const useModalTopOffset = (): number => {
  const { top: topInset } = useSafeAreaInsets()

  return topInset + BOTTOM_NAVIGATION_HEIGHT + 30
}
