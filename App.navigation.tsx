import * as React from 'react'
import * as R from 'ramda'
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
import { useRTL } from '@core/localize/hooks/use-rtl.hook'
import { TestView } from '@core/test-view/test-view'
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
  const RTL = useRTL()
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

  const BOTTOM_NAVIGATION_COLOR_MAP: {[key: string]: COLOR} = {
    [SCREEN.DASHBOARD]: COLOR.FIRE_BRICK,
    [SCREEN.CHARADE]: COLOR.DARK_SEA_GREEN,
    [SCREEN.DICTIONARY]: COLOR.DODGER_BLUE,
    [SCREEN.MORE]: COLOR.GOLD
  }

  const [ activeColor, setActiveColor ] = React.useState<COLOR>(COLOR.FIRE_BRICK)

  const size = RESPONSIVE.WIDTH(7)

  React.useEffect(() => {
    const unsubscribe = navigation.addListener('state', (state) => {
      const routeName: COLOR = R.last(state?.data?.state?.history as any[] ?? [])?.key?.split?.('-')?.[0] ?? SCREEN.DASHBOARD
      setActiveColor(BOTTOM_NAVIGATION_COLOR_MAP[routeName])
    })

    const user = authService.getCurrentUser()
    dispatch(setUserAction(user))

    return unsubscribe
  }, [])

  const MoreScreenConfig = { name: SCREEN.MORE, component: MoreNavigation, icon: "dots-horizontal" }
  const CharadeScreenConfig = { name: SCREEN.CHARADE, component: CharadeNavigation, icon: "grid" }
  const DictionaryScreenConfig = { name: SCREEN.DICTIONARY, component: DictionaryNavigation, icon: "book-alphabet" }
  const DashboardScreenConfig = { name: SCREEN.DASHBOARD, component: DashboardNavigation, icon: "home-search" }

  const screens = RTL
    ? [ MoreScreenConfig, CharadeScreenConfig, DictionaryScreenConfig, DashboardScreenConfig ]
    : [ DashboardScreenConfig, DictionaryScreenConfig, CharadeScreenConfig, MoreScreenConfig]

  return isPending ? (
    <ActivityIndicator size="large" />
  ) : (
    <ThemeProvider theme={getThemeToProvide()}>
      <Tab.Navigator
        inactiveColor={COLOR.SLATE_GREY}
        activeColor={activeColor}
        barStyle={{ backgroundColor: getBackgroundColor(), borderTopWidth: 1, borderColor: COLOR.DIM_GREY_LIGHTER }}
        labeled={false}
        testID="nav_bar"
        sceneAnimationType="opacity"
        sceneAnimationEnabled
      >
        {screens.map(({ name, component, icon }) => (
          <Tab.Screen
            key={name}
            name={name}
            component={component}
            options={{
              tabBarIcon: ({ color }) => (
                <TestView t="nav_bar" p={[ name.toLocaleLowerCase() ]}>
                  <MaterialCommunityIcons name={icon} {...{ color, size }} />
                </TestView>
              )
            }}
          />
        ))}
      </Tab.Navigator>
    </ThemeProvider>
  )
}
