import * as React from 'react'
import { View } from 'react-native'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { SelectedLettersContainer } from './selected-letters.styled'

interface Props {
  selectedLetters: string[];
  handleDeselectLetter: (index: number) => () => void;
}

export const SelectedLetters = ({ selectedLetters, handleDeselectLetter }: Props) => (
  <View>
    <SelectedLettersContainer>
      {selectedLetters.slice(0, 7).map((letter: string, index: number) => (
        <LetterCard
          key={`selected-letter-${letter}-${index}`}
          onPress={handleDeselectLetter(index)}
          content={letter}
          withMargin
        />
      ))}
    </SelectedLettersContainer>

    <SelectedLettersContainer>
      {selectedLetters.slice(7).map((letter: string, index: number) => (
        <LetterCard
          key={`selected-letter-${letter}-${index}`}
          onPress={handleDeselectLetter(7 + index)}
          content={letter}
          withMargin
        />
      ))}
    </SelectedLettersContainer>
  </View>
)
