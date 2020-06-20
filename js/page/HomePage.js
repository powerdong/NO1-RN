/*
 * @Author: Lambda
 * @Begin: 2020-06-15 08:55:41
 * @Update: 2020-06-20 18:59:33
 * @Update log: 更新日志
 */
import React from 'react';
// import {BackHandler} from 'react-native';
import {NavigationActions} from 'react-navigation';
import NavigationUtil from '../navigation/NavigationUtil';
import DynamicTabNavigator from '../navigation/DynamicTabNavigator';
import {connect} from 'react-redux';
import EventBus from 'react-native-event-bus';

import useBackPress from '../common/useBackPress';
import EventTypes from '../util/EventTypes';
const HomePage = props => {
  useBackPress(onBackPress);
  // useEffect(() => {
  // 物理返回键的监听
  // BackHandler.addEventListener('hardwareBackPress', onBackPress);
  // return () => {
  // BackHandler.removeEventListener('hardwareBackPress', onBackPress);
  // };
  // });

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
  return (
    <DynamicTabNavigator
      onNavigationStateChange={(prevState, newState, action) => {
        EventBus.getInstance().fireEvent(EventTypes.bottom_tab_select, {
          //发送底部tab切换的事件
          from: prevState.index,
          to: newState.index,
        });
      }}
    />
  );
};

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(HomePage);
