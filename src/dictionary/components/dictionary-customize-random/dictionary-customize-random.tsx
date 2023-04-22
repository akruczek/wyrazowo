import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { LettersSlider } from '@core/letters-slider/letters-slider'
import { CustomButton } from '@core/custom-button/custom-button'
import { useForceUpdate } from '@core/hooks/use-force-update.hook'
import { COLOR } from '@core/colors/colors.constants'
import { LetterSliderDefaultValues } from '@core/letters-slider/models'
import { DictionaryRandomFiltersModel } from '../../dictionary.models'
import {
  DictionaryCustomizeRandomButtonsContainer, DictionaryCustomizeRandomContainer,
  DictionaryCustomizeRandomFilterButtonIcon, DictionaryCustomizeRandomClearButtonIcon,
} from './dictionary-customize-random.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize> | null;
  isFilterActive: boolean;
  filtersRef: React.MutableRefObject<null | DictionaryRandomFiltersModel>;
  onApply: (minMax: [ number, number ]) => void;
  onClear: () => void;
}

export const DictionaryCustomizeRandom = ({ modalizeRef, isFilterActive, filtersRef, onApply, onClear }: Props) => {
  const forceUpdate = useForceUpdate()

  const DEFAULT_SLIDER_VALUES: LetterSliderDefaultValues = [
    filtersRef?.current?.minMax?.[0] ?? 2,
    filtersRef?.current?.minMax?.[1] ?? 15,
    2,
    15,
    15,
  ]

  const minMaxRef = React.useRef<[ number, number ] | null>(null)

  const onChangeMinMax = (minMax: [ number, number ]) => {
    minMaxRef.current = minMax
  }

  const handleApply = () => {
    modalizeRef?.current?.close?.()

    setTimeout(() => {
      if (minMaxRef.current) {
        onApply(minMaxRef.current)
      }
    })
  }

  const handleClear = () => {
    modalizeRef?.current?.close?.()
    setTimeout(onClear)
  }

  return (
    <Modalize onOpen={forceUpdate} adjustToContentHeight ref={modalizeRef}>
      <DictionaryCustomizeRandomContainer>
        <LettersSlider onChange={onChangeMinMax} defaultValues={DEFAULT_SLIDER_VALUES} />

        <DictionaryCustomizeRandomButtonsContainer>
          <CustomButton invisible={false} onPress={handleApply} color={COLOR.DARK_SEA_GREEN} withHaptic>
            <DictionaryCustomizeRandomFilterButtonIcon />
          </CustomButton>

          {isFilterActive ? (
            <CustomButton invisible={false} onPress={handleClear} color={COLOR.FIRE_BRICK} withHaptic>
              <DictionaryCustomizeRandomClearButtonIcon />
            </CustomButton>
          ) : null}
        </DictionaryCustomizeRandomButtonsContainer>
      </DictionaryCustomizeRandomContainer>
    </Modalize>
  )
}
