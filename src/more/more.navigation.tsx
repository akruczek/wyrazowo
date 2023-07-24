import * as React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { More } from './more'
import { DEFAULT_SCREEN_OPTIONS, SCREEN } from '../navigation/navigation.constants'
import { Mania } from '../mania/mania'
import { HelpNavigation } from '../help/help.navigation'
import { Author } from './components/author/author'
import { DeveloperNavigation } from '../developer/developer.navigation'
import { User } from '../user/user'

const Stack = createNativeStackNavigator()

export const MoreNavigation = () => (
  <Stack.Navigator screenOptions={DEFAULT_SCREEN_OPTIONS}>
    <Stack.Screen name={SCREEN.MORE_MAIN} component={More} />
    <Stack.Screen name={SCREEN.MORE_MANIA} component={Mania} />
    <Stack.Screen name={SCREEN.MORE_HELP} component={HelpNavigation} />
    <Stack.Screen name={SCREEN.MORE_AUTHOR} component={Author} />
    <Stack.Screen name={SCREEN.DEVELOPER} component={DeveloperNavigation} />
    <Stack.Screen name={SCREEN.MORE_USER} component={User} />
  </Stack.Navigator>
)
