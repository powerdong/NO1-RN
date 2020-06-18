/*
 * @Author: Lambda
 * @Begin: 2020-06-18 15:47:35
 * @Update: 2020-06-18 16:08:58
 * @Update log: 更新日志
 */
import React from 'react';
import {TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default class ViewUtil {
  /**
   * 获取左边返回按钮
   */
  static getLeftBackButton(callback) {
    return (
      <TouchableOpacity
        style={{padding: 8, paddingLeft: 12}}
        onPress={callback}>
        <Ionicons name={'ios-arrow-back'} size={26} style={{color: 'white'}} />
      </TouchableOpacity>
    );
  }
  /**
   * 获取分享按钮
   */
  static getShareButton(callback) {
    return (
      <TouchableOpacity underlayColor={'transparent'} onPress={callback}>
        <Ionicons
          name={'md-share'}
          size={20}
          style={{opacity: 0.9, marginRight: 10, color: 'white'}}
        />
      </TouchableOpacity>
    );
  }
}
