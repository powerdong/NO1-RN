/*
 * @Author: Lambda
 * @Begin: 2020-06-20 14:47:00
 * @Update: 2020-06-20 14:50:03
 * @Update log: 更新日志
 */
import Types from '../../action/types';

const defaultState = {};

/**
 * state 树，横向扩展
 * 如何动态的设置 store，和动态获取 store(难点：storeKey 不固定)
 */
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    // 获取数据
    case Types.FAVORITE_LOAD_DATA:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
        },
      };
    // 下拉获取数据成功
    case Types.FAVORITE_LOAD_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
          projectModels: action.projectModels,
        },
      };
    // 下拉获取数据失败
    case Types.FAVORITE_LOAD_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };
    default:
      return state;
  }
}
