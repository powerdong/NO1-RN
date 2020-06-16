/*
 * @Author: Lambda
 * @Begin: 2020-06-16 19:07:48
 * @Update: 2020-06-16 19:09:20
 * @Update log: 更新日志
 */
import Types from '../types';

export const onThemeChange = theme => {
  return {
    type: Types.THEME_CHANGE,
    theme: theme,
  };
};
