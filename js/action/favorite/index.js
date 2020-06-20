/*
 * @Author: Lambda
 * @Begin: 2020-06-20 14:39:10
 * @Update: 2020-06-20 16:12:20
 * @Update log: 更新日志
 */
import Types from '../types';
import FavoriteDao from '../../expand/dao/FavoriteDao';
import ProjectModel from '../../model/ProjectModel';
/**
 * 加载收藏的项目
 * @param {string} flag 标识
 * @param {boolean} isShowLoading 是否显示 loading
 */
export function onLoadFavoriteData(flag, isShowLoading) {
  return dispatch => {
    if (isShowLoading) {
      dispatch({type: Types.FAVORITE_LOAD_DATA, storeName: flag});
    }
    new FavoriteDao(flag)
      .getAllItems()
      .then(items => {
        let resultData = [];
        for (let i = 0; i < items.length; i++) {
          resultData.push(new ProjectModel(items[i], true));
        }
        dispatch({
          type: Types.FAVORITE_LOAD_SUCCESS,
          projectModels: resultData,
          storeName: flag,
        });
      })
      .catch(e => {
        console.log(e);
        dispatch({type: Types.FAVORITE_LOAD_FAIL, error: e, storeName: flag});
      });
  };
}
