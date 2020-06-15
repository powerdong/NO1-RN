/*
 * @Author: Lambda
 * @Begin: 2020-06-15 09:26:45
 * @Update: 2020-06-15 10:46:01
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const DetailPage = () => {
  return (
    <View style={styles.container}>
      <Text>DetailPage页面</Text>
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

export default DetailPage;
