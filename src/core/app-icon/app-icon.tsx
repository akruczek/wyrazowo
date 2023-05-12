import * as React from 'react'
import { AppIconContainer } from './app-icon.styled'
import { LetterCard } from '@core/letter-card/letter-card'

export const AppIcon = () => {
  return (
    <AppIconContainer>
      <LetterCard content="W" />
      <LetterCard content="R" />
      <LetterCard content="Z" />
      <LetterCard content="W" />
    </AppIconContainer>
  )
}
