/*
 * @Author: Lambda
 * @Begin: 2020-06-17 16:47:29
 * @Update: 2020-06-17 17:15:09
 * @Update log: 更新日志
 */
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {View, Text, TouchableOpacity, Image} from 'react-native';

const PopularItem = ({item, onSelect}) => {
  if (!item || !item.owner) {
    return null;
  }
  let favoriteButton = (
    <TouchableOpacity
      style={{padding: 6}}
      onPress={() => {}}
      underlayColor={'transparent'}>
      <FontAwesome name="star-o" size={26} style={{color: 'red'}} />
    </TouchableOpacity>
  );
  return (
    <TouchableOpacity onPress={onSelect}>
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          marginLeft: 5,
          marginRight: 5,
          marginVertical: 3,
          borderColor: '#ddd',
          borderWidth: 0.5,
          borderRadius: 2,
          shadowColor: 'gray',
          shadowOffset: {width: 0.5, height: 0.5},
          shadowOpacity: 0.4,
          shadowRadius: 1,
          elevation: 2,
        }}>
        <Text
          style={{
            fontSize: 16,
            marginBottom: 2,
            color: '#212121',
          }}>
          {item.full_name}
        </Text>
        <Text
          style={{
            fontSize: 14,
            marginBottom: 2,
            color: '#757575',
          }}>
          {item.description}
        </Text>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <Text>Author:</Text>
            <Image
              style={{height: 22, width: 22}}
              source={{uri: item.owner.avatar_url}}
            />
          </View>
          <View style={{justifyContent: 'space-between', flexDirection: 'row'}}>
            <Text>Start:</Text>
            <Text>{item.stargazers_count}</Text>
          </View>
          {favoriteButton}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PopularItem;
