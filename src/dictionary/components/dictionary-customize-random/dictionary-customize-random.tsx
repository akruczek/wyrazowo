import * as React from 'react'
import { Modalize } from 'react-native-modalize'
import { LettersSlider } from '../../../core/letters-slider/letters-slider'
import { CustomButton } from '../../../core/custom-button/custom-button'
import { COLOR } from '../../../core/colors/colors.constants'
import {
  DictionaryCustomizeRandomButtonsContainer, DictionaryCustomizeRandomContainer,
  DictionaryCustomizeRandomFilterButtonIcon, DictionaryCustomizeRandomClearButtonIcon,
} from './dictionary-customize-random.styled'

interface Props {
  modalizeRef: React.MutableRefObject<Modalize> | null;
  onApply: (minMax: [ number, number ]) => void;
  onClear: () => void;
}

export const DictionaryCustomizeRandom = ({ modalizeRef, onApply, onClear }: Props) => {
  const DEFAULT_SLIDER_VALUES: [ number, number, number, number ] = [ 15, 2, 15, 15 ]
  const minMaxRef = React.useRef<[ number, number ] | null>(null)

  const onChangeMinMax = (minMax: [ number, number ]) => {
    minMaxRef.current = minMax
  }

  const handleApply = () => {
    modalizeRef?.current?.close?.()

    if (minMaxRef.current) {
      onApply(minMaxRef.current)
    }
  }

  const handleClear = () => {
    modalizeRef?.current?.close?.()
    onClear()
  }

  return (
    <Modalize adjustToContentHeight ref={modalizeRef}>
      <DictionaryCustomizeRandomContainer>
        <LettersSlider onChange={onChangeMinMax} defaultValues={DEFAULT_SLIDER_VALUES} />

        <DictionaryCustomizeRandomButtonsContainer>
          <CustomButton invisible={false} onPress={handleApply} color={COLOR.DARK_SEA_GREEN} withHaptic>
            <DictionaryCustomizeRandomFilterButtonIcon />
          </CustomButton>

          <CustomButton invisible={false} onPress={handleClear} color={COLOR.FIRE_BRICK} withHaptic>
            <DictionaryCustomizeRandomClearButtonIcon />
          </CustomButton>
        </DictionaryCustomizeRandomButtonsContainer>
      </DictionaryCustomizeRandomContainer>
    </Modalize>
  )
}
