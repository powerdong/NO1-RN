/*
 * @Author: Lambda
 * @Begin: 2020-06-18 10:17:29
 * @Update: 2020-06-22 16:44:06
 * @Update log: 更新日志
 */
import {AsyncStorage} from '@react-native-community/async-storage';
import langs from '../../res/data/langs';
import keys from '../../res/data/keys';

export const FLAG_LANGUAGE = {
  flag_language: 'language_dao_language',
  flag_key: 'language_dao_key',
};
export default class LanguageDao {
  constructor(flag) {
    this.flag = flag;
  }

  /**
   * 获取语言或标签
   * @returns {Promise<any> | Promise}
   */
  fetch() {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(this.flag, (error, result) => {
        if (error) {
          reject(error);
          return;
        }
        if (!result) {
          let data = this.flag === FLAG_LANGUAGE.flag_language ? langs : keys;
          this.save(data);
          resolve(data);
        } else {
          try {
            resolve(JSON.parse(result));
          } catch (e) {
            reject(error);
          }
        }
      });
    });
  }

  /**
   * 保存语言或标签
   * @param objectData
   */
  save(objectData) {
    let stringData = JSON.stringify(objectData);
    AsyncStorage.setItem(this.flag, stringData, (error, result) => {});
  }
}
