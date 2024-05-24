import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
const Header = ({onPress}) => {
  return (
    <View
      style={{
        height: 40,
        width: 380,
        flexDirection: 'row',
        alignSelf: 'center',
       // justifyContent:'center',
        alignItems:'center'
      }}>
      <TouchableOpacity
        onPress={onPress}
        style={{
          height: 40,
          width: 55,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 18, width: 22}}
          source={require('../assets/leftArrow.png')}
        />
      </TouchableOpacity>
      <View
        style={{
          height: 40,
          width: 120,
          justifyContent: 'center',
        }}>
        <Text style={{fontSize: 15, fontWeight: '700', color: '#A9A9A9'}}>
          MyTime
        </Text>
      </View>
      <View
        style={{
          height: 40,
          width: 90,
          flexDirection: 'row',
          position: 'absolute',
          right: 0,
          //backgroundColor:'red'
        }}>
        <View
          style={{
            height: 40,
            width: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 18, width: 18}}
            source={require('../assets/profile.png')}
          />
        </View>
        <View
          style={{
            height: 40,
            width: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 18, width: 18}}
            source={require('../assets/bell.png')}
          />
        </View>
        <View
          style={{
            height: 40,
            width: 25,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{height: 18, width: 18}}
            source={require('../assets/setting.png')}
          />
        </View>
      </View>
    </View>
  );
};

export default Header;
