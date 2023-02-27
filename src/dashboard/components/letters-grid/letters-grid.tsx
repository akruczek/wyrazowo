import * as React from 'react'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { LetterCardsContainer } from './letters-grid.styled'

interface Props {
  letters: string[];
  handleSelectLetter: (letter: string, index: number) => () => void;
  isAnyLetterSelected: (index: number) => boolean;
}

export const LettersGrid = ({ letters, handleSelectLetter, isAnyLetterSelected }: Props) => (
  <LetterCardsContainer>
    {letters.map((letter: string, index: number) => (
      <LetterCard
        key={`letter-card-${letter}-${index}`}
        onPress={handleSelectLetter(letter, index)}
        isSelected={isAnyLetterSelected(index)}
        content={letter}
      />
    ))}
  </LetterCardsContainer>
)
