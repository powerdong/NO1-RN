/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:17:07
 * @Update: 2020-06-22 10:38:09
 * @Update log: 更新日志
 */
import React, {useState} from 'react';
import {View, Linking} from 'react-native';
import NavigationUtil from '../../navigation/NavigationUtil';
import {MORE_MENU} from '../../common/MORE_MENU';
import GlobalStyles from '../../res/styles/GlobalStyles';
import ViewUtil from '../../util/ViewUtil';
import AboutCommon, {FLAG_ABOUT} from './AboutCommon';
import config from '../../res/data/config.json';
const THEME_COLOR = '#678';

const AboutPage = props => {
  const params = props.navigation.state.params;
  const [data, setData] = useState(config);
  const aboutCommon = new AboutCommon(
    {
      ...params,
      navigation: props.navigation,
      flagAbout: FLAG_ABOUT.flag_about,
    },
    _data => setData({..._data}),
  );

  const getItem = menu =>
    ViewUtil.getMenuItem(() => onClick(menu), menu, THEME_COLOR);

  const onClick = menu => {
    let RouteName,
      _params = {};
    switch (menu) {
      case MORE_MENU.Tutorial:
        RouteName = 'WebViewPage';
        _params.title = '教程';
        _params.url = 'https:www.baidu.com';
        break;
      case MORE_MENU.About_Author:
        RouteName = 'AboutMePage';
        break;
      case MORE_MENU.Feedback:
        const url = 'mailto://m19893170798@163.com';
        Linking.canOpenURL(url)
          .then(support => {
            if (!support) {
              console.log(`Can't handle url: ${url}`);
            } else {
              Linking.openURL(url);
            }
          })
          .catch(e => {
            console.error(e);
          });
        break;
      default:
        break;
    }
    if (RouteName) {
      NavigationUtil.goPage(_params, RouteName);
    }
  };
  const content = (
    <View>
      {getItem(MORE_MENU.Tutorial)}
      <View style={GlobalStyles.line} />
      {getItem(MORE_MENU.About_Author)}
      <View style={GlobalStyles.line} />
      {getItem(MORE_MENU.Feedback)}
    </View>
  );
  return aboutCommon.render(content, data.app);
};

export default AboutPage;
