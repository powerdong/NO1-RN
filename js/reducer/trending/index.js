/*
 * @Author: Lambda
 * @Begin: 2020-06-18 11:18:58
 * @Update: 2020-06-18 11:20:47
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
    // 下拉刷新成功
    case Types.TRENDING_REFRESH_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          items: action.items, // 原始数据
          projectModes: action.projectModes, // 此次要展示的数据
          isLoading: false,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };
    // 下拉刷新
    case Types.TRENDING_REFRESH:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: true,
          hideLoadingMore: true,
        },
      };
    // 下拉刷新失败
    case Types.TRENDING_REFRESH_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          isLoading: false,
        },
      };
    // 上拉加载更多成功
    case Types.TRENDING_LOAD_MORE_SUCCESS:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          projectModes: action.projectModes,
          hideLoadingMore: false,
          pageIndex: action.pageIndex,
        },
      };
    // 上拉加载更多失败
    case Types.TRENDING_LOAD_MORE_FAIL:
      return {
        ...state,
        [action.storeName]: {
          ...state[action.storeName],
          hideLoadingMore: true,
          pageIndex: action.pageIndex,
        },
      };
    default:
      return state;
  }
}
