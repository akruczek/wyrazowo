import * as React from 'react'
import { ActivityIndicator } from 'react-native'
import { MarginView } from '@core/styled'

export const EmptyOptions = (
  <MarginView margins={[ 30, 0, 0, 0 ]}>
    <ActivityIndicator size="large" />
  </MarginView>
)
