/*
 * @Author: Lambda
 * @Begin: 2020-06-15 09:26:45
 * @Update: 2020-06-21 10:36:36
 * @Update log: 更新日志
 */
import React, {useState, useRef, useEffect} from 'react';
import {StyleSheet, View, BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import NavigationBar from '../common/NavigationBar';
import NavigationUtil from '../navigation/NavigationUtil';
import ViewUtil from '../util/ViewUtil';

const WebViewPage = props => {
  const params = props.navigation.state.params;
  const {title, url} = params;
  const [viewUrl, setViewUrl] = useState(url);
  const [ViewTitle] = useState(title);
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
  /** 处理 Android 中的物理返回键 */
  const onBackPress = () => {
    onBack();
    return true;
  };

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
    setViewUrl(navState.url);
  };

  let navigationBar = (
    <NavigationBar
      title={ViewTitle}
      style={{
        backgroundColor: THEME_COLOR,
      }}
      leftButton={ViewUtil.getLeftBackButton(() => onBackPress())}
    />
  );
  return (
    <View style={styles.container}>
      {navigationBar}
      <WebView
        ref={webView}
        startInLoadingState={true}
        onNavigationStateChange={e => onNavigationStateChange(e)}
        source={{uri: viewUrl}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default WebViewPage;
