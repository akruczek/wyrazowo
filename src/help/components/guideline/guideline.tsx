import * as React from 'react'
import * as R from 'ramda'
import { useNavigation } from '@react-navigation/native'
import { Template } from '@core/template/template'
import { Tx } from '@core/tx'
import { Localization } from '@core/localize/localize.models'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { GUIDELINE } from './guideline.constants'
import { getNavigationParam } from '../../../navigation/navigation.helpers'
import {
  GuidelineButtonContainer, GuidelineContainer, GuidelineGif,
  GuidelineBackIcon, GuidelineNextIcon, GuidelineButtonsContainer,
} from './guideline.styled'

export const Guideline = () => {
  const RTL = useRTL()
  const navigation = useNavigation<any>()
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

  return (
    <Template type="more" local={`guideline_${id}_headline` as Localization} backButton>
      <GuidelineContainer>
        <GuidelineGif source={{ uri }} />
        <Tx local={`guideline_${id}` as Localization} spacings="L 0 0" S center />
      </GuidelineContainer>

      <GuidelineButtonsContainer RTL={RTL}>
        <GuidelineButtonContainer invisible={isMin} onPress={goBack}>
          <GuidelineBackIcon RTL={RTL} />
        </GuidelineButtonContainer>

        <Tx tx={`${guidelineIndex + 1}/${GUIDELINE[index].length}`} />

        <GuidelineButtonContainer invisible={isMax} onPress={goNext}>
          <GuidelineNextIcon RTL={RTL} />
        </GuidelineButtonContainer>
      </GuidelineButtonsContainer>
    </Template>
  )
}
