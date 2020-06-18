/* eslint-disable react-native/no-inline-styles */
/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:13:08
 * @Update: 2020-06-18 09:07:28
 * @Update log: 更新日志
 */
import React, {useEffect, useCallback, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Toast from 'react-native-easy-toast';
import actions from '../action';
import PopularItem from '../common/PopularItem';

const URL = 'https://api.github.com/search/repositories?q=';
const QUERY_STR = '&sort=stars';
const THEME_COLOR = 'red';

const PopularTab = props => {
  const pageSize = 10;
  const {tabLabel, onRefreshPopular, onLoadMorePopular, popular} = props;
  const storeName = tabLabel;
  const toast = useRef(null);
  const [canLoadMore, setCanLoadMore] = useState(true);
  const _store = useCallback(() => {
    let _storeShow = popular[storeName];
    if (!_storeShow) {
      _storeShow = {
        items: [],
        isLoading: false,
        projectModes: [], // 要显示的数据,
        hideLoadingMore: true, // 默认隐藏加载更多
      };
    }
    console.log('_storeShow: ', _storeShow.hideLoadingMore);
    return _storeShow;
  }, [popular, storeName]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const loadData = useCallback(
    loadMore => {
      const _storeLoadData = _store();
      const url = genFetchUrl(storeName);
      if (loadMore) {
        onLoadMorePopular(
          storeName,
          ++_storeLoadData.pageIndex,
          pageSize,
          _storeLoadData.items,
          callback => {
            toast.current.show('没有更多了');
          },
        );
      } else {
        onRefreshPopular(storeName, url, pageSize);
      }
    },
    [_store, onLoadMorePopular, onRefreshPopular, storeName],
  );

  const genFetchUrl = key => {
    return URL + key + QUERY_STR;
  };

  const renderItem = data => {
    return <PopularItem item={data.item} onSelect={() => {}} />;
  };

  const genIndicator = () => {
    return _store().hideLoadingMore ? null : (
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

  let store = _store(); // 动态获取 state
  return (
    <View>
      <FlatList
        data={store.projectModes}
        renderItem={data => renderItem(data)}
        keyExtractor={item => '' + item.id}
        refreshControl={
          <RefreshControl
            title="loading"
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={store.isLoading}
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
          console.log('---onMomentumScrollBegin-----');
        }}
      />
      <Toast ref={toast} position="center" />
    </View>
  );
};

const tabNames = ['Java', 'Android', 'iOS', 'React', 'React Native', 'PHP'];

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

const PopularPage = createMaterialTopTabNavigator(getTabs(), {
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
});

const mapStateToProps = state => ({
  popular: state.popular,
});
const mapDispatchToProps = dispatch => ({
  onRefreshPopular: (storeName, url, pageSize) =>
    dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMorePopular: (storeName, pageIndex, pageSize, items, callback) =>
    dispatch(
      actions.onLoadMorePopular(
        storeName,
        pageIndex,
        pageSize,
        items,
        callback,
      ),
    ),
});

const PopularTabPage = connect(
  mapStateToProps,
  mapDispatchToProps,
)(PopularTab);

export default PopularPage;
