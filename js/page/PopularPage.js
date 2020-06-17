/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:13:08
 * @Update: 2020-06-17 09:24:38
 * @Update log: 更新日志
 */
import React from 'react';
import {View, Text} from 'react-native';
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

const tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];

const getTabs = () => {
  const tabs = {};
  tabNames.forEach((item, index) => {
    tabs[`tab${index}`] = {
      // 通过这种方式给页面进行传值
      screen: props => <PopularTab {...props} tabLabel={item} />,
      navigationOptions: {
        title: item,
      },
    };
  });
  return tabs;
};

const PopularPage = createMaterialTopTabNavigator(getTabs(), {
  tabBarOptions: {
    tabStyle: {
      minWidth: 50,
    },
    upperCaseLabel: false, // 标签是否大写，默认为 true
    scrollEnabled: true, // 选项卡超出是否可以滚动，默认为 false
    style: {
      backgroundColor: '#678', // TabBar 的背景颜色
    },
    indicatorStyle: {
      // 标签指示器的样式
      height: 2,
      backgroundColor: '#fff',
    },
    labelStyle: {
      // 文字的样式
      fontSize: 13,
      marginTop: 6,
      marginBottom: 6,
    },
  },
});

export default PopularPage;
