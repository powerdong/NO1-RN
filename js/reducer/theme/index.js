/*
 * @Author: Lambda
 * @Begin: 2020-06-16 17:10:03
 * @Update: 2020-06-16 19:53:24
 * @Update log: 更新日志
 */
import Types from '../../action/types';

const defaultState = {
  theme: 'light',
};

export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    default:
      return state;
  }
}
