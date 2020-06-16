/*
 * @Author: Lambda
 * @Begin: 2020-06-14 11:40:21
 * @Update: 2020-06-16 17:18:48
 * @Update log: 更新日志
 */
/**
 * @format
 */

import {AppRegistry} from 'react-native';
import 'react-native-gesture-handler';
import App from './js/App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
