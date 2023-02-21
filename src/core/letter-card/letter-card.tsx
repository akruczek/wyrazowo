import * as React from 'react'
import { LetterCardContainer, LetterCardContent } from './letter-card.styled'

interface Props {
  content: string;
}

export const LetterCard = ({ content }: Props) => {
  return (
    <LetterCardContainer size={50}>
      <LetterCardContent children={content} />
    </LetterCardContainer>
  )
}
