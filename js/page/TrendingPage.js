/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:14:33
 * @Update: 2020-06-16 19:53:01
 * @Update log: 更新日志
 */
import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';
import actions from '../action';
import {connect} from 'react-redux';
const Trending = props => {
  const {onThemeChange} = props;
  return (
    <View style={styles.container}>
      <Text>Trending页面</Text>
      <Button
        title="改变主题色"
        onPress={() => {
          onThemeChange('dark');
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

const mapDispatchToProps = dispatch => ({
  onThemeChange: theme => dispatch(actions.onThemeChange(theme)),
});

export default connect(
  null,
  mapDispatchToProps,
)(Trending);
