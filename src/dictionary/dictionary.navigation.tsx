import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SCREEN } from '../navigation/navigation.constants'
import { Dictionary } from './dictionary'
import { Dictionarly } from '../dictionarly/dictionarly'
import { DictionarlyPlay } from 'dictionarly/components/dictionarly-play/dictionarly-play'

const Stack = createNativeStackNavigator()

export const DictionaryNavigation = () => (
  <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade', animationDuration: 150 }}>
    <Stack.Screen name={SCREEN.DICTIONARY_DICTIONARLY} component={Dictionarly} />
    <Stack.Screen name={SCREEN.DICTIONARY_PLAY} component={DictionarlyPlay} />
    <Stack.Screen name={SCREEN.DICTIONARY_DICTIONARY} component={Dictionary} />
  </Stack.Navigator>
)
