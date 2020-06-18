/*
 * @Author: Lambda
 * @Begin: 2020-06-18 11:13:41
 * @Update: 2020-06-18 11:15:50
 * @Update log: 更新日志
 */

/**
 * 处理下拉刷新的数据
 * @param {string} actionType action 类型
 * @param {Function} dispatch actions
 * @param {string} storeName tag 名
 * @param {Array} data 数据
 * @param {number} pageSize 页面大小
 */
export const handleData = (actionType, dispatch, storeName, data, pageSize) => {
  let fixItems = [];
  if (data && data.data) {
    if (Array.isArray(data.data)) {
      fixItems = data.data;
    } else if (Array.isArray(data.data.items)) {
      fixItems = data.data.items;
    }
  }
  dispatch({
    type: actionType,
    projectModes:
      pageSize > fixItems.length ? fixItems : fixItems.slice(0, pageSize), // 第一次要加载的数据
    storeName,
    items: fixItems,
    pageIndex: 1,
  });
};
