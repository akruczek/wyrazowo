import * as React from 'react'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { SelectedLettersContainer } from './selected-letters.styled'
import { LETTER_SOAP, LETTER_SOAP_PLACEHOLDER } from '../../../core/letter-card/letter-card.constants'
import { RESPONSIVE } from '../../../core/responsive/responsive'
import { MarginView } from '../../../core/styled/margin-view.styled'

interface Props {
  selectedLetters: string[];
  handleDeselectLetter: (index: number) => () => void;
}

export const SelectedLetters = ({ selectedLetters, handleDeselectLetter }: Props) => {
  const getContent = (letter: string) => letter.includes(LETTER_SOAP_PLACEHOLDER) ? LETTER_SOAP : letter

  return (
    <MarginView margins={[ 0, 0, 10, 0 ]}>
      <SelectedLettersContainer>
        {selectedLetters.slice(0, 7).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${index}`}
            onPress={handleDeselectLetter(index)}
            content={getContent(letter)}
            size={RESPONSIVE.WIDTH(12.8)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            withMargin
          />
        ))}
      </SelectedLettersContainer>

      <SelectedLettersContainer>
        {selectedLetters.slice(7).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${7 + index}`}
            onPress={handleDeselectLetter(7 + index)}
            content={getContent(letter)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            size={RESPONSIVE.WIDTH(12.8)}
            withMargin
          />
        ))}
      </SelectedLettersContainer>
    </MarginView>
  )
}
