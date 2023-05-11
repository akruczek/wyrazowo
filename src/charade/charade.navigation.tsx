import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN } from '../navigation/navigation.constants'
import { Charade } from './charade'
import { CharadePlay } from './components/charade-play/charade-play'

const Stack = createNativeStackNavigator()

export const CharadeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 150 }}>
      <Stack.Screen name={SCREEN.CHARADE_MAIN} component={Charade} />
      <Stack.Screen name={SCREEN.CHARADE_PLAY} component={CharadePlay} />
    </Stack.Navigator>
  )
}
