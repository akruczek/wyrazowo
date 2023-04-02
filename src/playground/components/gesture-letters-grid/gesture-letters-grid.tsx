import * as React from 'react'
import * as R from 'ramda'
import Draggable from 'react-native-draggable'
import { PanResponderGestureState, GestureResponderEvent } from 'react-native'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { ALL_LETTERS_SORTED, LETTER_SOAP } from '../../../core/letter-card/letter-card.constants'
import { useGestureLettersIndexes } from '../../hooks/use-gesture-letters-indexes.hook'
import { useGestureLettersInitialCoords } from '../../hooks/use-gesture-letters-initial-coords'
import { GestureLettersGridArrow } from './gesture-letters-grid-arrow'
import {
  GestureLetterCardsBottomArrowWrapper, GestureLetterCardsContainer,
  GestureLetterCardsPagingStateText, GestureLetterCardsTopArrowWrapper,
} from './gesture-letters-grid.styled'

interface Props {
  onDragRelease: (letter: string) => (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
}

export const GestureLettersGrid = ({
  onDragRelease,
}: Props) => {
  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_SOAP, LETTER_SOAP ]

  const { incrementIndex, decrementIndex, minReached, maxReached, visibleIndex, pagingState } =
    useGestureLettersIndexes()

  const { getInitialYPosition, getInitialXPosition, getInitialY } =
    useGestureLettersInitialCoords(visibleIndex)

  return (
    <>
      <GestureLettersGridArrow
        condition={minReached}
        onPress={decrementIndex}
        getInitialY={getInitialY}
        icon="arrow-up"
        Wrapper={GestureLetterCardsTopArrowWrapper}
      />

      <GestureLetterCardsPagingStateText y={getInitialY()} children={`${pagingState[0]} / ${pagingState[1]}`} />

      {R.splitEvery(7, letters).map((lettersRow: string[], rowIndex: number) => (rowIndex >= visibleIndex && rowIndex <= visibleIndex + 1) ? (
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
      ) : null)}

      <GestureLettersGridArrow
        condition={maxReached}
        onPress={incrementIndex}
        getInitialY={getInitialY}
        icon="arrow-down"
        Wrapper={GestureLetterCardsBottomArrowWrapper}
      />
    </>
  )
}
