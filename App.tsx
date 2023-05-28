import * as React from 'react'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import { authService } from '@core/auth/auth-service'
import { store } from './src/store/store'
import { AppNavigation } from './App.navigation'

export const App = (): JSX.Element => {
  React.useEffect(authService.init, [])

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppNavigation />
      </NavigationContainer>
    </Provider>
  )
}
