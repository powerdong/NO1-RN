/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:15:56
 * @Update: 2020-06-15 11:16:41
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const FavoritePage = props => {
  return (
    <View style={styles.container}>
      <Text>FavoritePage页面</Text>
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

export default FavoritePage;
