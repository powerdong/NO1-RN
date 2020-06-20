/*
 * @Author: Lambda
 * @Begin: 2020-06-20 11:08:19
 * @Update: 2020-06-20 11:11:19
 * @Update log: 更新日志
 */
export default class Utils {
  static checkFavorite(item, keys = []) {
    if (!keys) {
      return false;
    }
    for (let i = 0; i < keys.length; i++) {
      let id = item.id ? item.id : item.fullName;
      if (id.toString() === keys[i]) {
        return true;
      }
    }
    return false;
  }
}
