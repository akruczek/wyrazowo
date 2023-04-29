import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { More } from './more'
import { SCREEN } from '../navigation/navigation.constants'
import { Mania } from '../mania/mania'

const Stack = createNativeStackNavigator()

export const MoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN.MORE_MAIN} component={More} />
      <Stack.Screen name={SCREEN.MORE_MANIA} component={Mania} />
    </Stack.Navigator>
  )
}
