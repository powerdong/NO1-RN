/*
 * @Author: Lambda
 * @Begin: 2020-06-16 19:09:44
 * @Update: 2020-06-20 16:53:43
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
export default {
  onThemeChange,
  onRefreshPopular,
  onLoadMorePopular,
  onRefreshTrending,
  onLoadMoreTrending,
  onLoadFavoriteData,
  onFlushPopularFavorite,
};
