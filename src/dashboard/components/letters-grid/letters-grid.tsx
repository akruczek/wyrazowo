import * as React from 'react'
import * as R from 'ramda'
import { LetterCard } from '@core/letter-card/letter-card'
import { ALL_LETTERS_SORTED, LETTER_EMPTY, LETTER_SOAP } from '@core/letter-card/letter-card.constants'
import { RowAroundContainer } from '@core/styled'
import { RESPONSIVE } from '@core/responsive/responsive'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'

interface Props {
  letters?: string[];
  handleSelectLetter: (letter: string, index: number) => void;
  handleLongPress?: () => void;
  selectable?: boolean;
  selectedLetters?: string[];
}

export const LettersGrid = ({
  letters, selectable, selectedLetters, handleSelectLetter, handleLongPress,
}: Props) => {
  const RTL = useRTL()
  
  const onPress = (letter: string, rowIndex: number, index: number) =>
    R.equals(letter, LETTER_EMPTY)
      ? undefined
      : () => handleSelectLetter(letter, (7 * rowIndex) + index)

  const onLongPress = (letter: string) =>
    R.equals(letter, LETTER_EMPTY)
      ? undefined
      : () => handleLongPress && R.equals(letter, LETTER_SOAP) ? handleLongPress() : undefined

  return (
    <>
      {R.splitEvery(8, letters ?? ALL_LETTERS_SORTED).map((lettersRow: string[], rowIndex: number) => (
        <RowAroundContainer key={String(lettersRow)} RTL={RTL}>
          {lettersRow.map((letter: string, index: number) => (
            <LetterCard
              key={`letter-card-${letter}-${index}`}
              onPress={onPress(letter, rowIndex, index)}
              onLongPress={onLongPress(letter)}
              content={letter}  
              fontSize={RESPONSIVE.WIDTH(6.6)}
              selectable={selectable}
              selectedLetters={selectedLetters}
              disabled={selectedLetters?.length === 15}
            />
          ))}
        </RowAroundContainer>
      ))}
    </>
  )
}
