import * as React from 'react'
import { SpacingView } from '@core/styled'
import { Tx } from '@core/tx'
import { noop } from '@core/noop/noop'
import { AlertIcon } from '@core/alert-icon/alert-icon'
import { renderLetterSliderLabel } from './components/letter-slider-label/letter-slider-label'
import { renderLetterSliderRail } from './components/letter-slider-rail/letter-slider-rail'
import { renderLetterSliderThumb } from './components/letter-slider-thumb/letter-slider-thumb'
import { useLettersSlider } from './hooks/use-letters-slider.hook'
import { LetterSliderDefaultValues } from './models'
import {
  LetterSlider, LetterSliderBottomLabelBar, LetterSliderTopLabelBar, LetterSliderWrapper,
  LettersSliderContainer, LettersSliderRestoreIconContainer, LettersSliderRestoreIconStyled,
} from './letter-slider.styled'

interface Props {
  onChange: (minMax: [ number, number ]) => void;
  defaultValues: LetterSliderDefaultValues | [],
  lengthFilter: number | null;
}

export const LettersSlider = ({ onChange, lengthFilter, defaultValues }: Props) => {
  const { min, max, isWarning, defaultMin, defaultMax, isInitialValue, onValueChanged, restoreSlider } =
    useLettersSlider(onChange, defaultValues, lengthFilter)

  const _renderLetterSliderThumb = (name: 'low' | 'high') => renderLetterSliderThumb(name, [ min, max ])

  return (
    <SpacingView spacings="XS S" type="padding">
      <LetterSliderTopLabelBar>
        <Tx error={isWarning} tx={`${min} - ${max}`} bold />

        <AlertIcon
          titleLocal="alert_letters_slider_title"
          descriptionLocal="alert_letters_slider_description"
          isVisible={isWarning}
          type="error"
        />
      </LetterSliderTopLabelBar>

      <LettersSliderContainer>
        <LetterSliderWrapper>
          <LetterSlider
            step={1}
            renderThumb={_renderLetterSliderThumb}
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
        </LetterSliderWrapper>

        <LettersSliderRestoreIconContainer onPress={restoreSlider}>
          <LettersSliderRestoreIconStyled isInitialValue={isInitialValue} name="restore" />
        </LettersSliderRestoreIconContainer>
      </LettersSliderContainer>
    </SpacingView>
  )
}
