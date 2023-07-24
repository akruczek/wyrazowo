import * as React from 'react'
import * as R from 'ramda'
import { useNavigation } from '@react-navigation/native'
import { useLocalize } from '@core/hooks/use-localize.hook'
import { Template } from '@core/template/template'
import { Tx } from '@core/tx'
import { GUIDELINE } from './guideline.constants'
import { getNavigationParam } from '../../../navigation/navigation.helpers'
import {
  GuidelineButtonContainer, GuidelineContainer, GuidelineGif,
  GuidelineBackIcon, GuidelineNextIcon, GuidelineButtonsContainer,
} from './guideline.styled'

export const Guideline = () => {
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

  const localize = useLocalize()

  return (
    <Template type="more" title={(localize() as any)[`guideline_${id}_headline`]} backButton>
      <GuidelineContainer>
        <GuidelineGif source={{ uri }} />
        <Tx tx={(localize() as any)[`guideline_${id}`]} spacings="L 0 0" S center />
      </GuidelineContainer>

      <GuidelineButtonsContainer>
        <GuidelineButtonContainer invisible={isMin} onPress={goBack}>
          <GuidelineBackIcon />
        </GuidelineButtonContainer>

        <Tx tx={`${guidelineIndex + 1}/${GUIDELINE[index].length}`} />

        <GuidelineButtonContainer invisible={isMax} onPress={goNext}>
          <GuidelineNextIcon />
        </GuidelineButtonContainer>
      </GuidelineButtonsContainer>
    </Template>
  )
}
