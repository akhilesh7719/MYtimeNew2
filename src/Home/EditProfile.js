import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';

const EditProfile = ({navigation}) => {
  
  const [token, setToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [profile, setProfile] = useState('');

  const getToken = async () => {
    try {
      const tokens = await AsyncStorage.getItem('TOKEN');
      setToken(tokens);
      const userId = await AsyncStorage.getItem('USER_ID');
      setUserId(userId);
    } catch (error) {
      console.error('Error retrieving token or userId', error);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  useEffect(() => {
    if (token && userId) {
      getShowProfileApiData(token, userId);
    }
  }, [token, userId]);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const getShowProfileApiData = async (token, userId) => {
    console.log("@@@@@@ userId ======", userId);
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
      console.log('@@@@@@@@@@ Show Profile data ==============', data.data.full_name);
      setFullName(data?.data?.full_name);
      setAboutUs(data?.data?.about_us);
      setProfile(data?.data?.profile_image?.url);
    } catch (error) {
      console.error('Error fetching profile data=====', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.mainContainerView}>
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
            onPress={() => navigation.navigate('ProfilePage')}
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

      <View style={styles.secondContainerNameLocView}>
        <View style={styles.nameLocView}>
          <Text style={styles.profileName}>{fullName}</Text>
        </View>
        <View style={styles.profilePicTextView}>
          <View style={styles.profilePicImageView}>
            <Image style={{height: 243, width: 350}} source={{uri: profile}} />
          </View>
          <View style={styles.profilePicIconView}>
            <View style={styles.profilePicIcon}>
              <TouchableOpacity
                style={styles.editButtonStyle}
                onPress={() => navigation.navigate('ProfilePage')}>
                <Image
                  style={{height: 18, width: 18}}
                  source={require('../assets/editIcon.png')}
                />
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButtonStyle}>
                <Image
                  style={{height: 18, width: 18}}
                  source={require('../assets/delete.png')}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileAboutView}>
            <Text style={styles.profileAbout}>{aboutUs}</Text>
          </View>
        </View>

        <View
          style={{
            height: 150,
            width: 352,
            //backgroundColor: 'blue',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <View
            style={{height: 150, width: 170, backgroundColor: 'gray'}}></View>
          <View
            style={{height: 150, width: 170, backgroundColor: 'gray'}}></View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainerView: {
    flex: 1,
    padding: 10,
  },
  headerContainerView: {
    height: 30.7,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  headerIconsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#D9D9D9',
    padding: 6,
    borderRadius: 100,
  },
  secondContainerNameLocView: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'green',
  },
  nameLocView: {
    //backgroundColor: 'grey',
    width: '100%',
    marginLeft: 40,
  },

  profileName: {
    height: 24,
    // width: 81,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#515151',
  },

  profilePicTextView: {
    //  backgroundColor: 'green',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
    height: 243,
    position: 'relative',
  },
  profilePicIconView: {
    position: 'absolute',
    right: 20,
  },
  profilePicIcon: {
    //backgroundColor: 'yellow',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // alignSelf:'center'
  },

  profilePicImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 243,
    // backgroundColor: 'yellow',
  },
  profilePicImage: {
    width: '100%',
    height: 243,
  },
  profileAboutView: {
    //backgroundColor: 'green',
    //alignSelf: 'center',
    width: 350,
    height: 50,
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  profileAbout: {
    fontSize: 13,
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: 19.5,
  },
  recents: {
    marginTop: 10,
    flex: 1,
    //  backgroundColor:'green'
  },
  headerMainViewStyle: {
    height: 50,
    width: 352,
    //backgroundColor: 'green',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerLeftMainViewStyle: {
    height: 50,
    width: 150,
    //backgroundColor: 'green',
    flexDirection: 'row',
  },
  leftArrowButtonStyle: {
    height: 50,
    width: 50,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mytimeViewStyle: {
    height: 50,
    width: 90,
    //backgroundColor: 'pink',
    justifyContent: 'center',
  },
  rightSideIconMainViewStyle: {
    height: 50,
    width: 150,
    //backgroundColor: 'pink',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  rightSideButtonStyle: {
    height: 30,
    width: 30,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButtonStyle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonStyle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
