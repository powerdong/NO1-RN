/*
 * @Author: Lambda
 * @Begin: 2020-06-17 13:33:57
 * @Update: 2020-06-17 13:50:32
 * @Update log: 更新日志
 */
import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet} from 'react-native';

import DataStore from '../expand/dao/DataStore';

const DataStoreDemoPage = () => {
  const [searchKey, setSearchKey] = useState('');
  const [showText, setShowText] = useState('');

  const loadData = async () => {
    const dataStore = new DataStore();
    let url = `https://api.github.com/search/repositories?q=${searchKey}`;
    dataStore
      .fetchData(url)
      .then(data => {
        let showData = `初次数据加载时间：${new Date(
          data.timestamp,
        )}\n${JSON.stringify(data.data)}`;
        setShowText(showData);
      })
      .catch(err => {
        err && console.log(err.toString());
      });
  };
  return (
    <View>
      <Text>DataStoreDemoPage页面</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setSearchKey(text);
          }}
        />
        <View>
          <Button
            title="获取"
            onPress={() => {
              loadData();
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

export default DataStoreDemoPage;
