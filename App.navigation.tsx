import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { Dashboard } from './src/dashboard/dashboard'
import { Mania } from './src/mania/mania'
import { COLOR } from './src/core/colors/colors.constants'

const Tab = createMaterialBottomTabNavigator();

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        inactiveColor={COLOR.WHITE_SMOKE}
        activeColor={COLOR.BLACK}
        barStyle={{ backgroundColor: COLOR.SLATE_GREY }}
        labeled={false}
        shifting={true}
        // translucent navigation bar on Android
        // barStyle={{ paddingBottom: 48 }}
      >
        <Tab.Screen
          name="Dashboard"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" color={color} size={26} />
            ),
          }}
          component={Dashboard}
        />

        <Tab.Screen
          name="Mania"
          options={{
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="web" color={color} size={26} />
            ),
          }}
          component={Mania}
        />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
