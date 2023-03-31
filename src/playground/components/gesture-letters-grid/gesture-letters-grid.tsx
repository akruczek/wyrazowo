import * as React from 'react'
import * as R from 'ramda'
import { Dimensions, PanResponderGestureState, GestureResponderEvent, View } from 'react-native'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { GestureLetterCardsContainer } from './gesture-letters-grid.styled'
import { ALL_LETTERS_SORTED, LETTER_SOAP } from '../../../core/letter-card/letter-card.constants'
import { noop } from '../../../core/noop/noop'
import Draggable from 'react-native-draggable'
import { LETTER_CARD_DEFAULT_SIZE } from '../../../core/letter-card/letter-card.styled'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { BOTTOM_NAVIGATION_HEIGHT } from '../../../navigation/navigation.constants'

interface Props {
  onDragRelease: (letter: string) => (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
}

export const GestureLettersGrid = ({
  onDragRelease,
}: Props) => {
  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_SOAP, LETTER_SOAP ]

  const { top: topInset, bottom: bottomInset } = useSafeAreaInsets()

  const getInitialYPosition = (rowIndex: number) => {
    const { height, width } = Dimensions.get('screen')
    const baseY = height - width - topInset - bottomInset - BOTTOM_NAVIGATION_HEIGHT - LETTER_CARD_DEFAULT_SIZE
    const paddingOffset = rowIndex !== 0 ? (1 * rowIndex) : 0

    return -baseY + (LETTER_CARD_DEFAULT_SIZE * rowIndex) + paddingOffset
  }

  const getInitialXPosition = (index: number) => {
    const paddingOffset = ((LETTER_CARD_DEFAULT_SIZE / 7) - 1) / 2

    return LETTER_CARD_DEFAULT_SIZE * index + (((LETTER_CARD_DEFAULT_SIZE / 7) - 1) * index) + paddingOffset
  }

  return (
    <>
      {R.splitEvery(7, letters).map((lettersRow: string[], rowIndex: number) => (
        <GestureLetterCardsContainer key={String(lettersRow)}>
          {lettersRow.map((letter: string, index: number) => (
            <Draggable
              key={`gesture-letter-card-${letter}-${index * rowIndex}`}
              y={getInitialYPosition(rowIndex)}
              x={getInitialXPosition(index)}
              onDragRelease={onDragRelease(letter)}
              shouldReverse
            >
              <LetterCard content={letter} />
            </Draggable>
          ))}
        </GestureLetterCardsContainer>
      ))}
    </>
  )
}
