import * as React from 'react'
import { Provider } from 'react-redux'
import { store } from './src/store/store'
import { AppNavigation } from './App.navigation'
import { NavigationContainer } from '@react-navigation/native'

export const App = (): JSX.Element => (
  <Provider store={store}>
    <NavigationContainer>
      <AppNavigation />
    </NavigationContainer>
  </Provider>
)
