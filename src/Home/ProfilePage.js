import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';

const ProfilePage = ({navigation, route}) => {
  const [token, setToken] = useState('');
  const [image, setImage] = useState('');
  const [picUri, setPicUri] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutUs, setAboutUs] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
  };

  const handleEditProfileApi = async () => {
    const url = 'https://api.mytime.co.in/users/1'; 
    const formData = new FormData();
    formData.append('data[full_name]', fullName);
    formData.append('data[about_us]', aboutUs);
    formData.append('data[profile_image]', picUri);

    try {
      const response = await axios.patch(url, formData, {
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data', 
        },
      });
      console.log('Response:=======', JSON.stringify(response));
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error:==========', error);
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      setImage(image.path);
      let output = {
        uri: image.path,
        type: image.mime,
        name: image.filename,
      };
      setPicUri(output);
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profilePicViewMainStyle}>
        <View
          style={styles.profilePicViewInnerStyle}>
          <Image
            source={ image? {uri: image}:require('../assets/profile.png') }
            style={{height: 135, width: 135, borderRadius: 100}}
          />
        </View>
        <TouchableOpacity onPress={() => openGallery()} style={styles.plusViewStyle}>
          <Image
            source={require('../assets/plusProfile.png')}
            style={{height: 25, width: 25}}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.fullNameViewStyle}>
        <TextInput
          style={styles.fullNameInputStyle}
          placeholder={"Full Name"}
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
          onChangeText={text => setAboutUs(text)}
          value={aboutUs}
        />
      </View>
      <TouchableOpacity
        onPress={() => handleEditProfileApi()}
        style={styles.nextButtonStyle}>
        <Text style={styles.nextTextStyle}>Next</Text>
      </TouchableOpacity>
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
    //alignItems: 'center',
    justifyContent: 'center',
    //borderRadius: 100,
    // borderWidth: 2,
    // borderColor: 'gray',
    // flexDirection:'row'
    //backgroundColor:'red'
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
    // backgroundColor: 'green',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#D3CFCF',
  },
  fullNameInputStyle: {
    height: 50,
    width: 260,
    // backgroundColor: 'pink',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  editIconViewStyle: {
    height: 50,
    width: 50,
    // backgroundColor: 'pink',
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
    height: 50,
    width: 300,
    //backgroundColor: 'pink',
    // justifyContent: 'center',
    // alignItems: 'center',
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
  deleteTextStyle: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'poppins',
    lineHeight: 22.5,
  },
});
