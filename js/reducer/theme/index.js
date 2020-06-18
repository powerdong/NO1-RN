/*
 * @Author: Lambda
 * @Begin: 2020-06-16 17:10:03
 * @Update: 2020-06-18 10:26:15
 * @Update log: 更新日志
 */
import Types from '../../action/types';
import ThemeFactory, {ThemeFlags} from '../../res/styles/ThemeFactory';

const defaultState = {
  theme: ThemeFactory.createTheme(ThemeFlags.Default),
  onShowCustomThemeView: false,
};
export default function onAction(state = defaultState, action) {
  switch (action.type) {
    case Types.THEME_CHANGE:
      return {
        ...state,
        theme: action.theme,
      };
    case Types.SHOW_THEME_VIEW:
      return {
        ...state,
        customThemeViewVisible: action.customThemeViewVisible,
      };
    default:
      return state;
  }
}
