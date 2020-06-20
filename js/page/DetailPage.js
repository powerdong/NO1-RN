/*
 * @Author: Lambda
 * @Begin: 2020-06-15 09:26:45
 * @Update: 2020-06-20 14:31:52
 * @Update log: 更新日志
 */
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, TouchableOpacity, BackHandler} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigation/NavigationUtil';
import ViewUtil from '../util/ViewUtil';
import FavoriteDao from '../expand/dao/FavoriteDao';
const TRENDING_URL = 'https://github.com';

const DetailPage = props => {
  const params = props.navigation.state.params;
  const {projectModel, flag, callback} = params;
  const favoriteDao = new FavoriteDao(flag);
  const _url =
    projectModel.item.html_url || TRENDING_URL + projectModel.item.fullName;
  const [url, setUrl] = useState(_url);
  const [isFavorite, setIsFavorite] = useState(projectModel.isFavorite);
  const webView = useRef(null);
  const [canGoBack, setCanGoBack] = useState(false);
  useEffect(() => {
    // 物理返回键的监听
    BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => {
      BackHandler.removeEventListener('hardwareBackPress', onBackPress);
    };
  });
  const THEME_COLOR = '#678';
  const title = projectModel.item.full_name || projectModel.item.fullName;
  /** 处理 Android 中的物理返回键 */
  const onBackPress = () => {
    onBack();
    return true;
  };
  // 标题过长会显示有误
  const titleLayoutStyle = title.length > 20 ? {paddingRight: 30} : null;
  // 监听 WebView 的返回
  const onBack = () => {
    if (canGoBack) {
      webView.current.goBack();
    } else {
      NavigationUtil.goBack({navigation: props.navigation});
    }
  };
  // WebView 每次跳转页面执行的方法
  const onNavigationStateChange = navState => {
    setCanGoBack(navState.canGoBack);
    setUrl(navState.url);
  };

  const onFavoriteButtonClick = () => {
    // const {projectModel} = params;
    const _isFavorite = (projectModel.isFavorite = !projectModel.isFavorite);
    callback(_isFavorite);
    setIsFavorite(_isFavorite);
    let key = projectModel.item.fullName
      ? projectModel.item.fullName
      : projectModel.item.id.toString();
    if (projectModel.isFavorite) {
      favoriteDao.saveFavoriteItem(key, JSON.stringify(projectModel.item));
    } else {
      favoriteDao.removeFavoriteItem(key);
    }
  };

  const renderRightButton = () => (
    <View style={{flexDirection: 'row'}}>
      <TouchableOpacity onPress={onFavoriteButtonClick}>
        <FontAwesome
          name={isFavorite ? 'star' : 'star-o'}
          size={20}
          style={{color: 'white', marginRight: 10}}
        />
      </TouchableOpacity>
      {ViewUtil.getShareButton(() => {})}
    </View>
  );
  let statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  };
  let navigationBar = (
    <NavigationBar
      title={title}
      statusBar={statusBar}
      titleLayoutStyle={titleLayoutStyle}
      style={{
        backgroundColor: THEME_COLOR,
      }}
      leftButton={ViewUtil.getLeftBackButton(() => onBack())}
      rightButton={renderRightButton()}
    />
  );
  return (
    <View style={styles.container}>
      {navigationBar}
      <WebView
        ref={webView}
        startInLoadingState={true}
        onNavigationStateChange={e => onNavigationStateChange(e)}
        source={{uri: url}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default DetailPage;
