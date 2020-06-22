/*
 * @Author: Lambda
 * @Begin: 2020-06-16 19:09:44
 * @Update: 2020-06-22 19:11:28
 * @Update log: 更新日志
 */
import {onThemeChange} from './theme';
import {
  onRefreshPopular,
  onLoadMorePopular,
  onFlushPopularFavorite,
} from './popular';
import {onRefreshTrending, onLoadMoreTrending} from './trending';
import {onLoadFavoriteData} from './favorite';
import {onSearch, onSearchCancel, onLoadMoreSearch} from './search';
import {onLoadLanguage} from './language';

export default {
  onThemeChange,
  onRefreshPopular,
  onLoadMorePopular,
  onRefreshTrending,
  onLoadLanguage,
  onLoadMoreSearch,
  onSearch,
  onSearchCancel,
  onLoadMoreTrending,
  onLoadFavoriteData,
  onFlushPopularFavorite,
};
