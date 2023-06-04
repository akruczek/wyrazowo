import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN } from '../navigation/navigation.constants'
import { Developer } from '../developer/developer'
import { DeveloperSearchHistory } from './components/developer-search-history/developer-search-history'

const Stack = createNativeStackNavigator()

export const DeveloperNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 150 }}>
      <Stack.Screen name={SCREEN.DEVELOPER_MAIN} component={Developer} />
      <Stack.Screen name={SCREEN.DEVELOPER_SEARCH_HISTORY} component={DeveloperSearchHistory} />
    </Stack.Navigator>
  )
}
