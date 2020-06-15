/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:15:56
 * @Update: 2020-06-15 19:29:35
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

const FavoritePage = props => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <Text>FavoritePage页面</Text>
      <Button
        title="改变主题色"
        onPress={() => {
          navigation.setParams({
            theme: {
              tintColor: 'green',
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

export default FavoritePage;
