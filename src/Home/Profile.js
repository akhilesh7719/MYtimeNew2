import {
  Animated,
  Button,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const Profile = ({navigation}) => {
  const [location, setLocation] = useState('');
  const [token, setToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [profileImg, setProfileImg] = useState('');

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
    viewProfile(tokens);
  };

  useEffect(() => {
    getToken();
  }, []);

  const viewProfile = async tokens => {
    const url = 'https://api.mytime.co.in/users/1';
    fetch(url, {
      method: 'GET',
      headers: {
        token: tokens,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log('@@@@@@@@@@ ShowProfileApiData ========== ', data);
        let fullName = data.data.full_name;
        let aboutUs = data.data.about_us;
        let profilePic = data.data.profile_image.url;
        setFullName(fullName);
        setAboutUs(aboutUs);
        setProfileImg(profilePic);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View
      style={{
        height: 40,
        width: 410,
        flexDirection: 'row',
        alignSelf: 'center',
      }}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={{
          height: 40,
          width: 40,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          style={{height: 18, width: 18}}
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
        }}>
        <View
          style={{
            height: 40,
            width: 30,
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
            width: 30,
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
            width: 30,

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
      <View style={styles.headerTextViewStyle}>
        <View
          style={{
            height: 30,
            width: 150,
          }}>
          <Text style={styles.mainText}>{fullName}</Text>
        </View>
        <View
          style={{
            height: 30,
            width: 110,
            marginLeft: 50,
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 30,
              width: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/location.png')}
            />
          </View>
          <Text style={styles.mainText}>Indore</Text>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.profilePic}>
          <Image style={styles.profilePicImage} source={{uri: profileImg}} />
          <Text style={styles.profileAbout}>
            A Small Family Run Business Offering Freshly Mode Bread, Cokes,
            Breakfast Rolls Sandwiches,Check My Page For Daily Updates. Serving
            New Palasia Indore
          </Text>
        </View>

        <View style={styles.headerTextViewStyle}>
          <View
            style={{
              height: 30,
              width: 110,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 30,
                width: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 18, width: 18}}
                source={require('../assets/contactwo.png')}
              />
            </View>
            <Text style={styles.mainText}>contact me</Text>
          </View>
          <View
            style={{
              height: 30,
              width: 110,
              flexDirection: 'row',
            }}>
            <View
              style={{
                height: 30,
                width: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{height: 18, width: 18}}
                source={require('../assets/location.png')}
              />
            </View>
            <Text style={styles.mainText}>Indore</Text>
          </View>
        </View>
        {/* <View style={styles.iconTextIcon}>
          <View style={styles.leftIcon}>
            <Icon name="map-marker-alt" size={25} color="#C1C1C1" />
          </View>
          <View style={styles.textInput}>
            <TextInput
              style={styles.input}
              placeholder="Add Your Location"
              placeholderTextColor={'#C1C1C1'}
              value={location}
              onChangeText={text => setLocation(text)}
            />
          </View>
          <View style={styles.rightIcon}>
            <Icon name="map-marker" size={25} color="white" />
          </View>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerTextViewStyle: {
    marginTop: 58,
    height: 30,
    width: 380,
    marginLeft: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  mainText: {
    color: '#515151',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 30,
  },
  container2: {
    alignItems: 'center',
  },
  profilePic: {
    alignItems: 'center',

    height: 318,
    width: 351,
  },
  profilePicImage: {
    marginTop: 30,
    alignItems: 'center',
    height: 318,
    width: 351,
    opacity: 100,
  },
  profileAbout: {
    alignItems: 'center',
    height: 98,
    width: 312,
    marginTop: -80,
    color: 'black',
    alignSelf: 'center',
    textAlign: 'justify',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#FFFFFF',
  },

  iconTextIcon: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftIcon: {
    left: 45,
    marginTop: 90,
  },
  textInput: {
    marginTop: 90,
  },
  rightIcon: {
    right: 45,
    marginTop: 90,
  },
  input: {
    color: 'black',
    borderColor: '#C1C1C1',
    borderWidth: 2,
    width: 350,
    height: 45,
    textAlign: 'center',
    borderRadius: 20,
  },

  backIconButtonStyle: {
    height: 20,
    width: 20,
    marginTop: 50,
    marginLeft: 30,
  },
});
