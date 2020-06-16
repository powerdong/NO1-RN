/*
 * @Author: Lambda
 * @Begin: 2020-06-15 08:55:41
 * @Update: 2020-06-16 20:35:11
 * @Update log: 更新日志
 */
import React from 'react';

import NavigationUtil from '../navigation/NavigationUtil';
import DynamicTabNavigator from '../navigation/DynamicTabNavigator';

const HomePage = props => {
  console.log('props: ', props);
  return <DynamicTabNavigator />;
};

export default HomePage;
