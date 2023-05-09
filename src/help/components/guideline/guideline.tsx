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

  const goNext = () => setGuidelineIndex(R.inc)
  const goBack = () => setGuidelineIndex(R.dec)

  const { uri, id } = GUIDELINE[index][guidelineIndex]

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
        <GuidelineButtonContainer onPress={goBack}>
          <GuidelineBackIcon />
        </GuidelineButtonContainer>

        <GuidelineIndicatorText children={`${guidelineIndex + 1}/${GUIDELINE[index].length + 1}`} />

        <GuidelineButtonContainer onPress={goNext}>
          <GuidelineNextIcon />
        </GuidelineButtonContainer>
      </GuidelineButtonsContainer>
    </SafeAreaFlexContainer>
  )
}
