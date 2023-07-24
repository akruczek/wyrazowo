import * as React from 'react'
import { useNavigation } from '@react-navigation/native'
import { useTheme as reactNativePaperUseTheme } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { ThemeProvider } from 'styled-components/native'
import { ActivityIndicator, ColorSchemeName, useColorScheme } from 'react-native'
import { useDispatch, useSelector } from 'react-redux'
import { theme as themeModel } from '@core/styled/theme'
import { useRehydrateStore } from '@core/hooks/use-rehydrate-store.hook'
import { STORAGE_KEY } from '@core/storage/storage.constants'
import { RESPONSIVE } from '@core/responsive/responsive'
import { authService } from '@core/auth/auth-service'
import { COLOR } from './src/core/colors/colors.constants'
import { SCREEN } from './src/navigation/navigation.constants'
import { MoreNavigation } from './src/more/more.navigation'
import { setDarkThemeEnabledAction } from './src/settings/store/settings.slice'
import { darkThemeEnabledSelector } from './src/settings/store/settings.selectors'
import { CharadeNavigation } from './src/charade/charade.navigation'
import { DictionaryNavigation } from './src/dictionary/dictionary.navigation'
import { setUserAction } from './src/user/store/user.slice'
import { DashboardNavigation } from './src/dashboard/dashboard.navigation'

const Tab = createMaterialBottomTabNavigator()

export const AppNavigation = () => {
  const dispatch = useDispatch()
  const reactNativePaperTheme = reactNativePaperUseTheme()
  reactNativePaperTheme.colors.secondaryContainer = "transparent"

  const { isPending } = useRehydrateStore(STORAGE_KEY.DARK_THEME_ENABLED, setDarkThemeEnabledAction)
  const darkTheme = useSelector(darkThemeEnabledSelector)

  const colorScheme: ColorSchemeName = useColorScheme()

  const getBackgroundColor = () => darkTheme === -1 && colorScheme === 'light' || !darkTheme
    ? COLOR.WHITE
    : COLOR.DARK_SLATE_GREY

  const getThemeToProvide = () => darkTheme === -1
    ? themeModel[colorScheme ?? 'light']
    : themeModel[darkTheme ? 'dark' : 'light']

  const navigation = useNavigation()
  const BOTTOM_NAVIGATION_COLOR = [ COLOR.FIRE_BRICK, COLOR.DODGER_BLUE, COLOR.DARK_SEA_GREEN, COLOR.GOLD ]
  const [ activeColor, setActiveColor ] = React.useState<COLOR>(COLOR.FIRE_BRICK)

  const size = RESPONSIVE.WIDTH(7)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', (state) => {
      setActiveColor(BOTTOM_NAVIGATION_COLOR[state?.data?.state?.index ?? 0])
    })

    const user = authService.getCurrentUser()
    dispatch(setUserAction(user))

    return unsubscribe
  }, [])

  return isPending ? (
    <ActivityIndicator size="large" />
  ) : (
    <ThemeProvider theme={getThemeToProvide()}>
      <Tab.Navigator
        inactiveColor={COLOR.SLATE_GREY}
        activeColor={activeColor}
        barStyle={{ backgroundColor: getBackgroundColor(), borderTopWidth: 1, borderColor: COLOR.DIM_GREY_LIGHTER }}
        labeled={false}
        sceneAnimationType="opacity"
        sceneAnimationEnabled
      >
        <Tab.Screen
          name={SCREEN.DASHBOARD}
          component={DashboardNavigation}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home-search" {...{ color, size }} />
          }}
        />

        <Tab.Screen
          name={SCREEN.DICTIONARY}
          component={DictionaryNavigation}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="book-alphabet" {...{ color, size }} />,
          }}
        />

        <Tab.Screen
          name={SCREEN.CHARADE}
          component={CharadeNavigation}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="grid" {...{ color, size }} />
          }}
        />

        <Tab.Screen
          name={SCREEN.MORE}
          component={MoreNavigation}
          options={{
            tabBarIcon: ({ color }) => <MaterialCommunityIcons name="dots-horizontal" {...{ color, size }} />
          }}
        />
      </Tab.Navigator>
    </ThemeProvider>
  )
}
