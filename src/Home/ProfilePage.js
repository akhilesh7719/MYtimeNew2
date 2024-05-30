import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import {useFocusEffect} from '@react-navigation/native';

const ProfilePage = ({navigation}) => {
  const [token, setToken] = useState('');
  const [image, setImage] = useState('');
  const [picUri, setPicUri] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [userId, setUserId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getToken();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      if (token && userId) {
        getShowProfileApiData();
      }
    }, [token, userId])
  );

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
    const userId = await AsyncStorage.getItem('USER_ID');
    setUserId(userId);
  };

  const handleEditProfileApi = async () => {
    setLoading(true);
    const url = `https://api.mytime.co.in/users/${userId}`;
    const formData = new FormData();
    formData.append('data[full_name]', fullName);
    formData.append('data[about_us]', aboutUs);
    if (picUri) {
      formData.append('data[profile_image]', {
        uri: picUri.uri,
        type: picUri.type,
        name: picUri.name,
      });
    }

    try {
      const response = await axios.patch(url, formData, {
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', JSON.stringify(response.data));
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getShowProfileApiData = async () => {
    setLoading(true);
    const url = `https://api.mytime.co.in/users/${userId}`;
    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log('Show Profile data:', data);
      setFullName(data?.data?.full_name || '');
      setAboutUs(data?.data?.about_us || '');
      setImage(data?.data?.profile_image?.url || null);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    } finally {
      setLoading(false);
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      const output = {
        uri: image.path,
        type: image.mime,
        name: image.filename || 'profile.jpg',
      };
      setPicUri(output);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilePicViewMainStyle}>
        <View style={styles.profilePicViewInnerStyle}>
          <Image
            source={image ? {uri: image} : require('../assets/profile.png')}
            style={{height: 135, width: 135, borderRadius: 100}}
          />
        </View>
        <TouchableOpacity
          onPress={() => openGallery()}
          style={styles.plusViewStyle}>
          <Image
            source={require('../assets/plusProfile.png')}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.fullNameViewStyle}>
        <TextInput
          style={styles.fullNameInputStyle}
          placeholder={'Full Name'}
          placeholderTextColor="#515151"
          onChangeText={text => setFullName(text)}
          value={fullName}
        />
        <TouchableOpacity style={styles.editIconViewStyle}>
          <Image
            source={require('../assets/edit.png')}
            style={{height: 24, width: 24}}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.aboutViewStyle}>
        <TextInput
          style={styles.aboutInputStyle}
          placeholder={'About Us'}
          placeholderTextColor="#515151"
          multiline={true}
          onChangeText={text => setAboutUs(text)}
          value={aboutUs}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleEditProfileApi()}
        style={styles.nextButtonStyle}>
        <Text style={styles.nextTextStyle}>Next</Text>
      </TouchableOpacity>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#B8DCF4" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default ProfilePage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  profilePicViewMainStyle: {
    marginTop: 55,
    height: 120,
    width: 350,
    marginLeft: 15,
    justifyContent: 'center',
  },
  profilePicViewInnerStyle: {
    height: 110,
    width: 110,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'red',
  },
  plusViewStyle: {
    height: 30,
    width: 30,
    position: 'absolute',
    left: 95,
    top: 65,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullNameViewStyle: {
    height: 50,
    width: 350,
    marginLeft: 15,
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D3CFCF',
  },
  fullNameInputStyle: {
    height: 50,
    width: 260,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  editIconViewStyle: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutViewStyle: {
    height: 150,
    width: 350,
    marginLeft: 15,
    marginTop: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D3CFCF',
  },
  aboutInputStyle: {
    height: 90,
    width: 280,
    marginLeft: 20,
  },
  nextButtonStyle: {
    height: 45,
    width: 144,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 70,
  },
  nextTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
