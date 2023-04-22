import * as React from 'react'
import * as R from 'ramda'
import Draggable from 'react-native-draggable'
import { useNavigation } from '@react-navigation/native'
import { PanResponderGestureState, GestureResponderEvent } from 'react-native'
import { LetterCard } from '@core/letter-card/letter-card'
import { ALL_LETTERS_SORTED, LETTER_SOAP } from '@core/letter-card/letter-card.constants'
import { CustomButton } from '@core/custom-button/custom-button'
import { COLOR } from '@core/colors/colors.constants'
import { RowAroundContainer } from '@core/styled'
import { noop } from '@core/noop/noop'
import { useGestureLettersIndexes } from '../../hooks/use-gesture-letters-indexes.hook'
import { useGestureLettersInitialCoords } from '../../hooks/use-gesture-letters-initial-coords'
import { GestureLettersGridArrow } from './gesture-letters-grid-arrow'
import { SCREEN } from '../../../navigation/navigation.constants'
import { ClearLettersButtonIcon, SearchButtonIcon } from '../../../dashboard/components/dashboard-buttons/dashboard-buttons.styled'
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
  const letters = [ ...ALL_LETTERS_SORTED, LETTER_SOAP, LETTER_SOAP, LETTER_SOAP ]

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

      {R.splitEvery(7, letters).map((lettersRow: string[], rowIndex: number) => (rowIndex >= visibleIndex && rowIndex <= visibleIndex + 1) ? (
        <RowAroundContainer key={String(lettersRow)}>
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
        </RowAroundContainer>
      ) : null)}

      <GestureLettersGridArrow
        condition={maxReached}
        onPress={incrementIndex}
        getInitialY={getInitialY}
        icon="arrow-down"
        Wrapper={GestureLetterCardsBottomArrowWrapper}
      />

      <GestureLetterButtonsContainer>
        <CustomButton color={COLOR.DODGER_BLUE} onPress={noop} invisible>
          <SearchButtonIcon />
        </CustomButton>

        <CustomButton
          color={COLOR.FIRE_BRICK}
          onPress={handleClearPlayground}
          invisible={!selectedLetters.length}
        >
          <ClearLettersButtonIcon />
        </CustomButton>
      </GestureLetterButtonsContainer>
    </>
  )
}
