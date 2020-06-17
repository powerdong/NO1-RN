/*
 * @Author: Lambda
 * @Begin: 2020-06-15 09:04:07
 * @Update: 2020-06-17 09:54:07
 * @Update log: 更新日志
 */
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {connect} from 'react-redux';
import {
  createReduxContainer,
  createReactNavigationReduxMiddleware,
} from 'react-navigation-redux-helpers';

import WelcomePage from '../page/WelcomePage';
import HomePage from '../page/HomePage';
import DetailPage from '../page/DetailPage';

export const rootCom = 'Init'; // 设置根路由

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
      // headerShown: false,
    },
  },
});

export const RootNavigator = createAppContainer(
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

export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root',
);

const AppNavigation = createReduxContainer(RootNavigator, 'root');
const mapStateToProps = state => ({
  state: state.nav,
});

export default connect(mapStateToProps)(AppNavigation);
