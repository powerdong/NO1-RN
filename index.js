/*
 * @Author: Lambda
 * @Begin: 2020-06-14 11:40:21
 * @Update: 2020-06-15 10:25:54
 * @Update log: 更新日志
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import AppNavigator from './js/navigation/AppNavigator';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => AppNavigator);
