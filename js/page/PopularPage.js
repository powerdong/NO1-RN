/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:13:08
 * @Update: 2020-06-22 19:58:57
 * @Update log: 更新日志
 */
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Toast from 'react-native-easy-toast';
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
import EventTypes from '../util/EventTypes';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = '#678';
const PAGE_SIZE = 10;
const favoriteDao = new FavoriteDao(FLAG_STORAGE.flag_popular);
// 获取数据函数
const _store = (popular, storeName) => {
  let _storeShow = popular[storeName];
  if (!_storeShow) {
    _storeShow = {
      items: [],
      isLoading: false,
      projectModes: [], // 要显示的数据,
      hideLoadingMore: true, // 默认隐藏加载更多
    };
  }
  return _storeShow;
};

// 热门页面的数据
const PopularTab = props => {
  // 默认每页先显示 10项
  const {
    tabLabel,
    onRefreshPopular,
    onLoadMorePopular,
    popular,
    onFlushPopularFavorite,
  } = props;
  const storeName = tabLabel;
  const favoriteChangeListener = useRef(null);
  const bottomTabSelectListener = useRef(null);
  const toast = useRef(null);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const [isFavoriteChanged, setIsFavoriteChanged] = useState(false);

  useEffect(() => {
    loadData();
    EventBus.getInstance().addListener(
      EventTypes.favorite_changed_popular,
      (favoriteChangeListener.current = () => {
        setIsFavoriteChanged(true);
      }),
    );
    EventBus.getInstance().addListener(
      EventTypes.bottom_tab_select,
      (bottomTabSelectListener.current = data => {
        if (data.to === 0 && isFavoriteChanged) {
          loadData(null, true);
        }
      }),
    );
    return () => {
      EventBus.getInstance().removeListener(favoriteChangeListener);
      EventBus.getInstance().removeListener(bottomTabSelectListener);
    };
  }, [isFavoriteChanged, loadData]);

  // 请求数据
  const loadData = useCallback(
    (loadMore, refreshFavorite) => {
      const _storeLoadData = _store(popular, storeName);
      const url = `${URL}${storeName}${QUERY_STR}`;
      if (loadMore) {
        onLoadMorePopular(
          storeName,
          ++_storeLoadData.pageIndex,
          PAGE_SIZE,
          _storeLoadData.items,
          favoriteDao,
          () => {
            toast.current.show('没有更多了');
          },
        );
      } else if (refreshFavorite) {
        onFlushPopularFavorite(
          storeName,
          _storeLoadData.pageIndex,
          _storeLoadData.pageSize,
          _storeLoadData.items,
          favoriteDao,
        );
      } else {
        onRefreshPopular(storeName, url, PAGE_SIZE, favoriteDao);
      }
    },
    [
      onFlushPopularFavorite,
      onLoadMorePopular,
      onRefreshPopular,
      popular,
      storeName,
    ],
  );

  // 底部加载更多组件
  const genIndicator = () => {
    return _store(popular, storeName).hideLoadingMore ? null : (
      <View
        style={{
          alignItems: 'center',
        }}>
        <ActivityIndicator
          style={{
            color: 'red',
            margin: 10,
          }}
        />
        <Text>正在加载更多</Text>
      </View>
    );
  };

  return (
    <View>
      <FlatList
        data={_store(popular, storeName).projectModes}
        // 每项 Item
        renderItem={data => (
          <PopularItem
            projectModel={data.item}
            onSelect={callback => {
              NavigationUtil.goPage(
                {
                  projectModel: data.item,
                  flag: FLAG_STORAGE.flag_popular,
                  callback,
                },
                'DetailPage',
              );
            }}
            onFavorite={(item, isFavorite) => {
              FavoriteUtil.onFavorite(
                favoriteDao,
                item,
                isFavorite,
                FLAG_STORAGE.flag_popular,
              );
            }}
          />
        )}
        keyExtractor={item => '' + item.item.id}
        // 下拉刷新
        refreshControl={
          <RefreshControl
            title="loading"
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={_store(popular, storeName).isLoading}
            onRefresh={() => loadData()}
            tintColor={THEME_COLOR}
          />
        }
        // =====上拉加载更多======
        ListFooterComponent={() => genIndicator()}
        onEndReached={() => {
          console.log('----onEndReached----');
          setTimeout(() => {
            if (canLoadMore) {
              //fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
              loadData(true);
              setCanLoadMore(false);
            }
          }, 100);
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          setCanLoadMore(true);
        }}
      />
      <Toast ref={toast} position="center" />
    </View>
  );
};

// 配置要显示的 tab
const tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];

// 筛选出顶部要渲染的 Tab
const getTabs = () => {
  const tabs = {};
  tabNames.forEach((item, index) => {
    tabs[`tab${index}`] = {
      // 通过这种方式给页面进行传值
      screen: props => <PopularTabPage {...props} tabLabel={item} />,
      navigationOptions: {
        title: item,
      },
    };
  });
  return tabs;
};

// 配置顶部导航栏
const PopularPageTopNavigator = createMaterialTopTabNavigator(getTabs(), {
  tabBarOptions: {
    tabStyle: {
      minWidth: 50,
    },
    upperCaseLabel: false, // 标签是否大写，默认为 true
    scrollEnabled: true, // 选项卡超出是否可以滚动，默认为 false
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
  lazy: true,
});

const mapStateToProps = state => ({
  popular: state.popular,
});

const mapDispatchToProps = dispatch => ({
  onFlushPopularFavorite: (
    storeName,
    pageIndex,
    pageSize,
    dataArray,
    _favoriteDao,
  ) =>
    dispatch(
      actions.onFlushPopularFavorite(
        storeName,
        pageIndex,
        pageSize,
        dataArray,
        _favoriteDao,
      ),
    ),
  onRefreshPopular: (storeName, url, pageSize, _favoriteDao) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize, _favoriteDao)),
  onLoadMorePopular: (
    storeName,
    pageIndex,
    pageSize,
    items,
    _favoriteDao,
    callback,
  ) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        _favoriteDao,
        callback,
      ),
    ),
});

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularTab);

const PopularPage = props => {
  // const {keys, theme} = props;
  const {theme} = props;

  const renderRightButton = () => (
    <TouchableOpacity
      onPress={() => {
        // AnalyticsUtil.track('SearchButtonClick');
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
      title={'最热'}
      statusBar={statusBar}
      style={{
        backgroundColor: THEME_COLOR,
      }}
      rightButton={renderRightButton()}
    />
  );
  const TabNavigator = createAppContainer(PopularPageTopNavigator);
  return (
    <View style={{flex: 1}}>
      {navigationBar}
      <TabNavigator />
    </View>
  );
};

const mapPopularStateToProps = state => ({
  // keys: state.language.keys,
  theme: state.theme.theme,
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag)),
});

export default connect(
  mapPopularStateToProps,
  mapPopularDispatchToProps,
)(PopularPage);
