import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { SpacingView } from '@core/styled'

export const EmptyOptions = (
  <SpacingView spacings="XL 0 0 0">
    <ActivityIndicator size="large" />
  </SpacingView>
)
