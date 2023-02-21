import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SafeAreaView, ScrollView, StatusBar, useColorScheme, View } from 'react-native'
import { Colors, Header, LearnMoreLinks } from 'react-native/Libraries/NewAppScreen'
import { Dashboard } from './src/dashboard/dashboard'

const Stack = createNativeStackNavigator();

export const App = (): JSX.Element => (
  <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} />
    </Stack.Navigator>
  </NavigationContainer>
)
