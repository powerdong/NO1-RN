/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:15:56
 * @Update: 2020-06-20 18:59:46
 * @Update log: 更新日志
 */
import React, {useEffect, useCallback, useRef} from 'react';
import {View, FlatList, RefreshControl, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EventBus from 'react-native-event-bus';
import actions from '../action';
import AnalyticsUtil from '../util/AnalyticsUtil';
import NavigationUtil from '../navigation/NavigationUtil';
import PopularItem from '../common/PopularItem';
import NavigationBar from '../common/NavigationBar';
import FavoriteDao from '../expand/dao/FavoriteDao';
import {FLAG_STORAGE} from '../expand/dao/DataStore';
import FavoriteUtil from '../util/FavoriteUtil';
import TrendingItem from '../common/TrendingItem';
import EventTypes from '../util/EventTypes';

const THEME_COLOR = '#678';

// 获取数据函数
const _store = (favorite, storeName) => {
  let _storeShow = favorite[storeName];
  if (!_storeShow) {
    _storeShow = {
      items: [],
      isLoading: false,
      projectModes: [], // 要显示的数据,
    };
  }
  return _storeShow;
};

const FavoriteTab = props => {
  const {onLoadFavoriteData, favorite, flag} = props;
  const storeName = flag;
  const listener = useRef(null);
  const favoriteDao = new FavoriteDao(flag);
  useEffect(() => {
    loadData();
    EventBus.getInstance().addListener(
      EventTypes.bottom_tab_select,
      (listener.current = data => {
        if (data.to === 2) {
          loadData(false);
        }
      }),
    );
    return () => {
      EventBus.getInstance().removeListener(listener.current);
    };
  }, [loadData]);

  // 请求数据
  const loadData = useCallback(
    isShowLoading => {
      onLoadFavoriteData(storeName, isShowLoading);
    },
    [onLoadFavoriteData, storeName],
  );

  const handleFavorite = (item, isFavorite) => {
    FavoriteUtil.onFavorite(favoriteDao, item, isFavorite, storeName);
    if (storeName === FLAG_STORAGE.flag_popular) {
      EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
    } else {
      EventBus.getInstance().fireEvent(EventTypes.favorite_changed_popular);
    }
  };

  return (
    <View>
      <FlatList
        data={_store(favorite, storeName).projectModels}
        // 每项 Item
        renderItem={data => {
          const Item =
            storeName === FLAG_STORAGE.flag_popular
              ? PopularItem
              : TrendingItem;
          return (
            <Item
              projectModel={data.item}
              onSelect={callback => {
                NavigationUtil.goPage(
                  {
                    projectModel: data.item,
                    flag: storeName,
                    callback,
                  },
                  'DetailPage',
                );
              }}
              onFavorite={(item, isFavorite) =>
                handleFavorite(item, isFavorite)
              }
            />
          );
        }}
        keyExtractor={item => '' + (item.item.id || item.item.fullName)}
        // 下拉刷新
        refreshControl={
          <RefreshControl
            title="loading"
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={_store(favorite, storeName).isLoading}
            onRefresh={() => loadData(true)}
            tintColor={THEME_COLOR}
          />
        }
      />
    </View>
  );
};

// 配置顶部导航栏
const FavoritePageTopNavigator = createMaterialTopTabNavigator(
  {
    Popular: {
      screen: props => (
        <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_popular} />
      ),
      navigationOptions: {
        title: '最热',
      },
    },
    Trending: {
      screen: props => (
        <FavoriteTabPage {...props} flag={FLAG_STORAGE.flag_trending} />
      ),
      navigationOptions: {
        title: '趋势',
      },
    },
  },
  {
    tabBarOptions: {
      tabStyle: {
        minWidth: 50,
      },
      upperCaseLabel: false, // 标签是否大写，默认为 true
      // scrollEnabled: true, // 选项卡超出是否可以滚动，默认为 false
      style: {
        backgroundColor: '#678', // TabBar 的背景颜色
      },
      indicatorStyle: {
        // 标签指示器的样式
        height: 2,
        backgroundColor: '#fff',
      },
      labelStyle: {
        // 文字的样式
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6,
      },
    },
  },
);

const mapStateToProps = state => ({
  favorite: state.favorite,
});

const mapDispatchToProps = dispatch => ({
  onLoadFavoriteData: (flag, isShowLoading) =>
    dispatch(actions.onLoadFavoriteData(flag, isShowLoading)),
});

const FavoriteTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(FavoriteTab);

const FavoritePage = props => {
  // const {keys, theme} = props;
  const {theme} = props;

  const renderRightButton = () => (
    <TouchableOpacity
      onPress={() => {
        AnalyticsUtil.track('SearchButtonClick');
        NavigationUtil.goPage({theme}, 'SearchPage');
      }}>
      <View style={{padding: 5, marginRight: 8}}>
        <Ionicons
          name={'ios-search'}
          size={24}
          style={{
            marginRight: 8,
            alignSelf: 'center',
            color: 'white',
          }}
        />
      </View>
    </TouchableOpacity>
  );
  let statusBar = {
    backgroundColor: THEME_COLOR,
    barStyle: 'light-content',
  };
  let navigationBar = (
    <NavigationBar
      title={'收藏'}
      statusBar={statusBar}
      style={{
        backgroundColor: THEME_COLOR,
      }}
      rightButton={renderRightButton()}
    />
  );
  const TabNavigator = createAppContainer(FavoritePageTopNavigator);
  return (
    <View style={{flex: 1}}>
      {navigationBar}
      <TabNavigator />
    </View>
  );
};

const mapPopularStateToProps = state => ({
  keys: state.language.keys,
  theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag)),
});

export default connect(
  mapPopularStateToProps,
  mapPopularDispatchToProps,
)(FavoritePage);
