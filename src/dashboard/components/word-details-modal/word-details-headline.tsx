import * as React from 'react'
import * as R from 'ramda'
import { LetterCard } from '@core/letter-card/letter-card'
import { TEXT_SIZE } from '@core/text/text.constants'
import { RowAroundContainer } from '@core/styled'
import { Tx } from '@core/tx'
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { getWordPoints } from '../../helpers'

interface Props {
  word: string;
}

export const WordDetailsHeadline = ({ word }: Props) => {
  const RTL = useRTL()

  const letters = R.pipe(
    R.toUpper,
    R.split(''),
  )(word)

  return (
    <>
      <Tx tx={`${word} (${getWordPoints(word)})`} spacings="0 0 S 0" XL bold center uppercase />

      <RowAroundContainer RTL={RTL}>
        {letters.map((letter: string, index: number) => (
          <LetterCard
            key={`details-letter-card-${letter}-${index}`}
            content={letter}
            size={40}
            fontSize={TEXT_SIZE.M}
            withMargin
          />
        ))}
      </RowAroundContainer>
    </>
  )
}
