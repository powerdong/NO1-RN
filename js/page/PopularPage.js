/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:13:08
 * @Update: 2020-06-15 16:36:21
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import NavigationUtil from '../navigation/NavigationUtil';
const PopularTab = props => {
  return (
    <View>
      <Text>{props.tabLabel}</Text>
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
    </View>
  );
};

const PopularPage = createMaterialTopTabNavigator({
  PopularTab1: {
    screen: PopularTab,
    navigationOptions: {
      title: 'Tab1',
    },
  },
  PopularTab2: {
    screen: PopularTab,
    navigationOptions: {
      title: 'Tab2',
    },
  },
});

export default PopularPage;
