import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN } from '../navigation/navigation.constants'
import { Help } from './help'
import { Guideline } from './components/guideline/guideline'

const Stack = createNativeStackNavigator()

export const HelpNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 150 }}>
      <Stack.Screen name={SCREEN.MORE_HELP_MAIN} component={Help} />
      <Stack.Screen name={SCREEN.MORE_HELP_GUIDELINE} component={Guideline} />
    </Stack.Navigator>
  )
}
