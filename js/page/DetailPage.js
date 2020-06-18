/*
 * @Author: Lambda
 * @Begin: 2020-06-15 09:26:45
 * @Update: 2020-06-18 16:05:23
 * @Update log: 更新日志
 */
import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';

const TRENDING_URL = 'https://github.com';

const DetailPage = props => {
  const params = props.navigation.state.params;
  const {projectModel} = params;
  const url = projectModel.html_url || TRENDING_URL + projectModel.fullName;
  const THEME_COLOR = '#678';
  const [title, setTitle] = useState(
    projectModel.full_name || projectModel.fullName,
  );
  const [canGoBack, setCanGoBack] = useState(false);
  const onBack = () => {};
  const renderRightButton = () => {
    <View>
      <TouchableOpacity onPress={() => {}}>
        <FontAwesome
          name="star-o"
          size={20}
          style={{color: '#fff', marginRight: 10}}
        />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {})}
    </View>;
  };
  let navigationBar = (
    <NavigationBar
      title={title}
      style={{
        backgroundColor: THEME_COLOR,
      }}
      leftButton={ViewUtil.getLeftBackButton(() => onBack())}
      rightButton={renderRightButton()}
    />
  );
  return <View style={styles.container}>{navigationBar}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5fcff',
  },
});

export default DetailPage;
