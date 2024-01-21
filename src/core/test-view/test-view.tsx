import * as React from 'react'
import { View } from 'react-native'
import { getTestID } from '@e2e/helpers'

interface Props {
  t: string;
  p?: (string | undefined)[];
  children?: any;
}

export const TestView = ({ t, p, children }: Props) => {
  return (
    <View testID={getTestID(t, p)}>
      {children}
    </View>
  )
}
