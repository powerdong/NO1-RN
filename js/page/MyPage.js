/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-17 14:21:27
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil';

const MyPage = props => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Text>MyPage页面</Text>
      <Button
        title="改变主题色"
        onPress={() => {
          navigation.setParams({
            theme: {
              tintColor: 'blue',
              updateTime: new Date().getTime(),
            },
          });
        }}
      />
      <Text
        onPress={() => {
          NavigationUtil.goPage(
            {
              navigation: props.navigation,
            },
            'DetailPage',
          );
        }}>
        跳转详情页
      </Text>
      <Button
        title="跳转FetchDemoPage"
        onPress={() => {
          NavigationUtil.goPage(
            {
              navigation: props.navigation,
            },
            'FetchDemoPage',
          );
        }}
      />
      <Button
        title="跳转AsyncStorageDemoPage"
        onPress={() => {
          NavigationUtil.goPage(
            {
              navigation: props.navigation,
            },
            'AsyncStorageDemoPage',
          );
        }}
      />
      <Button
        title="跳转DataStoreDemoPage"
        onPress={() => {
          NavigationUtil.goPage(
            {
              navigation: props.navigation,
            },
            'DataStoreDemoPage',
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default MyPage;
