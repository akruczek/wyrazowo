import * as React from 'react'
import * as R from 'ramda'
import Draggable from 'react-native-draggable'
import { PanResponderGestureState, GestureResponderEvent } from 'react-native'
import { Portal } from 'react-native-portalize'
import { useNavigation } from '@react-navigation/native'
import { LetterCard } from '@core/letter-card/letter-card'
import { ALL_LETTERS_SORTED } from '@core/letter-card/letter-card.constants'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { RowAroundContainer } from '@core/styled'
import { RESPONSIVE } from '@core/responsive/responsive'
import { useGestureLettersIndexes } from '../../hooks/use-gesture-letters-indexes.hook'
import { useGestureLettersInitialCoords } from '../../hooks/use-gesture-letters-initial-coords'
import { GestureLettersGridArrow } from './gesture-letters-grid-arrow'
import { SCREEN } from '../../../navigation/navigation.constants'
import { ClearLettersButtonIcon } from '../../../dashboard/components/dashboard-buttons-and-modals/dashboard-buttons.styled'
import {
  GestureLetterButtonsContainer, GestureLetterCardsBackground, GestureLetterCardsBottomArrowWrapper,
  GestureLetterCardsPagingStateText, GestureLetterCardsTopArrowWrapper, GestureLetterCardsUserSelectedLettersIcon,
  GestureLetterCardsUserSelectedLettersIconContainer, GestureLetterCardsUserSelectedLettersText,
} from './gesture-letters-grid.styled'

interface Props {
  userSelectedLetters: string[];
  selectedLetters: (string | null)[];
  onDragRelease: (letter: string) => (event: GestureResponderEvent, gestureState: PanResponderGestureState) => void;
  handleClearPlayground: () => void;
}

export const GestureLettersGrid = ({
  onDragRelease, handleClearPlayground, userSelectedLetters, selectedLetters,
}: Props) => {
  const navigation = useNavigation<any>()

  const { incrementIndex, decrementIndex, minReached, maxReached, visibleIndex, pagingState } =
    useGestureLettersIndexes()

  const { getInitialYPosition, getInitialXPosition, getInitialY, topInset, bottomInset } =
    useGestureLettersInitialCoords(visibleIndex)

  const handleNavigateToDashboard = () => {
    navigation.navigate(SCREEN.DASHBOARD)
  }

  return (
    <>
      <GestureLetterCardsBackground {...{ topInset, bottomInset }} />

      <Portal>
        <GestureLetterButtonsContainer>
          <CustomButton
            color={COLOR.FIRE_BRICK}
            onPress={handleClearPlayground}
            invisible={!selectedLetters.length}
          >
            <ClearLettersButtonIcon />
          </CustomButton>
        </GestureLetterButtonsContainer>
      </Portal>

      <GestureLettersGridArrow
        condition={minReached}
        onPress={decrementIndex}
        getInitialY={getInitialY}
        icon="arrow-up"
        Wrapper={GestureLetterCardsTopArrowWrapper}
      />

      <GestureLetterCardsUserSelectedLettersIconContainer onPress={handleNavigateToDashboard} y={getInitialY()}>
        <GestureLetterCardsUserSelectedLettersIcon />
      </GestureLetterCardsUserSelectedLettersIconContainer>
      <GestureLetterCardsUserSelectedLettersText y={getInitialY()} children={` ${userSelectedLetters?.length}`} />
      <GestureLetterCardsPagingStateText y={getInitialY()} children={`${pagingState[0]} / ${pagingState[1]}`} />

      {R.splitEvery(8, ALL_LETTERS_SORTED).map((lettersRow: string[], rowIndex: number) => (rowIndex >= visibleIndex && rowIndex <= visibleIndex + 1) ? (
        <RowAroundContainer key={String(lettersRow)}>
          {lettersRow.map((letter: string, index: number) => (
            <Draggable
              key={`gesture-letter-card-${letter}-${index * rowIndex}`}
              y={getInitialYPosition(rowIndex)}
              x={getInitialXPosition(index)}
              onDragRelease={onDragRelease(letter)}
              shouldReverse
            >
              <LetterCard
                size={RESPONSIVE.WIDTH(12)}
                fontSize={RESPONSIVE.WIDTH(6.6)}
                content={letter}
              />
            </Draggable>
          ))}
        </RowAroundContainer>
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
