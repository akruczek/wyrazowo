import * as React from 'react'
import { View } from 'react-native'
import { testID } from '@core/localize/testID'
import { TestIDs } from '@core/localize/testID.models'

interface Props {
  t: keyof typeof TestIDs;
  p?: (string | undefined)[];
  children?: any;
}

export const TestView = ({ t, p, children }: Props) => {
  return (
    <View testID={testID(t, p)}>
      {children}
    </View>
  )
}
