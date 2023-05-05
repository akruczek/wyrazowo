import * as React from 'react'
import { CharadeFieldContainer } from './charade-field.styled'

interface Props {
  count: number;
}

export const CharadeField = ({ count }: Props) => {
  return (
    <CharadeFieldContainer count={count}>

    </CharadeFieldContainer>
  )
}
