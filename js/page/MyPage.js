/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-15 11:17:23
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const MyPage = props => {
  return (
    <View style={styles.container}>
      <Text>MyPage页面</Text>
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
