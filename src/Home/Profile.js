import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Linking,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Profile = ({navigation, route}) => {
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const phoneNumber = '123-456-7890';
  const [token, setToken] = useState('');
  const [fullName, setFullName] = useState('');
  const [aboutUs, setAboutUs] = useState('');
  const [profileImg, setProfileImg] = useState('');
  const [homeId, setHomeId] = useState('');
  const [mobile, setMobile] = useState('');
  const [loading, setLoading] = useState(false);
  const [postData, setPostData] = useState([]);

  const handlePress = () => {
    Linking.openURL(`tel:${mobile}`).catch(err =>
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
    setLoading(true);
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
        let fullName = data?.data?.full_name;
        let aboutUs = data?.data?.about_us;
        let profilePic = data?.data?.profile_image.url;
        let mobile = data?.data?.phone_number;
        setFullName(fullName);
        setAboutUs(aboutUs);
        setProfileImg(profilePic);
        setMobile(mobile);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const postItemData = item => {
    console.log('@@@@@@@@item=======', item);
    return (
      <View style={styles.flatListMainView}>
        <Image style={{height: 20, width: 20}} source={{uri: item.url}} />
      </View>
    );
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
            width: 120,
          }}>
          <Text style={styles.mainText}>{fullName}</Text>
        </View>
        <View style={styles.contactViewStyle}>
          <View style={styles.contactImgViewStyle}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/contactwo.png')}
            />
          </View>
          <TouchableOpacity onPress={() => handlePress()}>
            <Text style={styles.mainText}>contact me</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.container2}>
        <View style={styles.profilePic}>
          <Image style={styles.profilePicImage} source={{uri: profileImg}} />
          <View style={styles.aboutViewStyle}>
            <Text style={styles.profileAbout}>{aboutUs}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contactListView}>
        <FlatList
          data={postData}
          numColumns={2}
          renderItem={({item}) => postItemData(item)}
          keyExtractor={item => item.id}
        />
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#B8DCF4" />
        </View>
      )}
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
    height: 230,
    width: 320,
    alignSelf: 'center',
  },
  profilePic: {
    alignItems: 'center',
    height: 318,
    width: 351,
  },
  profilePicImage: {
    height: 150,
    width: 150,
    borderRadius: 100,
  },
  profileAbout: {
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 19.5,
    color: '#515151',
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
  contactViewStyle: {
    height: 35,
    width: 130,
    marginLeft: 50,
    flexDirection: 'row',
  },
  contactImgViewStyle: {
    height: 35,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aboutViewStyle: {
    height: 60,
    marginTop: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
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
  contactListView: {
    width: '100%',
    alignItems: 'center',
  },
  flatListMainView: {
    height: 120,
    width: 170,
    backgroundColor: 'red',
    marginTop: 5,
    marginLeft: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
