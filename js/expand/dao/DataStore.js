/*
 * @Author: Lambda
 * @Begin: 2020-06-17 11:24:34
 * @Update: 2020-06-18 11:08:05
 * @Update log: 更新日志
 */
import AsyncStorage from '@react-native-community/async-storage';
import Trending from 'GitHubTrending';
export const FLAG_STORAGE = {
  flag_popular: 'popular',
  flag_trending: 'trending',
};
export default class DataStore {
  /**
   * 优先从本地获取数据，如果数据过时或不存在则从服务器获取，数据返回后同时将数据同步到本地数据库中
   * @param {string} url 源数据接口
   */
  fetchData(url, flag) {
    return new Promise((resolve, reject) => {
      this.fetchLocalData(url)
        .then(wrapData => {
          if (wrapData && DataStore.checkTimestampValid(wrapData.timestamp)) {
            resolve(wrapData);
          } else {
            this.fetchNetData(url, flag)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(error => {
                reject(error);
              });
          }
        })
        .catch(error => {
          error &&
            this.fetchNetData(url, flag)
              .then(data => {
                resolve(this._wrapData(data));
              })
              .catch(err => {
                reject(err);
              });
        });
    });
  }

  /**
   * 将数据存储到本地
   * @param {string} url 源接口
   * @param {any} data 接口数据
   * @param {Function} callback 回调函数
   */
  saveData(url, data, callback) {
    if (!data || !url) {
      return;
    }
    AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), callback);
  }

  _wrapData(data) {
    return {data, timestamp: Date.now()};
  }

  /**
   * 获取本地数据
   * @param {string} url 获取的 url
   * @returns {Promise}
   */
  fetchLocalData(url) {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(url, (error, result) => {
        if (!error) {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(e);
            console.error(e);
          }
        } else {
          reject(error);
          console.error(error);
        }
      });
    });
  }

  /**
   * 从网络上获取数据
   * @param {string} url 数据源接口
   * @param {string} flag 最热页面和趋势页面标识
   * @returns {Promise}
   */
  fetchNetData(url, flag) {
    return new Promise((resolve, reject) => {
      if (flag !== FLAG_STORAGE.flag_trending) {
        fetch(url)
          .then(res => {
            if (res.ok) {
              return res.json();
            }
            throw new Error('Network response was not ok.');
          })
          .then(resData => {
            this.saveData(url, resData);
            resolve(resData);
          })
          .catch(error => {
            reject(error);
          });
      } else {
        new Trending()
          .fetchTrending(url)
          .then(items => {
            if (!items) {
              throw new Error('responseData is null');
            }
            this.saveData(url, items);
            resolve(items);
          })
          .catch(error => {
            reject(error);
          });
      }
    });
  }

  /**
   * 检查 timestamp 是否在有效期之内
   * @param {number} timestamp 项目更新时间
   * @returns {boolean} true 不需要更新，false 需要更新
   */
  static checkTimestampValid(timestamp) {
    const currentDate = new Date();
    const targetDate = new Date();
    targetDate.setTime(timestamp);
    if (currentDate.getMonth() !== targetDate.getMonth()) {
      return false;
    }
    if (currentDate.getDate() !== targetDate.getDate()) {
      return false;
    }
    if (currentDate.getHours() - targetDate.getHours() > 4) {
      return false;
    }
    return true;
  }
}
