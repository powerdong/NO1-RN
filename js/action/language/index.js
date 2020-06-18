/*
 * @Author: Lambda
 * @Begin: 2020-06-18 10:16:24
 * @Update: 2020-06-18 10:19:23
 * @Update log: 更新日志
 */
/*
 * @Author: Lambda
 * @Begin: 2020-06-17 09:23:24
 * @Update: 2020-06-18 10:16:30
 * @Update log: 更新日志
 */
import Types from '../types';
import LanguageDao from '../../expand/dao/LanguageDao';

/**
 * 加载标签
 * @param flagKey
 * @returns {function(*)}
 */
export function onLoadLanguage(flagKey) {
  return async dispatch => {
    try {
      let languages = await new LanguageDao(flagKey).fetch();
      dispatch({
        type: Types.LANGUAGE_LOAD_SUCCESS,
        languages: languages,
        flag: flagKey,
      });
    } catch (e) {
      console.log(e);
    }
  };
}
