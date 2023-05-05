import * as React from 'react'
import { SafeAreaFlexContainer } from '@core/styled'
import { CharadePlayground } from './components'

export const Charade = () => {
  const COUNT = 5

  return (
    <SafeAreaFlexContainer>
      <CharadePlayground count={COUNT} />
    </SafeAreaFlexContainer>
  )
}
