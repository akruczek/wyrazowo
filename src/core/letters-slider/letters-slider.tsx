import * as React from 'react'
import { PaddingView } from '@core/styled'
import { Tx } from '@core/tx'
import { renderLetterSliderLabel } from './components/letter-slider-label/letter-slider-label'
import { renderLetterSliderRail } from './components/letter-slider-rail/letter-slider-rail'
import { renderLetterSliderThumb } from './components/letter-slider-thumb/letter-slider-thumb'
import { useLettersSlider } from './hooks/use-letters-slider.hook'
import { LetterSliderDefaultValues } from './models'
import {
  LetterSlider, LetterSliderBottomLabelBar, LetterSliderLengthIcon, LetterSliderTopLabelBar
} from './letter-slider.styled'

interface Props {
  onChange: (minMax: [ number, number ]) => void;
  defaultValues: LetterSliderDefaultValues | [],
}

export const LettersSlider = ({ onChange, defaultValues }: Props) => {
  const { min, max, defaultMin, defaultMax, onValueChanged } = useLettersSlider(onChange, defaultValues)

  return (
    <PaddingView paddings={[ 2, 10 ]}>
      <LetterSliderTopLabelBar>
        <LetterSliderLengthIcon />
        <Tx tx={`${min} - ${max}`} margins={[ 0, 5, 0, 10 ]} bold />
      </LetterSliderTopLabelBar>

      <LetterSlider
        step={1}
        renderThumb={renderLetterSliderThumb}
        renderRail={renderLetterSliderRail}
        renderRailSelected={() => null}
        renderLabel={renderLetterSliderLabel(defaultMin, defaultMax)}
        renderNotch={() => null}
        onValueChanged={onValueChanged}
        min={defaultMin}
        max={defaultMax}
        low={min}
        high={max}
        floatingLabel
      />

      <LetterSliderBottomLabelBar>
        <Tx tx={defaultMin} margins={[ 0, 5, 0, 10 ]} bold />
        <Tx tx={defaultMax} margins={[ 0, 5, 0, 10 ]} bold />
      </LetterSliderBottomLabelBar>
    </PaddingView>
  )
}
