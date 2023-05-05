import * as React from 'react'
import { SafeAreaFlexContainer } from '@core/styled'
import { CustomKeyboard } from '@core/custom-keyboard/custom-keyboard'
import { CharadePlayground } from './components'

export const Charade = () => {
  const COUNT = 5

  return (
    <SafeAreaFlexContainer>
      <CharadePlayground count={COUNT} />
      <CustomKeyboard />
    </SafeAreaFlexContainer>
  )
}
