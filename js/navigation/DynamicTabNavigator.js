/*
 * @Author: Lambda
 * @Begin: 2020-06-15 16:45:04
 * @Update: 2020-06-16 20:21:21
 * @Update log: 更新日志
 */
import React, {useState} from 'react';
import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator, BottomTabBar} from 'react-navigation-tabs';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import {connect} from 'react-redux';

import PopularPage from '../page/PopularPage';
import TrendingPage from '../page/TrendingPage';
import FavoritePage from '../page/FavoritePage';
import MyPage from '../page/MyPage';

// 这里配置页面路由
const TABS = {
  PopularPage: {
    screen: PopularPage,
    navigationOptions: {
      tabBarLabel: '最热',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name="whatshot" size={26} style={{color: tintColor}} />
      ),
    },
  },
  TrendingPage: {
    screen: TrendingPage,
    navigationOptions: {
      tabBarLabel: '趋势',
      tabBarIcon: ({tintColor, focused}) => (
        <Ionicons name="md-trending-up" size={26} style={{color: tintColor}} />
      ),
    },
  },
  FavoritePage: {
    screen: FavoritePage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => (
        <MaterialIcons name="favorite" size={26} style={{color: tintColor}} />
      ),
    },
  },
  MyPage: {
    screen: MyPage,
    navigationOptions: {
      tabBarLabel: '收藏',
      tabBarIcon: ({tintColor, focused}) => (
        <Entypo name="user" size={26} style={{color: tintColor}} />
      ),
    },
  },
};

/**
 * 根据传入的页面名筛选出要展示的 Tab
 * @param {Array} navArr 需要显示的 nav 数组
 */
const getNavigator = navArr => {
  let result = {};
  for (const nav in TABS) {
    const pageName = TABS[nav];
    if (navArr.includes(nav)) {
      result[nav] = pageName;
    }
  }
  return result;
};

const TabBarComponent = props => {
  // const [themeWrap, setThemeWrap] = useState({
  //   tintColor: props.activeTintColor,
  //   updateTime: new Date().getTime(),
  // });
  // // 取出 navigator.setParams 传进来的数据动态更新
  // const {routes, index} = props.navigation.state;
  // if (routes[index].params) {
  //   const {theme} = routes[index].params;
  //   // 以最新的更新时间为主，防止被其他 tab 之前的修改覆盖掉
  //   if (theme && theme.updateTime > themeWrap.updateTime) {
  //     setThemeWrap(theme);
  //   }
  // }
  return <BottomTabBar {...props} activeTintColor={props.theme} />;
};

const DynamicTabNavigator = createBottomTabNavigator(
  getNavigator(['PopularPage', 'TrendingPage', 'FavoritePage', 'MyPage']),
  {
    tabBarComponent: props => (
      <TabBarComponent {...props} theme={props.theme} />
    ),
  },
);

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

export default connect(mapStateToProps)(
  createAppContainer(DynamicTabNavigator),
);
