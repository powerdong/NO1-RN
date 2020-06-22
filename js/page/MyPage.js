/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-22 19:55:31
 * @Update log: 更新日志
 */
import React from 'react';
import {TouchableOpacity, StyleSheet, View, Text} from 'react-native';
import NavigationUtil from '../navigation/NavigationUtil';
import NavigationBar from '../common/NavigationBar';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {ScrollView} from 'react-native-gesture-handler';
import {MORE_MENU} from '../common/MORE_MENU';
import GlobalStyles from '../res/styles/GlobalStyles';
import ViewUtil from '../util/ViewUtil';
import {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import {connect} from 'react-redux';
import actions from '../action';

const THEME_COLOR = '#678';

const MyPage = props => {
  // const {navigation} = props;
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

  const getItem = menu =>
    ViewUtil.getMenuItem(() => onClick(menu), menu, THEME_COLOR);

  const onClick = menu => {
    const {theme} = this.props;
    let RouteName,
      params = {theme};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        params.title = '教程';
        params.url = 'https:www.baidu.com';
        break;
      case MORE_MENU.About:
        RouteName = 'AboutPage';
        break;
      case MORE_MENU.Custom_Key:
      case MORE_MENU.Custom_Language:
      case MORE_MENU.Remove_Key:
        RouteName = 'CustomKeyPage';
        RouteName = 'CustomKeyPage';
        params.isRemoveKey = menu === MORE_MENU.Remove_Key;
        params.flag =
          menu !== MORE_MENU.Custom_Language
            ? FLAG_LANGUAGE.flag_key
            : FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.Sort_Key:
        RouteName = 'SortKeyPage';
        params.flag = FLAG_LANGUAGE.flag_key;
        break;
      case MORE_MENU.Sort_Language:
        RouteName = 'SortKeyPage';
        params.flag = FLAG_LANGUAGE.flag_language;
        break;
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        break;
      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(params, RouteName);
    }
  };
  return (
    <View style={GlobalStyles.root_container}>
      {navigationBar}
      <ScrollView>
        <TouchableOpacity
          style={styles.item}
          onPress={() => onClick(MORE_MENU.About)}>
          <View style={styles.about_left}>
            <Ionicons
              name={MORE_MENU.About.icon}
              size={40}
              style={{
                marginRight: 10,
                color: THEME_COLOR,
              }}
            />
            <Text>GitHub Popular</Text>
          </View>
          <Ionicons
            name="ios-arrow-forward"
            size={16}
            style={{
              marginRight: 10,
              alignSelf: 'center',
              color: THEME_COLOR,
            }}
          />
        </TouchableOpacity>
        <View style={GlobalStyles.line} />
        {getItem(MORE_MENU.Tutorial)}
        {/* 趋势管理 */}
        <Text style={styles.groupTitle}>趋势管理</Text>
        {/* 自定义语言 */}
        {getItem(MORE_MENU.Custom_Language)}
        {/* 语言排序 */}
        <View style={GlobalStyles.line} />
        {getItem(MORE_MENU.Sort_Language)}

        {/*最热管理*/}
        <Text style={styles.groupTitle}>最热管理</Text>
        {/*自定义标签*/}
        {getItem(MORE_MENU.Custom_Key)}
        {/*标签排序*/}
        <View style={GlobalStyles.line} />
        {getItem(MORE_MENU.Sort_Key)}
        {/*标签移除*/}
        <View style={GlobalStyles.line} />
        {getItem(MORE_MENU.Remove_Key)}

        {/*设置*/}
        <Text style={styles.groupTitle}>设置</Text>
        {/*自定义主题*/}
        {getItem(MORE_MENU.Custom_Theme)}
        {/*关于作者*/}
        <View style={GlobalStyles.line} />
        {getItem(MORE_MENU.About_Author)}
        <View style={GlobalStyles.line} />
        {/*反馈*/}
        {getItem(MORE_MENU.Feedback)}
        <View style={GlobalStyles.line} />
        {getItem(MORE_MENU.CodePush)}
      </ScrollView>
    </View>
  );
};

const mapStateToProps = state => ({
  theme: state.theme.theme,
});

const mapDispatchToProps = dispatch => ({
  onShowCustomThemeView: show => dispatch(actions.onShowCustomThemeView(show)),
});

//注意：connect只是个function，并不应定非要放在export后面
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  about_left: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#fff',
    padding: 10,
    height: 90,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  groupTitle: {
    marginLeft: 10,
    marginTop: 10,
    marginBottom: 5,
    fontSize: 12,
    color: 'gray',
  },
});
