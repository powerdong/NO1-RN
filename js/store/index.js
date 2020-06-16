/*
 * @Author: Lambda
 * @Begin: 2020-06-16 17:00:03
 * @Update: 2020-06-16 20:08:45
 * @Update log: 更新日志
 */
import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducer';
import {middleware} from '../navigation/AppNavigator';

const logger = store => next => action => {
  if (typeof action === 'function') {
    console.log('dispatching a function');
  } else {
    console.log(`dispatch ${action}`);
  }
  const result = next(action);
  console.log(`nextState${store.getState()}`);
};

const middlewares = [middleware, logger];

const store = createStore(reducers, applyMiddleware(...middlewares));

export default store;
