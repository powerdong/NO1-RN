/*
 * @Author: Lambda
 * @Begin: 2020-06-20 09:21:11
 * @Update: 2020-06-20 10:03:52
 * @Update log: 更新日志
 */
import {BackHandler} from 'react-native';
import {useEffect} from 'react';

// export default class BackPressComponent {
//   constructor(props) {
//     this._hardwareBackPress = this.onHardwareBackPress.bind(this);
//     this.props = props;
//   }

//   componentDidMount() {
//     if (this.props.backPress) {
//       BackHandler.addEventListener(
//         'hardwareBackPress',
//         this._hardwareBackPress,
//       );
//     }
//   }

//   componentWillUnmount() {
//     if (this.props.backPress) {
//       BackHandler.removeEventListener(
//         'hardwareBackPress',
//         this._hardwareBackPress,
//       );
//     }
//   }
//   onHardwareBackPress(e) {
//     return this.props.backPress(e);
//   }
// }

const useBackPress = backPress => {
  useEffect(() => {
    if (backPress) {
      BackHandler.addEventListener('hardwareBackPress', backPress);
    }
    return () => {
      if (backPress) {
        BackHandler.removeEventListener('hardwareBackPress', backPress);
      }
    };
  }, [backPress]);
};

export default useBackPress;
