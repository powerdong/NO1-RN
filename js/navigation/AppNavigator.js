/*
 * @Author: Lambda
 * @Begin: 2020-06-15 09:04:07
 * @Update: 2020-06-15 16:41:01
 * @Update log: 更新日志
 */
import React from 'react';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  createBottomTabNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation-tabs';
// createBottomTabNavigator(RouteConfigs, TabNavigatorConfig);
// createMaterialTopTabNavigator(RouteConfigs, TabNavigatorConfig);

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

const InitNavigator = createStackNavigator({
  WelcomePage: {
    screen: WelcomePage,
    navigationOptions: {
      headerShown: false, // 通过将 headerShown 设为 false，来禁用 StackNavigator 的 Navigation Bar
    },
  },
});

const MainNavigator = createStackNavigator({
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      headerShown: false, // 通过将 header 设为 null，来禁用 StackNavigator 的 Navigation Bar
    },
  },
  DetailPage: {
    screen: DetailPage,
    navigationOptions: {
      headerShown: false,
    },
  },
});

// const TopTab = createMaterialTopTabNavigator();
// const BottomTab = createBottomTabNavigator();

// function MyTopTabs() {
//   return (
//     <TopTab.Navigator>
//       <TopTab.Screen name="Home" component={HomeScreen} />
//       <TopTab.Screen name="Settings" component={SettingsScreen} />
//     </TopTab.Navigator>
//   );
// }

// function MyBottomTabs() {
//   return (
//     <BottomTab.Navigator>
//       <BottomTab.Screen name="Home" component={HomeScreen} />
//       <BottomTab.Screen name="Settings" component={SettingsScreen} />
//     </BottomTab.Navigator>
//   );
// }

export default createAppContainer(
  createSwitchNavigator(
    {
      Init: InitNavigator,
      Main: MainNavigator,
    },
    {
      defaultNavigationOptions: {
        headerShown: false,
      },
    },
  ),
);
