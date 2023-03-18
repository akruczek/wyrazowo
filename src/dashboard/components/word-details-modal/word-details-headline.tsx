import * as React from 'react'
import * as R from 'ramda'
import { LetterCard } from '../../../core/letter-card/letter-card'
import { TEXT_SIZE } from '../../../core/text/text.constants'
import { getWordPoints } from '../../helpers/get-word-points.helper'
import { LetterCardsContainer } from '../letters-grid/letters-grid.styled'
import { WordDetailsHeadlineText } from './word-details-modal.styled'

interface Props {
  word: string;
}

export const WordDetailsHeadline = ({ word }: Props) => {
  const letters = R.pipe(
    R.toUpper,
    R.split(''),
  )(word)

  return (
    <>
      <WordDetailsHeadlineText children={`${word} (${getWordPoints(word)})`} />

      <LetterCardsContainer>
        {letters.map((letter: string, index: number) => (
          <LetterCard
            key={`details-letter-card-${letter}-${index}`}
            content={letter}
            size={40}
            fontSize={TEXT_SIZE.M}
            withMargin
          />
        ))}
      </LetterCardsContainer>
    </>
  )
}
