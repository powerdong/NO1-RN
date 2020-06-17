/*
 * @Author: Lambda
 * @Begin: 2020-06-15 08:55:41
 * @Update: 2020-06-17 10:04:34
 * @Update log: 更新日志
 */
import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigationUtil from '../navigation/NavigationUtil';
import DynamicTabNavigator from '../navigation/DynamicTabNavigator';
import {connect} from 'react-redux';

const HomePage = props => {
  useEffect(() => {
    // 物理返回键的监听
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  });

  /** 处理 Android 中的物理返回键 */
  const onBackPress = () => {
    const {dispatch, nav} = props;
    if (nav.routes[1].index === 0) {
      // 如果 RootNavigator 中的 MainNavigator 的 index 为 0，则不处理返回事件
      return false;
    }
    dispatch(NavigationActions.back());
    return true;
  };

  NavigationUtil.navigation = props.navigation;
  return <DynamicTabNavigator />;
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(HomePage);
