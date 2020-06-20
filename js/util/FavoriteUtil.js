/*
 * @Author: Lambda
 * @Begin: 2020-06-20 11:22:40
 * @Update: 2020-06-20 11:26:33
 * @Update log: 更新日志
 */
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteDao from '../expand/dao/FavoriteDao';

export default class FavoriteUtil {
  /**
   * favoriteIcon 单机回调函数
   * @param {FavoriteDao} favoriteDao 封装的类
   * @param {object} item 项目
   * @param {boolean} isFavorite 是否收藏
   * @param {string} flag 哪个模块
   */
  static onFavorite(favoriteDao, item, isFavorite, flag) {
    const key = flag === FLAG_STORAGE.flag_trending ? item.fullName : item.id;
    if (isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
    } else {
      favoriteDao.removeFavoriteItem(key);
    }
  }
}
