import * as React from 'react'
import * as R from 'ramda'
import { View } from 'react-native'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { SelectedLettersContainer } from './selected-letters.styled'
import { LETTER_SOAP, LETTER_SOAP_PLACEHOLDER } from '../../../core/letter-card/letter-card.constants'

interface Props {
  selectedLetters: string[];
  handleDeselectLetter: (index: number) => () => void;
}

export const SelectedLetters = ({ selectedLetters, handleDeselectLetter }: Props) => {
  const getContent = (letter: string) => letter.includes(LETTER_SOAP_PLACEHOLDER) ? LETTER_SOAP : letter

  return (
    <View>
      <SelectedLettersContainer>
        {selectedLetters.slice(0, 7).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${index}`}
            onPress={handleDeselectLetter(index)}
            content={getContent(letter)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            withMargin
          />
        ))}
      </SelectedLettersContainer>

      <SelectedLettersContainer>
        {selectedLetters.slice(7).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${index}`}
            onPress={handleDeselectLetter(7 + index)}
            content={getContent(letter)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            withMargin
          />
        ))}
      </SelectedLettersContainer>
    </View>
  )
}
