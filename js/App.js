/*
 * @Author: Lambda
 * @Begin: 2020-06-14 11:40:21
 * @Update: 2020-06-16 20:42:53
 * @Update log: 更新日志
 */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider} from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import store from './store';

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;
