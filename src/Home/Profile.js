import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
      <View style={styles.headerMainViewStyle}>
        <View style={styles.headerLeftMainViewStyle}>
          <TouchableOpacity
            onPress={() => handleGoBack()}
            style={styles.leftArrowButtonStyle}>
            <Image
              style={{height: 18, width: 22}}
              source={require('../assets/leftArrow.png')}
            />
          </TouchableOpacity>
          <View style={styles.mytimeViewStyle}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#A9A9A9'}}>
              MyTime
            </Text>
          </View>
        </View>
        <View style={styles.rightSideIconMainViewStyle}>
          <TouchableOpacity
            onPress={() => navigation.navigate('EditProfile')}
            style={styles.rightSideButtonStyle}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/profile.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={styles.rightSideButtonStyle}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/bell.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Setting')}
            style={styles.rightSideButtonStyle}>
            <Image
              style={{height: 15, width: 15}}
              source={require('../assets/setting.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.headerTextViewStyle}>
        <View
          style={{
            height: 35,
            width: 150,
          }}>
          <Text style={styles.mainText}>{fullName}</Text>
        </View>
        <View
          style={{
            height: 35,
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
    marginTop: 20,
    //height: 30,
    width: 352,
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

  headerMainViewStyle: {
    height: 50,
    width: 352,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerLeftMainViewStyle: {
    height: 50,
    width: 150,
    flexDirection: 'row',
  },
  leftArrowButtonStyle: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mytimeViewStyle: {
    height: 50,
    width: 90,
    justifyContent: 'center',
  },
  rightSideIconMainViewStyle: {
    height: 50,
    width: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  rightSideButtonStyle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
