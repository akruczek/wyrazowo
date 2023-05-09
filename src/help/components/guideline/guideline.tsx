import * as React from 'react'
import * as R from 'ramda'
import { useTheme } from 'styled-components/native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { ThemeModel } from '@core/styled/models'
import { SafeAreaFlexContainer } from '@core/styled'
import { GUIDELINE } from './guideline.constants'
import { getNavigationParam } from '../../../navigation/navigation.helpers'
import {
  GuidelineButtonContainer, GuidelineContainer, GuidelineDescription, GuidelineGif,
  GuidelineBackIcon, GuidelineNextIcon, GuidelineButtonsContainer, GuidelineIndicatorText,
  GuidelineHeadline, GuidelineBackButtonContainer, GuidelineBackButtonIcon,
} from './guideline.styled'

export const Guideline = () => {
  const theme = useTheme() as ThemeModel
  const navigation = useNavigation<any>()
  const { top: topInset } = useSafeAreaInsets()
  const [ guidelineIndex, setGuidelineIndex ] = React.useState(0)

  const index = getNavigationParam<number>('index', navigation)

  const { uri, id } = GUIDELINE[index][guidelineIndex]

  const MIN = 0
  const MAX = GUIDELINE[index].length - 1

  const isMax = guidelineIndex === MAX
  const goNext = () => {
    if (!isMax) setGuidelineIndex(R.inc)
  }

  const isMin = guidelineIndex === MIN
  const goBack = () => {
    if (!isMin) setGuidelineIndex(R.dec)
  }

  const localize = useLocalize()

  return (
    <SafeAreaFlexContainer backgroundColor={theme.backgroundPrimary}>
      <GuidelineBackButtonContainer onPress={navigation.goBack} topInset={topInset}>
        <GuidelineBackButtonIcon />
      </GuidelineBackButtonContainer>

      <GuidelineContainer>
        <GuidelineHeadline children={(localize() as any)[`guideline_${id}_headline`]} />
        <GuidelineGif source={{ uri }} />
        <GuidelineDescription children={(localize() as any)[`guideline_${id}`]} />
      </GuidelineContainer>

      <GuidelineButtonsContainer>
        <GuidelineButtonContainer invisible={isMin} onPress={goBack}>
          <GuidelineBackIcon />
        </GuidelineButtonContainer>

        <GuidelineIndicatorText children={`${guidelineIndex + 1}/${GUIDELINE[index].length}`} />

        <GuidelineButtonContainer invisible={isMax} onPress={goNext}>
          <GuidelineNextIcon />
        </GuidelineButtonContainer>
      </GuidelineButtonsContainer>
    </SafeAreaFlexContainer>
  )
}
