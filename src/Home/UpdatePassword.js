import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {SafeAreaView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatePassword = ({navigation}) => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorOld, setErrorOld] = useState(false);
  const [errorNew, setErrorNew] = useState(false);
  const [errorConfirm, setErrorConfirm] = useState(false);

  const [mail, setMail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [verifyToken, setVerifyToken] = useState('');

  useEffect(() => {
    getToken();
    console.log('@@@@@@@@@@@@@=============');
  }, []);

  const getToken = async () => {
    try {
      const token = await AsyncStorage.getItem('TOKEN');
      if (token !== null) {
        console.log('Token retrieved successfully:=====', token);
        setVerifyToken(token)
        return token;
      } else {
        console.log('No token found.');
        return null;
      }
    } catch (error) {
      console.error('Error retrieving token:', error);
      return null;
    }
  };

  const updatePasswordPostApi = async () => {
    const apiUrl = 'https://api.mytime.co.in/reset_password';
    const data = {
      data: {
        old_password: 'Password@1234',
        new_password: 'Password@12345',
        confirm_new_password: 'Password@12345',
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          token: verifyToken,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:===========', responseData);
        Alert.alert('Success', 'OTP verified successfully');
        navigation.navigate('ResetPassword', {
          verifyOtpScreenOtp: responseData.token,
        });
        // Navigate to the next screen or perform any action after successful verification
      } else {
        const errorData = await response.json();
        console.error('Response error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const submit = () => {
    // if (!oldPassword || !newPassword|| !confirmPassword) {
    //   !oldPassword && setErrorOld(true);
    //   !newPassword && setErrorNew(true);
    //   !confirmPassword && setErrorConfirm(true);
    // }
    // else {
    //   setErrorOld(false);
    //   setErrorNew(false);
    //   setErrorConfirm(false);
    // }
    // if (mail && contact && password) {
    //   // backend entry
    // }
  };

  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.welcomeStyleView}>
        <View style={styles.welcomeIconStyleView}>
          {/* <Image
              source={require('./src/assets/key.png')}
              size={15}
              style={styles.welcomeIcon}
            /> */}
        </View>
        <View style={styles.welcomeStyleView}>
          <Text style={styles.welcome}>Update Password </Text>
        </View>
        <View style={styles.welcomeWarningStyleView}>
          <Text style={styles.welcomeWarning}>Must be atleast 8 character</Text>
        </View>
      </View>
      <View style={styles.inoutMainViewStyle}>
        <View style={styles.textStyleView}>
          <Text style={styles.text}>Old Password</Text>
        </View>
        <View style={styles.passwordViewStyle}>
          {/* <View style={styles.emailIconStyle}>
            <Image
            style={{height: 20, width: 30}}
            source={require('../assets/email.png')}
          /> 
            </View> */}
          <View style={styles.passwordTextInputStyle}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setOldPassword(text)}
              value={oldPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            {/* <Image
                style={{height: 25, width: 25}}
                source={require('./src/assets/eye.png')}
              /> */}
          </View>
          {/* {errorOld ? (
              <Text style={styles.errorText}>Enter valid Password !</Text>
            ) : null} */}
        </View>
        <View style={styles.textStyleView}>
          <Text style={styles.text}>New Password</Text>
        </View>
        <View style={styles.passwordViewStyle}>
          {/* <Image
            style={{height: 25, width: 25}}
            source={require('./src/Assests/eye.png')}
          /> */}

          <View style={styles.passwordTextInputStyle}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setNewPassword(text)}
              value={newPassword}
              keyboardType="numeric"
              secureTextEntry
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            {/* <Image
                style={{height: 25, width: 25}}
                source={require('./src/assets/eye.png')}
              /> */}
          </View>
        </View>
        <View style={styles.textStyleView}>
          <Text style={styles.text}>Confirm Password</Text>
        </View>
        <View style={styles.passwordViewStyle}>
          {/* <View style={styles.emailIconStyle}>
              <Image
            style={{height: 25, width: 25}}
            source={require('./src/Assests/eye.png')}
          />
            </View> */}
          {/* {errorNew ? (
              <Text style={styles.errorText}>Enter valid Password !</Text>
            ) : null} */}
          <View style={styles.passwordTextInputStyle}>
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setConfirmPassword(text)}
              value={confirmPassword}
              secureTextEntry
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            {/* <Image
                style={{height: 25, width: 25}}
                source={require('./src/assets/eye.png')}
              /> */}
          </View>
        </View>
        {/* {errorConfirm ? (
              <Text style={styles.errorText}>Enter valid Password !</Text>
            ) : null} */}
        {/* <TouchableOpacity style={styles.forgotViewStyle}>
            <Text style={styles.forgot}>Forgot Password?</Text>
          </TouchableOpacity> */}
      </View>

      <View style={styles.buttonViewStyle}>
        <TouchableOpacity
          style={styles.reset}
          onPress={() => updatePasswordPostApi()}
          // enable={!errorOld || !errorNew|| !errorConfirm && oldPassword === newPassword === confirmPassword}
        >
          <Text style={styles.Reset}>Reset Password</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.login}
          onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.Login}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UpdatePassword;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  welcomeStyleView: {
    backgroundColor: 'yellow',
    height: 100,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  welcomeIconStyleView: {
    padding: 10,
    height: 30,
    width: 30,
    // backgroundColor:'blue',
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 4,
    // color:'#646464',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  welcomeIcon: {
    color: '#646464',
  },
  welcomeStyleView: {
    // backgroundColor: 'green',
    // fontFamily: 'poppins',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  welcome: {
    fontWeight: '600',
    fontSize: 20,
    color: '#646464',
  },
  welcomeWarningStyleView: {
    // backgroundColor: 'green',
    // marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  welcomeWarning: {
    fontSize: 15,
    color: '#646464',
  },
  emailViewStyle: {
    width: 324,
    height: 45,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  input2: {
    width: 324,
    height: 45,
    marginTop: 20,
    //left:50,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgot: {
    fontSize: 20,
    fontFamily: 'Open Sans',
    color: '#A4A1A1',
    fontWeight: 'bold',
  },

  orViewStyle: {
    width: 324,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  Login: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: '#747474',
    fontWeight: 'bold',
  },
  orTextStyle: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
  },

  emailIconStyle: {
    height: 40,
    width: 45,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inoutMainViewStyle: {
    // backgroundColor: 'green',
    // height: 200,
    // width: 330,
    alignSelf: 'center',
    //  marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordViewStyle: {
    // backgroundColor:'orange',
    width: '90%',
    height: 45,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  textStyleView: {
    color: 'black',
    // backgroundColor: 'yellow',
    // height:35,
    width: '100%',
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 15,
    fontWeight: '600',
    color: '#646464',
    padding: 10,
  },
  passwordTextInputStyle: {
    // backgroundColor: 'orange',
    height: 40,
    width: 200,
    justifyContent: 'center',
    alignItems: 'flex-start',
    // alignSelf: 'center',
    color: 'black',
  },
  rigntIconViewStyle: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  contactViewStyle: {
    marginTop: 35,
    width: 324,
    height: 45,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  forgotViewStyle: {
    marginTop: 40,
    width: 180,
    height: 45,
    //backgroundColor: 'green',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonViewStyle: {
    // backgroundColor: 'blue',
    // marginTop:60,
    height: 100,
    width: '90%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  reset: {
    width: '100%',
    height: 45,
    // marginTop: 40,

    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'black',
  },
  Reset: {
    color: 'white',
  },
  login: {
    width: '100%',
    height: 45,
    color: '#747474',
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 10,
    // borderColor: '#A4A3A3',
    // borderWidth: 1,
  },
  input: {
    color: 'black',
  },
});
