import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const Setting = ({onPress}) => {
  const [token, setToken] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    console.log('@@@@@@@@@@ delete Token ============', tokens);
    setToken(tokens);
  };

  const deleteUserApi = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      const url = 'https://api.mytime.co.in/users/1';

      const response = await fetch(url, {
        method: 'DELETE',
        headers: {
          token: token,
          'Content-Type': 'application/json',
        },
      });

      console.log('Request Headers:', JSON.stringify(response.headers));

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          `Network response was not ok: ${response.status} - ${errorData.message}`,
        );
      }

      const data = await response.json();
      console.log('@@@@@@@@@@ delete ============== ', data);
      alert(`${data.message}`); // Show success message
    } catch (error) {
      console.error('Error:', error);
      alert(`${error.message}`); // Show error message
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        style={styles.cross}>
        <Image
          style={{height: 15, width: 15}}
          source={require('../assets/cross.png')}
        />
      </TouchableOpacity>
      <View style={styles.settingViewStyle}>
        <Text style={styles.settingTextStyle}>Settings</Text>
      </View>
      <View style={styles.upperViewStyle}>
        <View style={styles.notificationViewStyle}>
          <View style={styles.roundViewStyle}>
            <View style={styles.roundViewInnerStyle}></View>
          </View>
          <View style={styles.notificationTextViewStyle}>
            <Text style={styles.notificationTextStyle}>Notification</Text>
          </View>
          <View style={styles.togalViewStyle}>
            <Image
              style={styles.toggalImgStyle}
              resizeMode="contain"
              source={require('../assets/toggals.png')}
            />
          </View>
        </View>
        <View style={styles.notificationViewStyle}>
          <View style={styles.roundViewStyle}>
            <View style={styles.roundViewInnerStyle}></View>
          </View>
          <View style={styles.notificationTextViewStyle}>
            <Text style={styles.notificationTextStyle}>Privacy Policy</Text>
          </View>
        </View>
        <View style={styles.notificationViewStyle}>
          <View style={styles.roundViewStyle}>
            <View style={styles.roundViewInnerStyle}></View>
          </View>
          <View style={styles.notificationTextViewStyle}>
            <Text style={styles.notificationTextStyle}>Change Password</Text>
          </View>
        </View>
        <View style={styles.contactUsViewStyle}>
          <Text style={styles.contactUsTextStyle}>Contact Us</Text>
        </View>
        <View style={styles.notificationViewStyle}>
          <View style={styles.roundViewStyle}>
            <View style={styles.roundViewInnerStyle}></View>
          </View>
          <View style={styles.notificationTextViewStyle}>
            <Text style={styles.notificationTextStyle}>Mail Address</Text>
          </View>
        </View>
        <View style={styles.notificationViewStyle}>
          <View style={styles.roundViewStyle}>
            <View style={styles.roundViewInnerStyle}></View>
          </View>
          <View style={styles.notificationTextViewStyle}>
            <Text style={styles.notificationTextStyle}>Contact Number</Text>
          </View>
        </View>
        <View style={styles.bottomButtonViewStyle}>
          <TouchableOpacity
            onPress={() => deleteUserApi()}
            style={styles.deleteButtonStyle}>
            <Text style={styles.deleteTextStyle}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              Alert.alert(
                'Logout',
                'Are you sure? You want to logout?',
                [
                  {
                    text: 'Cancel',
                    onPress: () => {
                      return null;
                    },
                  },
                  {
                    text: 'Confirm',
                    onPress: async () => {
                      await AsyncStorage.removeItem('TOKEN');
                      navigation.replace('Login');
                    },
                  },
                ],
                {cancelable: false},
              );
            }}
            style={styles.deleteButtonStyle}>
            <Text style={styles.deleteTextStyle}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Setting;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingViewStyle: {
    height: 60,
    width: 250,
    justifyContent: 'center',
    marginLeft: 29,
    //marginTop: 20,
  },
  settingTextStyle: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Poppins',
    lineHeight: 22.5,
  },
  upperViewStyle: {
    height: 160,
    width: 342,
    marginLeft: 20,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  notificationViewStyle: {
    height: 50,
    width: 342,
    alignItems: 'center',
    flexDirection: 'row',
  },
  notificationTextViewStyle: {
    height: 50,
    width: 220,
    justifyContent: 'center',
  },
  notificationTextStyle: {
    fontSize: 15,
    color: '#000000',
    fontWeight: '400',
    fontFamily: 'Poppins',
    lineHeight: 22.5,
  },
  togalViewStyle: {
    height: 50,
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggalImgStyle: {
    height: 20,
    width: 38,
  },
  privacyViewStyle: {
    height: 50,
    width: 350,
    justifyContent: 'center',
  },
  roundViewStyle: {
    height: 50,
    width: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  roundViewInnerStyle: {
    height: 30,
    width: 30,
    backgroundColor: '#D9D9D9',
    borderRadius: 20,
  },
  contactUsViewStyle: {
    height: 60,
    width: 220,
    justifyContent: 'center',
    marginLeft: 60,
    marginTop: 15,
  },
  contactUsTextStyle: {
    fontSize: 20,
    color: '#5C5C5C',
    fontWeight: '600',
    fontFamily: 'Poppins',
    lineHeight: 22.5,
  },
  bottomButtonViewStyle: {
    height: 250,
    width: 300,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  deleteButtonStyle: {
    height: 45,
    width: 120,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  deleteTextStyle: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
    fontFamily: 'poppins',
    lineHeight: 22.5,
  },
  cross: {
    //backgroundColor:'green',
    width: 30,
    height: 22,
    alignSelf: 'flex-end',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20,
  },
});
