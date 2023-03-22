import * as React from 'react'
import app from '../../package.json'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { MoreContainer, MoreDisplayText } from './more.styled'

export const More = () => {
  const { top: topInset } = useSafeAreaInsets()

  return (
    <MoreContainer topInset={topInset}>
      <MoreDisplayText children={`App version: ${app.version}`} />
    </MoreContainer>
  )
}
