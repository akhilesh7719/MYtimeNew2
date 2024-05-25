import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './Header';
import {SafeAreaView} from 'react-native-safe-area-context';

const Profile = ({navigation, route}) => {
  const phoneNumber = '123-456-7890';
  const [token, setToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [homeId, setHomeId] = useState('');

  const handlePress = () => {
    Linking.openURL(`tel:${phoneNumber}`).catch(err =>
      console.error('Error opening phone dialer', err),
    );
  };

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
  };

  useEffect(() => {
    getToken();
    if (route.params?.item?.user?.id) {
      setHomeId(route.params.item.user.id);
    }
  }, [route.params]);

  useEffect(() => {
    if (token && homeId) {
      viewProfile(token);
    }
  }, [token, homeId]);

  const viewProfile = async tokens => {
    console.log('@@@@@@@@@@temyyyyyyyy=========', homeId);
    const url = `https://api.mytime.co.in/users/${homeId}`;
    fetch(url, {
      method: 'GET',
      headers: {
        token: tokens,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(function (data) {
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

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header onPress={() => handleGoBack()} />
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
            Breakfast Rolls Sandwiches, Check My Page For Daily Updates. Serving
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
            <TouchableOpacity onPress={() => handlePress()}>
              <Text style={styles.mainText}>contact me</Text>
            </TouchableOpacity>
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
