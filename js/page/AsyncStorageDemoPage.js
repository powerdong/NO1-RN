/*
 * @Author: Lambda
 * @Begin: 2020-06-17 10:54:33
 * @Update: 2020-06-17 11:11:40
 * @Update log: 更新日志
 */
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';

const KEY = 'save_key';
const AsyncStorageDemoPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [showText, setShowText] = useState('');

  const doSave = async () => {
    AsyncStorage.setItem(KEY, searchKey).catch(err => {
      err && console.log(err.toString());
    });
  };
  const doRemove = async () => {
    AsyncStorage.removeItem(KEY).catch(err => {
      err && console.log(err.toString());
    });
  };
  const doGetData = async () => {
    AsyncStorage.getItem(KEY).then(res => {
      setShowText(res);
    });
  };
  return (
    <View>
      <Text>AsyncStorageDemoPage页面</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setSearchKey(text);
          }}
        />
        <View>
          <Button
            title="存储"
            onPress={() => {
              doSave();
            }}
          />
          <Button
            title="删除"
            onPress={() => {
              doRemove();
            }}
          />
          <Button
            title="获取"
            onPress={() => {
              doGetData();
            }}
          />
        </View>
        <Text>{showText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5fcff',
  },
  input: {
    height: 50,
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
    marginRight: 10,
  },
  input_container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default AsyncStorageDemoPage;
