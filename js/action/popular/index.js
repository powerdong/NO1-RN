/*
 * @Author: Lambda
 * @Begin: 2020-06-17 14:00:30
 * @Update: 2020-06-17 18:43:09
 * @Update log: 更新日志
 */
import Types from '../types';
import DataStore from '../../expand/dao/DataStore';
/**
 * 获取最热数据的异步 action
 * @param {string} storeName tab 名
 * @param {string} url 接口 url
 * @param {string} pageSize 每页展示多少条数据
 */
export function onRefreshPopular(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: Types.POPULAR_REFRESH, storeName});
    let dataStore = new DataStore();
    dataStore
      .fetchData(url)
      .then(data => {
        // 异步 action 与数据流
        handleData(dispatch, storeName, data, pageSize);
      })
      .catch(err => {
        err && console.log(err);
        dispatch({type: Types.POPULAR_REFRESH_FAIL, storeName, err});
      });
  };
}

/**
 *
 * @param {string} storeName tab 名
 * @param {number} pageIndex 第几页
 * @param {number} pageSize 每页展示条数
 * @param {Array} dataArray 原始数据
 * @param {Function} callBack 回调函数
 */
export function onLoadMorePopular(
  storeName,
  pageIndex,
  pageSize,
  dataArray = [],
  callBack,
) {
  return dispatch => {
    setTimeout(() => {
      if ((pageIndex - 1) * pageSize >= dataArray.length) {
        // 已加载完全部数据
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.POPULAR_LOAD_MORE_FAIL,
          error: 'no more',
          storeName,
          pageIndex: --pageIndex,
          projectModes: dataArray,
        });
      } else {
        // 本次和载入的最大数量
        let max =
          pageSize * pageIndex > dataArray.length
            ? dataArray.length
            : pageSize * pageIndex;
        dispatch({
          type: Types.POPULAR_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
}

/**
 * 处理下拉刷新的数据
 * @param {Function} dispatch actions
 * @param {string} storeName tag 名
 * @param {Array} data 数据
 * @param {number} pageSize 页面大小
 */
const handleData = (dispatch, storeName, data, pageSize) => {
  let fixItems = [];
  if (data && data.data && data.data.items) {
    fixItems = data.data.items;
  }
  dispatch({
    type: Types.POPULAR_REFRESH_SUCCESS,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据
    storeName,
    pageIndex: 1,
  });
};
