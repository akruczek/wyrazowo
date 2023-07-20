import * as React from 'react'
import { LetterCard } from '@core/letter-card/letter-card'
import { RESPONSIVE } from '@core/responsive/responsive'
import { MarginView } from '@core/styled'
import { LETTER_INDEX_SEPARATOR, LETTER_SOAP, LETTER_SOAP_PLACEHOLDER } from '@core/letter-card/letter-card.constants'
import { SelectedLettersContainer } from './selected-letters.styled'

interface Props {
  selectedLetters: string[];
  handleDeselectLetter: (index: number) => () => void;
  onLongPressSelectedLetter: (index: number) => () => void;
}

export const SelectedLetters = ({ selectedLetters, onLongPressSelectedLetter, handleDeselectLetter }: Props) => {
  const getContent = (letter: string) => letter.includes(LETTER_SOAP_PLACEHOLDER)
    ? LETTER_SOAP
    : letter.includes(LETTER_INDEX_SEPARATOR)
      ? letter.split(LETTER_INDEX_SEPARATOR)?.[0]
      : letter

  return (
    <MarginView margins={[ 0, 0, 30, 0 ]}>
      <SelectedLettersContainer>
        {selectedLetters.slice(0, 7).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${index}`}
            onPress={handleDeselectLetter(index)}
            onLongPress={onLongPressSelectedLetter(index)}
            content={getContent(letter)}
            size={RESPONSIVE.WIDTH(12.8)}
            fontSize={RESPONSIVE.WIDTH(6.6)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            forcedIndex={letter.split(LETTER_INDEX_SEPARATOR)?.[1]}
            withMargin
          />
        ))}
      </SelectedLettersContainer>

      <SelectedLettersContainer>
        {selectedLetters.slice(7).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${7 + index}`}
            onPress={handleDeselectLetter(7 + index)}
            onLongPress={onLongPressSelectedLetter(7 + index)}
            content={getContent(letter)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            forcedIndex={letter.split(LETTER_INDEX_SEPARATOR)?.[1]}
            size={RESPONSIVE.WIDTH(12.8)}
            fontSize={RESPONSIVE.WIDTH(6.6)}
            withMargin
          />
        ))}
      </SelectedLettersContainer>
    </MarginView>
  )
}
