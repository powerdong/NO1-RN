/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-22 10:34:39
 * @Update log: 更新日志
 */
import React, {useState, useRef, useEffect, useCallback} from 'react';
import {View, Linking, Clipboard} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../../navigation/NavigationUtil';
import {MORE_MENU} from '../../common/MORE_MENU';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import config from '../../res/data/config.json';
import Toast from 'react-native-easy-toast';
const THEME_COLOR = '#678';

const AboutMePage = props => {
  const params = props.navigation.state.params;
  const [data, setData] = useState(config);
  const toast = useRef(null);
  const [menuIsShow, setMenuIsShow] = useState({
    showTutorial: true,
    showBlog: false,
    showQQ: false,
    showContact: false,
  });
  const aboutCommon = new AboutCommon(
    {
      ...params,
      navigation: props.navigation,
      flagAbout: FLAG_ABOUT.flag_about_me,
    },
    _data => setData({..._data}),
  );

  const getItem = menu =>
    ViewUtil.getMenuItem(() => onClick(menu), menu, THEME_COLOR);

  const _item = (_data, isShow, key) =>
    ViewUtil.getSettingItem(
      () =>
        setMenuIsShow({
          ...menuIsShow,
          [key]: !menuIsShow[key],
        }),
      _data.name,
      THEME_COLOR,
      Ionicons,
      _data.icon,
      isShow ? 'ios-arrow-up' : 'ios-arrow-down',
    );

  const renderItems = (dic, isShowAccount) => {
    if (!dic) {
      return null;
    }
    let views = [];

    for (const i in dic) {
      let title = isShowAccount
        ? `${dic[i].title}:${dic[i].account}`
        : dic[i].title;
      views.push(
        <View key={i}>
          {ViewUtil.getSettingItem(() => onClick(dic[i]), title, THEME_COLOR)}
          <View style={GlobalStyles.line} />
        </View>,
      );
    }
    return views;
  };
  const onClick = useCallback(
    tab => {
      if (!tab) {
        return;
      }
      if (tab.url) {
        NavigationUtil.goPage(
          {
            title: tab.title,
            url: tab.url,
          },
          'WebViewPage',
        );
        return;
      }
      if (tab.account && tab.account.includes('@')) {
        let url = `mailto://${tab.account}`;
        Linking.canOpenURL(url)
          .then(supported => {
            if (!supported) {
              console.log(`Can't handle url: ${url}`);
            } else {
              return Linking.openURL(url);
            }
          })
          .catch(err => console.error(`An error occurred ${err}`));
      }
      if (tab.account) {
        Clipboard.setString(tab.account);
        console.log('toast.current: ', toast);
        toast.current.show(tab.title + tab.account + '已复制到剪切板。');
      }
    },
    [toast],
  );
  const content = (
    <View>
      {_item(data.aboutMe.Tutorial, menuIsShow.showTutorial, 'showTutorial')}
      <View style={GlobalStyles.line} />
      {menuIsShow.showTutorial
        ? renderItems(data.aboutMe.Tutorial.items)
        : null}
      {_item(data.aboutMe.Blog, menuIsShow.showBlog, 'showBlog')}
      <View style={GlobalStyles.line} />
      {menuIsShow.showBlog ? renderItems(data.aboutMe.Blog.items) : null}
      {_item(data.aboutMe.QQ, menuIsShow.showQQ, 'showQQ')}
      <View style={GlobalStyles.line} />
      {menuIsShow.showQQ ? renderItems(data.aboutMe.QQ.items) : null}
      {_item(data.aboutMe.Contact, menuIsShow.showContact, 'showContact')}
      <View style={GlobalStyles.line} />
      {menuIsShow.showContact ? renderItems(data.aboutMe.Contact.items) : null}
    </View>
  );
  return (
    <View style={{flex: 1}}>
      {aboutCommon.render(content, data.author)}
      <Toast ref={toast} position="center" />
    </View>
  );
};

export default AboutMePage;
