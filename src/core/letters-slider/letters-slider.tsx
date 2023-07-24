import * as React from 'react'
import { SpacingView } from '@core/styled'
import { Tx } from '@core/tx'
import { noop } from '@core/noop/noop'
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
    <SpacingView spacings="XXXS S" type="padding">
      <LetterSliderTopLabelBar>
        <LetterSliderLengthIcon />
        <Tx tx={`${min} - ${max}`} spacings="0 XXS 0 S" bold />
      </LetterSliderTopLabelBar>

      <LetterSlider
        step={1}
        renderThumb={renderLetterSliderThumb}
        renderRail={renderLetterSliderRail}
        renderRailSelected={noop}
        renderLabel={renderLetterSliderLabel(defaultMin, defaultMax)}
        renderNotch={noop}
        onValueChanged={onValueChanged}
        min={defaultMin}
        max={defaultMax}
        low={min}
        high={max}
        floatingLabel
      />

      <LetterSliderBottomLabelBar>
        <Tx tx={defaultMin} spacings="0 XXS 0 S" bold />
        <Tx tx={defaultMax} spacings="0 XXS 0 S" bold />
      </LetterSliderBottomLabelBar>
    </SpacingView>
  )
}
