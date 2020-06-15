/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-15 19:30:26
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

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
