/*
 * @Author: Lambda
 * @Begin: 2020-06-16 16:43:44
 * @Update: 2020-06-16 17:51:29
 * @Update log: 更新日志
 */
import {combineReducers} from 'redux';
import theme from './theme';
import {RootNavigator, rootCom} from '../navigation/AppNavigator';

const navState = RootNavigator.router.getStateForAction(
  RootNavigator.router.getActionForPathAndParams(rootCom),
);

const navReducer = (state = navState, action) => {
  const nextState = RootNavigator.router.getStateForAction(action, state);
  return nextState || state;
};

const index = combineReducers({
  nav: navReducer,
  theme,
});

export default index;
