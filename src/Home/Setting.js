import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

const Setting = () => {
  return (
    <SafeAreaView style={styles.container}>
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
          <TouchableOpacity style={styles.deleteButtonStyle}>
            <Text style={styles.deleteTextStyle}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButtonStyle}>
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
    marginTop: 70,
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
    width: 400,
    marginLeft: 29,
    marginTop: 20,
    justifyContent: 'space-between',
  },
  notificationViewStyle: {
    height: 50,
    width: 400,
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
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggalImgStyle: {
    height: 20,
    width: 45,
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
    width: 250,
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
    width: 320,
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
});
