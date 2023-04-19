import * as React from 'react'
import { View } from 'react-native'
import { genericLightShadow } from '@core/shadow/shadow.constants'
import { PLAYGROUND_FIELD_TYPE } from '../../playground.constants'
import { PlaygroundFieldContent } from '../playground-field-content/playground-field-content'
import { PlaygroundFieldContainer } from './playground-field.styled'

interface Props {
  type: PLAYGROUND_FIELD_TYPE;
  fieldRefs: (View | null)[];
  selectedLetters: (string | null)[];
  index: number;
  onPress: (index: number) => void;
}

export const PlaygroundField = ({ type, fieldRefs, selectedLetters, index, onPress }: Props) => {
  return (
    <PlaygroundFieldContainer
      ref={ref => { fieldRefs[index] = ref }}
      type={type}
    >
      <PlaygroundFieldContent {...{ type, index, selectedLetters, onPress }} />
    </PlaygroundFieldContainer>
  )
}
