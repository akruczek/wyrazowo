import { NavigationContainer } from '@react-navigation/native'
import { useTheme } from 'react-native-paper';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dashboard } from './src/dashboard/dashboard'
import { Mania } from './src/mania/mania'
import { COLOR } from './src/core/colors/colors.constants'
import { SCREEN } from './src/navigation/navigation.constants'
import { More } from './src/more/more'
import { Dictionary } from './src/dictionary/dictionary'
import { genericShadow } from './src/core/shadow/shadow.constants'
import { Playground } from './src/playground/playground'

const Tab = createMaterialBottomTabNavigator();

export const AppNavigation = () => {
  const theme = useTheme();
  theme.colors.secondaryContainer = "transparent"

  return (
    <NavigationContainer>
      <Tab.Navigator
        inactiveColor={COLOR.SLATE_GREY}
        activeColor={COLOR.DODGER_BLUE}
        barStyle={{ backgroundColor: COLOR.WHITE, ...genericShadow }}
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

        <Tab.Screen
          name={SCREEN.MANIA}
          component={Mania}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="web" color={color} size={26} />
            ),
          }}
        />

        <Tab.Screen
          name={SCREEN.MORE}
          component={More}
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="dots-horizontal" color={color} size={26} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
