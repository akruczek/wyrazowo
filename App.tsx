import * as React from 'react'
import { Provider } from 'react-redux'
import { PaperProvider } from 'react-native-paper'
import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { authService } from '@core/auth/auth-service'
import { store } from './src/store/store'
import { AppNavigation } from './App.navigation'

export const App = (): React.JSX.Element => {
  React.useEffect(authService.init, [])

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PaperProvider>
          <NavigationContainer>
            <AppNavigation />
          </NavigationContainer>
        </PaperProvider>
      </Provider>
    </GestureHandlerRootView>
  )
}
