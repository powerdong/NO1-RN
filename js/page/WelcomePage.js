/*
 * @Author: Lambda
 * @Begin: 2020-06-15 08:48:59
 * @Update: 2020-06-15 11:13:18
 * @Update log: 更新日志
 */
import React, {useEffect, useRef} from 'react';
import {StyleSheet, View, Text} from 'react-native';

import NavigationUtil from '../navigation/NavigationUtil';

const WelcomePage = props => {
  const timer = useRef(null);
  useEffect(() => {
    timer.current = setTimeout(() => {
      NavigationUtil.resetToHomePage({
        navigation: props.navigation,
      });
    }, 2000);
    return () => {
      timer.current && clearTimeout(timer.current);
    };
  });
  return (
    <View style={styles.container}>
      <Text>欢迎页面</Text>
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

export default WelcomePage;
