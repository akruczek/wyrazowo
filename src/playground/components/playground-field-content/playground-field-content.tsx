import * as React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Tx } from '@core/tx'
import { COLOR } from '@core/colors/colors.constants'
import { LetterCard } from '@core/letter-card/letter-card'
import { TEXT_SIZE } from '@core/text/text.constants'
import { PLAYGROUND_FIELD_TYPE } from '../../playground.constants'
import { PLAYGROUND_FIELD_SIZE } from '../playground-field/playground-field.styled'

interface Props {
  selectedLetters: (string | null)[];
  index: number;
  type: PLAYGROUND_FIELD_TYPE;
  onPress: (index: number) => void;
  onLongPress?: (index: number) => void;
}

export const PlaygroundFieldContent = ({ selectedLetters, index, type, onPress, onLongPress }: Props) => {
  if (selectedLetters[index]) {
    const _onPress = () => onPress(index)
    const _onLongPress = () => onLongPress?.(index)

    return (
      <LetterCard
        size={PLAYGROUND_FIELD_SIZE}
        fontSize={TEXT_SIZE.XS}
        content={selectedLetters[index] ?? ''}
        onPress={_onPress}
        onLongPress={_onLongPress}
        noMargin
      />
    )
  }

  if (type === PLAYGROUND_FIELD_TYPE.STAR) {
    return <MaterialCommunityIcons name="star" color={COLOR.WHITE_SMOKE} size={PLAYGROUND_FIELD_SIZE * 0.9} />
  }

  if (type === PLAYGROUND_FIELD_TYPE.DOUBLE) {
    return <Tx tx="2X" themeColor="textSecondary" XXS />
  }

  if (type === PLAYGROUND_FIELD_TYPE.TRIPLE) {
    return <Tx tx="3X" themeColor="textSecondary" XXS />
  }

  return null
}
