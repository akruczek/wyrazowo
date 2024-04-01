import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { SCREEN } from 'navigation/navigation.constants'

interface UseHeaderPress {
  onBackPress: () => void;
  onLeftIconPress: () => void;
}

export const useHeaderPress = (
  leftScreen?: SCREEN,
  backButtonAlert?: Function,
  navigationParams?: {[key: string]: any},
): UseHeaderPress => {
  const navigation = useNavigation<any>()
  const localize = useLocalize()

  const onBackPress = () => {
    if (backButtonAlert) {
      backButtonAlert(localize, navigation.goBack)
    } else {
      navigation.goBack()
    }
  }

  const onLeftIconPress = () => navigation.navigate(leftScreen, navigationParams)

  return { onBackPress, onLeftIconPress }
}
