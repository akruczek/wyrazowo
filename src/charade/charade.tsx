import * as React from 'react'
import { SafeAreaFlexContainer } from '@core/styled'
import { CharadePlayground } from './components'

export const Charade = () => {
  return (
    <SafeAreaFlexContainer>
      <CharadePlayground count={5} />
    </SafeAreaFlexContainer>
  )
}
