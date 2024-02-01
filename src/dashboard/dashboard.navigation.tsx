import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DEFAULT_SCREEN_OPTIONS, SCREEN } from '../navigation/navigation.constants'
import { Dashboard } from './dashboard'
import { WordExtension } from '../word-extension/word-extension'

const Stack = createNativeStackNavigator()

export const DashboardNavigation = () => (
  <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
    <Stack.Screen name={SCREEN.DASHBOARD_SEARCH} component={Dashboard} />
    <Stack.Screen name={SCREEN.DASHBOARD_WORD_EXTENSION} component={WordExtension} />
  </Stack.Navigator>
)
