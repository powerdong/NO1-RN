/*
 * @Author: Lambda
 * @Begin: 2020-06-20 10:10:57
 * @Update: 2020-06-20 14:11:40
 * @Update log: 更新日志
 */

import AsyncStorage from '@react-native-community/async-storage';

const FAVORITE_KEY_PREFIX = 'favorite_';
export default class FavoriteDao {
  constructor(flag) {
    this.favoriteKey = FAVORITE_KEY_PREFIX + flag;
  }
  /**
   * 收藏项目，保存收藏的项目
   * @param {string} key 项目 id
   * @param {string} value 收藏的项目
   * @param {Function} callback 回调函数
   */
  saveFavoriteItem(key, value, callback) {
    const _key = key.toString();
    AsyncStorage.setItem(_key, value, (error, result) => {
      if (!error) {
        // 更新 Favorite 的 key
        this.updateFavoriteKeys(key, true);
      }
    });
  }
  /**
   * 更新 Favorite key 集合
   * @param {string} key 数据的 key
   * @param {boolean} isAdd 是否添加 true 添加，false 删除
   */
  updateFavoriteKeys(key, isAdd) {
    const _key = key.toString();
    AsyncStorage.getItem(this.favoriteKey, (error, result) => {
      if (!error) {
        let favoriteKeys = [];
        if (result) {
          favoriteKeys = JSON.parse(result);
        }
        let index = favoriteKeys.indexOf(_key);
        if (isAdd) {
          // 如果是添加且 key 不在存在则添加到数组中
          index === -1 && favoriteKeys.push(_key);
        } else {
          // 如果是删除且 key 存在则将其从数值中移除
          index !== -1 && favoriteKeys.splice(index, 1);
        }
        // 将更新后的数据保存在数据库里面
        AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys));
      }
    });
  }
  /**
   * 获取收藏的 Repositories 对应的 key
   * @returns {Promise}
   */
  getFavoriteKeys() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.favoriteKey, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  }
  /**
   * 取消收藏，移除已收藏的项目
   * @param {string} key 项目 id
   */
  removeFavoriteItem(key) {
    const _key = key.toString();
    AsyncStorage.removeItem(_key, (error, result) => {
      if (!error) {
        this.updateFavoriteKeys(_key, false);
      }
    });
  }
  /**
   * 获取所有收藏的项目
   * @returns {Promise}
   */
  getAllItems() {
    return new Promise((resolve, reject) => {
      this.getFavoriteKeys()
        .then(keys => {
          let items = [];
          if (keys) {
            AsyncStorage.multiGet(keys, (_err, stores) => {
              try {
                stores.map((result, i, store) => {
                  // let key = store[i][0];
                  let value = store[i][1];
                  value && items.push(JSON.parse(value));
                });
                resolve(items);
              } catch (e) {
                reject(e);
              }
            });
          } else {
            resolve(items);
          }
        })
        .catch(e => {
          reject(e);
        });
    });
  }
}
