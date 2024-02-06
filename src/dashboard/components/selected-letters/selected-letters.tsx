import * as React from 'react'
import { LetterCard } from '@core/letter-card/letter-card'
import { RESPONSIVE } from '@core/responsive/responsive'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { LETTER_INDEX_SEPARATOR, LETTER_SOAP, LETTER_SOAP_PLACEHOLDER } from '@core/letter-card/letter-card.constants'
import { SelectedLettersAddSoapContainer, SelectedLettersContainer } from './selected-letters.styled'

interface Props {
  selectedLetters: string[];
  handleDeselectLetter?: (index: number) => () => void;
  onLongPressSelectedLetter?: (index: number) => () => void;
  handleSelectLetter?: (letter: string) => void;
  handleLongPress?: () => void;
}

export const SelectedLetters = ({
  selectedLetters, onLongPressSelectedLetter, handleDeselectLetter, handleSelectLetter, handleLongPress,
}: Props) => {
  const RTL = useRTL()

  const isReadonly = !handleDeselectLetter && !onLongPressSelectedLetter && !handleSelectLetter && !handleLongPress

  const getContent = (letter: string) => letter.includes(LETTER_SOAP_PLACEHOLDER)
    ? LETTER_SOAP
    : letter.includes(LETTER_INDEX_SEPARATOR)
      ? letter.split(LETTER_INDEX_SEPARATOR)?.[0]
      : letter

  const handleAddSoapLetter = () => handleSelectLetter?.(LETTER_SOAP)

  return (
    <>
      <SelectedLettersContainer RTL={RTL}>
        {selectedLetters.slice(0, 8).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${index}`}
            onPress={handleDeselectLetter?.(index)}
            onLongPress={onLongPressSelectedLetter?.(index)}
            content={getContent(letter)}
            size={RESPONSIVE.WIDTH(12)}
            fontSize={RESPONSIVE.WIDTH(6.6)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            forcedIndex={letter.split(LETTER_INDEX_SEPARATOR)?.[1]}
            withMargin
          />
        ))}
      </SelectedLettersContainer>

      <SelectedLettersContainer RTL={RTL}>
        {selectedLetters.slice(8).map((letter: string, index: number) => (
          <LetterCard
            key={`selected-letter-${letter}-${8 + index}`}
            onPress={handleDeselectLetter?.(8 + index)}
            onLongPress={onLongPressSelectedLetter?.(8 + index)}
            content={getContent(letter)}
            multiLetter={letter.includes(LETTER_SOAP_PLACEHOLDER)}
            forcedIndex={letter.split(LETTER_INDEX_SEPARATOR)?.[1]}
            size={RESPONSIVE.WIDTH(12)}
            fontSize={RESPONSIVE.WIDTH(6.6)}
            withMargin
          />
        ))}


        {isReadonly ? null : (
          <SelectedLettersAddSoapContainer>
            <LetterCard
              key="selected-letter-add-soap"
              onPress={handleAddSoapLetter}
              onLongPress={handleLongPress}
              content="+?"
              size={RESPONSIVE.WIDTH(12)}
              fontSize={RESPONSIVE.WIDTH(6.6)}
              disabled={selectedLetters.length === 15}
              withMargin
            />
          </SelectedLettersAddSoapContainer>
        )}
      </SelectedLettersContainer>
    </>
  )
}
