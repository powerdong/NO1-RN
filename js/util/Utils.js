/*
 * @Author: Lambda
 * @Begin: 2020-06-20 11:08:19
 * @Update: 2020-06-22 20:08:47
 * @Update log: 更新日志
 */
export default class Utils {
  /**
   * 检查该Item是否被收藏
   * **/
  static checkFavorite(item, keys = []) {
    if (!keys) {
      return false;
    }
    for (let i = 0, len = keys.length; i < len; i++) {
      let id = item.id ? item.id : item.fullName;
      if (id.toString() === keys[i]) {
        return true;
      }
    }
    return false;
  }
  /**
   * 检查key是否存在于keys中
   * @param keys
   * @param key
   */
  static checkKeyIsExist(keys, key) {
    for (let i = 0, l = keys.length; i < l; i++) {
      if (key.toLowerCase() === keys[i].name.toLowerCase()) {
        return true;
      }
    }
    return false;
  }
}
