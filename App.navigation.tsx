import { NavigationContainer } from '@react-navigation/native'
import { useTheme as reactNativePaperUseTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ThemeProvider, useTheme } from 'styled-components/native'
import { ThemeModel } from '@core/styled/models'
import { theme as themeModel } from '@core/styled/theme'
import { Dashboard } from './src/dashboard/dashboard'
import { COLOR } from './src/core/colors/colors.constants'
import { SCREEN } from './src/navigation/navigation.constants'
import { Dictionary } from './src/dictionary/dictionary'
import { genericShadow } from './src/core/shadow/shadow.constants'
import { Playground } from './src/playground/playground'
import { MoreNavigation } from './src/more/more.navigation'

const Tab = createMaterialBottomTabNavigator()

export const AppNavigation = () => {
  const reactNativePaperTheme = reactNativePaperUseTheme()
  const theme = useTheme() as ThemeModel
  reactNativePaperTheme.colors.secondaryContainer = "transparent"

  // const colorScheme: ColorSchemeName = useColorScheme()
  const colorScheme = 'dark'
  const backgroundColor = colorScheme === 'light' ? COLOR.WHITE : COLOR.DARK_SLATE_GREY

  return (
    <ThemeProvider theme={themeModel[colorScheme ?? 'light']}>
      <NavigationContainer>
        <Tab.Navigator
          inactiveColor={COLOR.SLATE_GREY}
          activeColor={COLOR.DODGER_BLUE}
          barStyle={{ backgroundColor, ...genericShadow }}
          labeled={false}
          sceneAnimationType="shifting"
          sceneAnimationEnabled
        >
          <Tab.Screen
            name={SCREEN.DASHBOARD}
            component={Dashboard}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="home" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name={SCREEN.DICTIONARY}
            component={Dictionary}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="book-alphabet" color={color} size={26} />
              ),
            }}
          />

          <Tab.Screen
            name={SCREEN.PLAYGROUND}
            component={Playground}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="checkerboard" color={color} size={26} />
              ),
            }}
          />

          {/* <Tab.Screen
            name={SCREEN.MANIA}
            component={Mania}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="web" color={color} size={26} />
              ),
            }}
          /> */}

          <Tab.Screen
            name={SCREEN.MORE}
            component={MoreNavigation}
            options={{
              tabBarIcon: ({ color }) => (
                <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  )
}
