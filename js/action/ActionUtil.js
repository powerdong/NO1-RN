/*
 * @Author: Lambda
 * @Begin: 2020-06-18 11:13:41
 * @Update: 2020-06-20 11:14:08
 * @Update log: 更新日志
 */

import FavoriteDao from '../expand/dao/FavoriteDao';
import ProjectModel from '../model/ProjectModel';
import Utils from '../util/Utils';

/**
 * 处理下拉刷新的数据
 * @param {string} actionType action 类型
 * @param {Function} dispatch actions
 * @param {string} storeName tag 名
 * @param {Array} data 数据
 * @param {number} pageSize 页面大小
 */
export const handleData = (
  actionType,
  dispatch,
  storeName,
  data,
  pageSize,
  favoriteDao,
) => {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  let showItems =
    pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize); // 第一次要加载的数据
  _projectModels(showItems, favoriteDao, projectModels => {
    dispatch({
      type: actionType,
      projectModes: projectModels,
      storeName,
      items: fixItems,
      pageIndex: 1,
    });
  });
};

/**
 * 将要显示的数据做进一步的处理
 * @param {Array} showItems 要显示的全部数据
 * @param {FavoriteDao} favoriteDao 数据库封装的类
 * @param {Function} callback 回调函数
 */
export async function _projectModels(showItems, favoriteDao, callback) {
  let keys = [];
  try {
    keys = await favoriteDao.getFavoriteKeys();
  } catch (error) {
    console.log('error: ', error);
  }
  let projectModels = [];
  for (let i = 0; i < showItems.length; i++) {
    projectModels.push(
      new ProjectModel(showItems[i], Utils.checkFavorite(showItems[i], keys)),
    );
  }
  if (typeof callback === 'function') {
    callback(projectModels);
  }
}
