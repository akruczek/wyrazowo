import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { More } from './more'
import { SCREEN } from '../navigation/navigation.constants'
import { Mania } from '../mania/mania'
import { Playground } from '../playground/playground'
import { HelpNavigation } from '../help/help.navigation'

const Stack = createNativeStackNavigator()

export const MoreNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name={SCREEN.MORE_MAIN} component={More} />
      <Stack.Screen name={SCREEN.MORE_MANIA} component={Mania} />
      <Stack.Screen name={SCREEN.MORE_PLAYGROUND} component={Playground} />
      <Stack.Screen name={SCREEN.MORE_HELP} component={HelpNavigation} />
    </Stack.Navigator>
  )
}
