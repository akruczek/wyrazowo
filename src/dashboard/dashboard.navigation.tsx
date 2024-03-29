import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { DEFAULT_SCREEN_OPTIONS, SCREEN } from '../navigation/navigation.constants'
import { Dashboard } from './dashboard'
import { Playground } from '../playground/playground'

const Stack = createNativeStackNavigator()

export const DashboardNavigation = () => (
  <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
    <Stack.Screen name={SCREEN.DASHBOARD_SEARCH} component={Dashboard} />
    <Stack.Screen name={SCREEN.DASHBOARD_PLAYGROUND} component={Playground} />
  </Stack.Navigator>
)
