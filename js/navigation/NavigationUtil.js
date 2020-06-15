/*
 * @Author: Lambda
 * @Begin: 2020-06-15 11:06:20
 * @Update: 2020-06-15 16:32:25
 * @Update log: 全局导航跳转工具类
 */
export default class NavigationUtil {
  /**
   * 返回上一页
   */
  static goBack(params) {
    const {navigation} = params;
    navigation.goBack();
  }
  /**
   * 重置到首页
   */
  static resetToHomePage(params) {
    const {navigation} = params;
    navigation.navigate('Main');
  }
  /**
   * 跳转到指定页面
   * @param params 要传递的参数
   * @param page 要跳转的页面名
   */
  static goPage(params, page) {
    const {navigation} = params;
    if (!navigation) {
      console.log('navigation can not be null');
      return;
    }
    navigation.navigate(page, {
      ...params,
    });
  }
}
