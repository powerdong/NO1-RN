/*
 * @Author: Lambda
 * @Begin: 2020-06-18 10:24:35
 * @Update: 2020-06-22 10:53:55
 * @Update log: 更新日志
 */
import Types from '../../action/types';
import {FLAG_LANGUAGE} from '../../expand/dao/LanguageDao';

const defaultState = {
  languages: [],
  keys: [],
};
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.LANGUAGE_LOAD_SUCCESS: //获取数据成功
      if (FLAG_LANGUAGE.flag_key === action.flag) {
        return {
          ...state,
          keys: action.languages,
        };
      } else {
        return {
          ...state,
          languages: action.languages,
        };
      }
    default:
      return state;
  }
}
