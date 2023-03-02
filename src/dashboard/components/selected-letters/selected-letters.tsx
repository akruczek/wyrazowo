import * as React from 'react'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { SelectedLettersContainer } from './selected-letters.styled'

interface Props {
  selectedLetters: string[];
  handleDeselectLetter: (index: number) => () => void;
}

export const SelectedLetters = ({ selectedLetters, handleDeselectLetter }: Props) => (
  <SelectedLettersContainer>
    {selectedLetters.map((letter: string, index: number) => (
      <LetterCard
        key={`selected-letter-${letter}-${index}`}
        onPress={handleDeselectLetter(index)}
        content={letter}
        withMargin
      />
    ))}
  </SelectedLettersContainer>
)
