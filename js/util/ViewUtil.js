/*
 * @Author: Lambda
 * @Begin: 2020-06-18 15:47:35
 * @Update: 2020-06-22 12:17:16
 * @Update log: 更新日志
 */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
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

  /**
   *
   * @param {Function} callback 单击 item 回调函数
   * @param {string} text 显示的文本
   * @param {string} color 图标着色
   * @param {Element} Icons 组件
   * @param {string} icon 左侧图标
   * @param {string} expendableIco 右侧图标
   */
  static getSettingItem(callback, text, color, Icons, icon, expendableIco) {
    return (
      <TouchableOpacity
        onPress={callback}
        style={styles.setting_item_container}>
        <View style={{alignItems: 'center', flexDirection: 'row'}}>
          {Icons && icon ? (
            <Icons
              name={icon}
              size={16}
              style={{
                color,
                marginRight: 10,
              }}
            />
          ) : (
            <View
              style={{opacity: 1, width: 16, height: 16, marginRight: 10}}
            />
          )}
          <Text>{text}</Text>
        </View>
        <Ionicons
          name={expendableIco ? expendableIco : 'ios-arrow-forward'}
          size={16}
          style={{
            marginRight: 10,
            alignSelf: 'center',
            color: color || 'black',
          }}
        />
      </TouchableOpacity>
    );
  }

  /**
   * 获取设置页的 Item
   * @param {Function} callback 单击回调
   * @param {string} menu 菜单项
   * @param {string} color 图标颜色
   * @param {string} expandableIco 右侧图标
   */
  static getMenuItem(callback, menu, color, expandableIco) {
    return ViewUtil.getSettingItem(
      callback,
      menu.name,
      color,
      menu.Icons,
      menu.icon,
      expandableIco,
    );
  }
  static getRightButton(title, callBack) {
    return (
      <TouchableOpacity style={{alignItems: 'center'}} onPress={callBack}>
        <Text style={{fontSize: 20, color: '#FFFFFF', marginRight: 10}}>
          {title}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  setting_item_container: {
    backgroundColor: 'white',
    padding: 10,
    height: 60,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
