/*
 * @Author: Lambda
 * @Begin: 2020-06-18 10:27:26
 * @Update: 2020-06-21 09:03:41
 * @Update log: 全局样式
 */
import {Dimensions} from 'react-native';

const BACKGROUND_COLOR = '#f3f3f4';
const {height} = Dimensions.get('window');
export default {
  line: {
    height: 0.5,
    opacity: 0.5,
    backgroundColor: 'darkgray',
  },
  root_container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  nav_bar_height_ios: 44,
  nav_bar_height_android: 50,
  backgroundColor: BACKGROUND_COLOR,
  window_height: height,
};
