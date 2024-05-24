import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';

const VerifyOtp = ({navigation, route}) => {
  const [otp, setOtp] = useState('');
  const [verifyToken, setVerifyToken] = useState('');

  useEffect(() => {
    console.log('@@@@@@@@@@@@@=============', route.params.SendOtpToken);
    if (route.params && route.params.SendOtpToken) {
      setVerifyToken(route.params.SendOtpToken);
    }
  }, [route.params]);

  const validateOtp = () => {
    if (otp.length === 0) {
      Alert.alert('Validation Error', 'OTP cannot be empty');
      return false;
    } else if (otp.length !== 4) {
      Alert.alert('Validation Error', 'OTP must be 4 digits long');
      return false;
    }
    return true;
  };

  const postRequest = async () => {
    if (!validateOtp()) {
      return;
    }

    const apiUrl = 'https://api.mytime.co.in/forget_passwords/verify_otp';
    const data = {data: {otp: otp}};

    try {
      console.log('jhhghhhg-----------------------', data);
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
      } else {
        const errorData = await response.json();
        console.error('Response error:=======', errorData.errors.otp);
        Alert.alert('Error', `${errorData.errors.otp}`);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong while setting up the request');
    }
  };

  return (
    <View style={styles.Container}>
      <View style={styles.verificationViewStyle}>
        <Text style={styles.forgotTextStyle}>Verification</Text>
      </View>
      <View style={styles.willSendOtpViewStyle}>
        <Text style={styles.willSendOtpTextStyle}>
          We have sent you a One Time Password
        </Text>
      </View>
      <View style={styles.willSendOtpViewStyle}>
        <Text style={styles.willSendOtpTextStyle}>on your Email</Text>
      </View>

      <View style={styles.inputMainViewStyle}>
        <View style={styles.otpViewStyle}>
          <View style={styles.otpTextInputStyle}>
            <TextInput
              placeholder="Please Enter OTP"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setOtp(text)}
              value={otp}
              keyboardType="numeric"
              maxLength={6}
            />
          </View>
        </View>
      </View>

      <View style={styles.verifyOtpButtonStyle}>
        <TouchableOpacity style={styles.button} onPress={postRequest}>
          <Text style={styles.verifyTextStyle}>Verify</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VerifyOtp;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
  },
  otpViewStyle: {
    width: 324,
    height: 45,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
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
  verifyTextStyle: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: '#747474',
    fontWeight: 'bold',
  },
  otpTextInputStyle: {
    height: 40,
    width: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputMainViewStyle: {
    height: 100,
    width: 330,
    alignSelf: 'center',
    marginTop: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  verifyOtpButtonStyle: {
    height: 150,
    width: 330,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  verificationViewStyle: {
    height: 70,
    width: 350,
    marginTop: 200,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotTextStyle: {
    color: '#646464',
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  willSendOtpViewStyle: {
    height: 20,
    width: 350,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  willSendOtpTextStyle: {
    color: '#646464',
    fontSize: 16,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
});
