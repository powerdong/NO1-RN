/*
 * @Author: Lambda
 * @Begin: 2020-06-17 10:17:35
 * @Update: 2020-06-17 10:54:02
 * @Update log: 更新日志
 */
import React, {useState} from 'react';
import {StyleSheet, View, Text, Button, TextInput} from 'react-native';

const FetchDemoPage = props => {
  const [searchKey, setSearchKey] = useState('');
  const [showText, setShowText] = useState('');
  const loadData = () => {
    fetch(`https://api.github.com/search/repositories?q=${searchKey}`)
      .then(res => {
        if (res.ok) {
          return res.text();
        }
        throw new Error('Network response was not ok.');
      })
      .then(resText => {
        setShowText(resText);
      })
      .catch(err => {
        if (err) {
          setShowText(err.toString());
        }
      });
  };

  return (
    <View style={styles.container}>
      <Text>FetchDemoPage页面</Text>
      <View style={styles.input_container}>
        <TextInput
          style={styles.input}
          onChangeText={text => {
            setSearchKey(text);
          }}
        />
        <Button
          title="获取"
          onPress={() => {
            loadData();
          }}
        />
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
    height: 30,
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

export default FetchDemoPage;
