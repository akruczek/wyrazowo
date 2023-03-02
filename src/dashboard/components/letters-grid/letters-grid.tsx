import * as React from 'react'
import * as R from 'ramda'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { LetterCardsContainer } from './letters-grid.styled'

interface Props {
  letters: string[];
  handleSelectLetter: (letter: string, index: number) => () => void;
  isAnyLetterSelected: (index: number) => boolean;
}

export const LettersGrid = ({ letters, handleSelectLetter, isAnyLetterSelected }: Props) => (
  <>
    {R.splitEvery(7, letters).map((lettersRow: string[], rowIndex: number) => (
      <LetterCardsContainer key={String(lettersRow)}>
        {lettersRow.map((letter: string, index: number) => (
          <LetterCard
            key={`letter-card-${letter}-${index}`}
            onPress={handleSelectLetter(letter, (7 * rowIndex) + index)}
            isSelected={isAnyLetterSelected((7 * rowIndex) + index)}
            content={letter}
          />
        ))}
      </LetterCardsContainer>
    ))}
  </>
)
