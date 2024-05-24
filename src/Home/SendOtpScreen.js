import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';

const SendOtpScreen = ({navigation, route}) => {
  const [mail, setMail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleEmailChange = (text) => {
    setMail(text);
    if (text === '') {
      setIsValidEmail(false);
      setErrorMessage('Email is required');
    } else if (!validateEmail(text)) {
      setIsValidEmail(false);
      setErrorMessage('Enter a valid email address');
    } else {
      setIsValidEmail(true);
      setErrorMessage('');
    }
  };

  const postForgetPasswordAPI = () => {
    if (!isValidEmail || mail === '') {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    axios
      .post('https://api.mytime.co.in/forget_passwords/send_otp', {
        data: {
          email: mail,
        },
      })
      .then(async function (response) {
        let res = response;
        console.log('@@@@@@@@@', res.data.token);
        navigation.navigate("VerifyOtp",{SendOtpToken :res.data.token })
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <View style={styles.Container}>
      <View style={styles.forgotViewStyle}>
        <Text style={styles.forgotTextStyle}>Forget Password</Text>
      </View>

      <View style={styles.inputMainViewStyle}>
        <View style={[styles.emailViewStyle, !isValidEmail && {borderColor: 'red'}]}>
          <View style={styles.emailIconStyle}>
            <Image
              style={{height: 20, width: 30}}
              source={require('../assets/email.png')}
            />
          </View>
          <View style={styles.emailTextInputStyle}>
            <TextInput
              placeholder="Enter your mail address"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={handleEmailChange}
              value={mail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/check.png')}
            />
          </View>
        </View>
        {!isValidEmail && <Text style={styles.errorText}>{errorMessage}</Text>}
      </View>

      <View style={styles.sendOtpButtonStyle}>
        <TouchableOpacity
          style={[styles.button, !isValidEmail && {backgroundColor: '#f0f0f0'}]}
          onPress={postForgetPasswordAPI}
          disabled={!isValidEmail}
        >
          <Text style={styles.Login}>Send OTP</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SendOtpScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
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

  forgot: {
    fontSize: 20,
    fontFamily: 'Open Sans',
    color: '#A4A1A1',
    fontWeight: 'bold',
  },
  button: {
    width: 324,
    height: 45,
    marginTop: 40,
    color: '#747474',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#D9D9D9',
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

  emailIconStyle: {
    height: 40,
    width: 45,
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emailTextInputStyle: {
    height: 40,
    width: 200,
    marginLeft: 15,
    justifyContent: 'center',
  },
  rigntIconViewStyle: {
    height: 40,
    width: 40,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputMainViewStyle: {
    height: 150,
    width: 330,
    alignSelf: 'center',
    marginTop: 60,
  },

  sendOtpButtonStyle: {
    height: 150,
    width: 330,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  forgotViewStyle: {
    height: 100,
    width: 150,
    marginTop: 105,
    marginLeft: 35,
  },
  forgotTextStyle: {
    color: '#646464',
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    marginLeft: 10,
  },
});
