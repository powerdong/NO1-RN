/*
 * @Author: Lambda
 * @Begin: 2020-06-18 11:09:07
 * @Update: 2020-06-18 11:17:31
 * @Update log: 更新日志
 */
import Types from '../types';
import DataStore, {FLAG_STORAGE} from '../../expand/dao/DataStore';
import {handleData} from '../ActionUtil';
/**
 * 获取最热数据的异步 action
 * @param {string} storeName tab 名
 * @param {string} url 接口 url
 * @param {string} pageSize 每页展示多少条数据
 */
export function onRefreshTrending(storeName, url, pageSize) {
  return dispatch => {
    dispatch({type: Types.TRENDING_REFRESH, storeName});
    let dataStore = new DataStore();
    dataStore
      .fetchData(url, FLAG_STORAGE.flag_trending)
      .then(data => {
        // 异步 action 与数据流
        handleData(
          Types.TRENDING_REFRESH_SUCCESS,
          dispatch,
          storeName,
          data,
          pageSize,
        );
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
export function onLoadMoreTrending(
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
        console.log('已加载完全部数据: ');
        if (typeof callBack === 'function') {
          callBack('no more');
        }
        dispatch({
          type: Types.TRENDING_LOAD_MORE_FAIL,
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
        console.log('max: ', max);
        dispatch({
          type: Types.TRENDING_LOAD_MORE_SUCCESS,
          storeName,
          pageIndex,
          projectModes: dataArray.slice(0, max),
        });
      }
    }, 500);
  };
}
