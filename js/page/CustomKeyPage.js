/*
 * @Author: Lambda
 * @Begin: 2020-06-22 11:16:31
 * @Update: 2020-06-22 16:50:11
 * @Update log: 更新日志
 */
import React from 'react';
import useBackPress from '../common/useBackPress';
import LanguageDao, {FLAG_LANGUAGE} from '../expand/dao/LanguageDao';
import {useState, useEffect, useCallback} from 'react';
import {Alert, View, ScrollView, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import CheckBox from 'react-native-check-box';
import Ionicons from 'react-native-vector-icons/Ionicons';
import NavigationUtil from '../navigation/NavigationUtil';
import actions from '../action/index';
import NavigationBar from '../common/NavigationBar';
import ViewUtil from '../util/ViewUtil';
import ArrayUtil from '../util/ArrayUtil';

const THEME_COLOR = '#678';
const changeValues = [];

const CustomKeyPage = props => {
  const params = props.navigation.state.params;
  const {onLoadLanguage} = props;
  useBackPress(onBackPress);
  const isRemoveKey = !!params.isRemoveKey;
  const languageDao = new LanguageDao(params.flag);
  const [key, setKey] = useState([]);

  useEffect(() => {
    if (_keys(props).length === 0) {
      onLoadLanguage(params.flag);
    }
    setKey(_keys(props));
  }, [_keys, props, params.flag, onLoadLanguage]);
  const onBackPress = () => {
    onBack();
    return true;
  };

  const _keys = useCallback(
    (_props, original) => {
      let _key = params.flag === FLAG_LANGUAGE.flag_key ? 'keys' : 'languages';
      if (isRemoveKey && !original) {
        //如果state中的keys为空则从props中取
        return (
          (key && key.length !== 0) ||
          _props.language[_key].map(val => {
            return {
              //注意：不直接修改props，copy一份
              ...val,
              checked: false,
            };
          })
        );
      } else {
        return _props.language[_key];
      }
    },
    [isRemoveKey, key, params.flag],
  );

  const onSave = () => {
    if (changeValues.length === 0) {
      NavigationUtil.goBack({navigation: props.navigation});
      return;
    }
    let keys;
    if (isRemoveKey) {
      //移除标签的特殊处理
      for (let i = 0, l = changeValues.length; i < l; i++) {
        ArrayUtil.remove(
          (keys = CustomKeyPage._keys(props, true)),
          changeValues[i],
          'name',
        );
      }
    }
    //更新本地数据
    languageDao.save(keys || key);
    //更新store
    onLoadLanguage(params.flag);
    NavigationUtil.goBack(props.navigation);
  };

  const onBack = () => {
    console.log('changeValues: ', changeValues);
    if (changeValues.length > 0) {
      Alert.alert('提示', '要保存修改吗？', [
        {
          text: '否',
          onPress: () => {
            NavigationUtil.goBack({navigation: props.navigation});
          },
        },
        {
          text: '是',
          onPress: () => {
            onSave();
          },
        },
      ]);
    } else {
      NavigationUtil.goBack({navigation: props.navigation});
    }
  };

  let navigationBar = () => {
    // const {theme} = params;
    let title = isRemoveKey ? '标签移除' : '自定义标签';
    title = params.flag === FLAG_LANGUAGE.flag_language ? '自定义语言' : title;
    let rightButtonTitle = isRemoveKey ? '移除' : '保存';
    return (
      <NavigationBar
        title={title}
        leftButton={ViewUtil.getLeftBackButton(() => onBack())}
        // style={theme.styles.navBar}
        rightButton={ViewUtil.getRightButton(rightButtonTitle, () => onSave())}
      />
    );
  };

  const onClick = (data, index) => {
    data.checked = !data.checked;
    ArrayUtil.updateArray(changeValues, data);
    setKey(prev => {
      prev[index] = data;
      return [...prev];
    });
  };

  const _checkedImage = checked => {
    // const {theme} = params;
    return (
      <Ionicons
        name={checked ? 'ios-checkbox' : 'md-square-outline'}
        size={20}
        style={{
          color: THEME_COLOR,
        }}
      />
    );
  };
  const renderCheckBox = (data, index) => {
    return (
      <CheckBox
        style={{flex: 1, padding: 10}}
        onClick={() => onClick(data, index)}
        isChecked={data.checked}
        leftText={data.name}
        checkedImage={_checkedImage(true)}
        unCheckedImage={_checkedImage(false)}
      />
    );
  };

  const renderView = () => {
    let dataArray = key;
    if (!dataArray || dataArray.length === 0) {
      return;
    }
    let len = dataArray.length;
    let views = [];
    for (let i = 0, l = len; i < l; i += 2) {
      views.push(
        <View key={i}>
          <View style={styles.item}>
            {renderCheckBox(dataArray[i], i)}
            {i + 1 < len && renderCheckBox(dataArray[i + 1], i + 1)}
          </View>
          <View style={styles.line} />
        </View>,
      );
    }
    return views;
  };

  return (
    <View>
      {navigationBar()}
      <ScrollView>{renderView()}</ScrollView>
    </View>
  );
};

const mapPopularStateToProps = state => ({
  language: state.language,
});
const mapPopularDispatchToProps = dispatch => ({
  onLoadLanguage: flag => dispatch(actions.onLoadLanguage(flag)),
});

export default connect(
  mapPopularStateToProps,
  mapPopularDispatchToProps,
)(CustomKeyPage);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flexDirection: 'row',
  },
  line: {
    flex: 1,
    height: 0.3,
    backgroundColor: 'darkgray',
  },
});
