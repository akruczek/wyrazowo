import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { genericLightShadow, genericTextShadow } from '../../../core/shadow/shadow.constants'
import { COLOR } from '../../../core/colors/colors.constants'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import {
  DictionaryHeaderContainer, DictionaryHeaderText, DictionaryRandomWordButtonContainer,
} from './dictionary-header.styled'

interface Props {
  topInset: number;
  handlePressRandom: () => void;
}

export const DictionaryHeader = ({ topInset, handlePressRandom }: Props) => (
  <DictionaryHeaderContainer topInset={topInset}>
    <DictionaryHeaderText style={genericTextShadow} children="DICTIONARY" />

    <DictionaryRandomWordButtonContainer onPress={handlePressRandom} style={genericLightShadow} topInset={topInset}>
      <MaterialCommunityIcons name="dice-5" color={COLOR.WHITE} size={TEXT_SIZE.XL} />
    </DictionaryRandomWordButtonContainer>
  </DictionaryHeaderContainer>
)
