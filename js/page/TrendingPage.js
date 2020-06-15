/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:14:33
 * @Update: 2020-06-15 11:15:16
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const Trending = props => {
  return (
    <View style={styles.container}>
      <Text>Trending页面</Text>
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

export default Trending;
