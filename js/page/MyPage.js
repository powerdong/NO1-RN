/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-18 10:59:23
 * @Update log: 更新日志
 */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text, Button} from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
const THEME_COLOR = '#678';

const MyPage = props => {
  const {navigation} = props;
  const getRightButton = () => (
    <View
      style={{
        flexDirection: 'row',
      }}>
      <TouchableOpacity onPress={() => {}}>
        <View style={{padding: 5, marginRight: 8}}>
          <Feather name="search" size={24} style={{color: 'white'}} />
        </View>
      </TouchableOpacity>
    </View>
  );
  const getLeftButton = callback => (
    <TouchableOpacity style={{padding: 8, paddingLeft: 12}} onPress={callback}>
      <View style={{padding: 5, marginRight: 8}}>
        <Ionicons name="ios-arrow-back" size={26} style={{color: 'white'}} />
      </View>
    </TouchableOpacity>
  );

  let statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  };
  let navigationBar = (
    <NavigationBar
      title={'最热'}
      statusBar={statusBar}
      style={{
        backgroundColor: THEME_COLOR,
      }}
      leftButton={getLeftButton()}
      rightButton={getRightButton()}
    />
  );
  return (
    <View style={styles.container}>
      {navigationBar}
      <Text>MyPage</Text>
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
    marginTop: 30,
  },
});

export default MyPage;
