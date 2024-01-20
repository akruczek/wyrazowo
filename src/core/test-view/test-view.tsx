import * as React from 'react'
import ui from '@core/localize/localization/ui.json'
import { View } from 'react-native'

interface Props {
  t: string;
  children?: any;
}

export const TestView = ({ t, children }: Props) => {
  return (
    <View testID={(ui as any)?.[t] ?? 'missing_test_id'}>
      {children}
    </View>
  )
}
