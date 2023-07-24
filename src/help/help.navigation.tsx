import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DEFAULT_SCREEN_OPTIONS, SCREEN } from '../navigation/navigation.constants'
import { Help } from './help'
import { Guideline } from './components/guideline/guideline'

const Stack = createNativeStackNavigator()

export const HelpNavigation = () => (
  <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
    <Stack.Screen name={SCREEN.MORE_HELP_MAIN} component={Help} />
    <Stack.Screen name={SCREEN.MORE_HELP_GUIDELINE} component={Guideline} />
  </Stack.Navigator>
)
