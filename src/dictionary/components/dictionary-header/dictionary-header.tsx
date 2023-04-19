import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { genericLightShadow, genericTextShadow } from '@core/shadow/shadow.constants'
import { COLOR } from '@core/colors/colors.constants'
import { TEXT_SIZE } from '@core/text/text.constants'
import { useLocalize } from '@core/hooks/use-localize.hook'
import {
  DictionaryHeaderContainer, DictionaryHeaderText, DictionaryRandomWordButtonContainer,
  DictionaryRandomWordButtonFilterCircle,
} from './dictionary-header.styled'

interface Props {
  topInset: number;
  isFilterActive: boolean;
  handlePressRandom: () => void;
  handleLongPressRandom: () => void;
}

export const DictionaryHeader = ({ topInset, isFilterActive, handlePressRandom, handleLongPressRandom }: Props) => {
  const localize = useLocalize()

  return (
    <DictionaryHeaderContainer topInset={topInset}>
      <DictionaryHeaderText style={genericTextShadow} children={localize().dictionary} />

      <DictionaryRandomWordButtonContainer
        onPress={handlePressRandom}
        onLongPress={handleLongPressRandom}
        style={genericLightShadow}
        topInset={topInset}
      >
        {isFilterActive ? <DictionaryRandomWordButtonFilterCircle /> : null}
        <MaterialCommunityIcons name="dice-5" color={COLOR.WHITE} size={TEXT_SIZE.XL} />
      </DictionaryRandomWordButtonContainer>
    </DictionaryHeaderContainer>
  )
}