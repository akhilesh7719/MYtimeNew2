import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import React, {useState} from 'react';

const SignUp = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [contactError, setContactError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateEmail = email => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const validateContact = contact => {
    const re = /^[0-9]{10}$/;
    return re.test(String(contact));
  };

  const validatePassword = password => {
    // Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const signUpPostAPI = async () => {
    let valid = true;

    if (!validateEmail(mail)) {
      setEmailError('Please enter a valid email address.');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!validateContact(contact)) {
      setContactError('Please enter a valid 10-digit contact number.');
      valid = false;
    } else {
      setContactError('');
    }

    if (!validatePassword(password)) {
      setPasswordError(
        'Password must be at least 8 characters long and include one uppercase letter, one lowercase letter, one number, and one special character.',
      );
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!valid) {
      return;
    }

    const apiUrl = 'https://api.mytime.co.in/users';
    const data = {
      data: {
        email: mail,
        phone_number: contact,
        password: password,
      },
    };

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log('Response:===========', responseData);
        Alert.alert('Success', 'Sign up successful');
        navigation.navigate('ProfilePage');
      } else {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        Alert.alert('Error', 'Something went wrong');
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong while setting up the request');
    }
  };

  return (
    <View style={styles.view}>
      <View style={styles.createAccountViewStyle}>
        <Text style={styles.createAccountText}>Create Account </Text>
      </View>
      <View style={styles.inoutMainViewStyle}>
        <View style={styles.emailViewStyle}>
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
              onChangeText={text => setMail(text)}
              value={mail}
              autoCapitalize="none"
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/check.png')}
            />
          </View>
        </View>
        {emailError ? <Text style={styles.error}>{emailError}</Text> : null}

        <View style={styles.contactViewStyle}>
          <View style={styles.emailIconStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/phone.png')}
            />
          </View>
          <View style={styles.emailTextInputStyle}>
            <TextInput
              placeholder="Contact Number"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setContact(text)}
              value={contact}
              keyboardType="numeric"
            />
          </View>
        </View>
        {contactError ? (
          <Text style={styles.error}>{contactError}</Text>
        ) : null}

        <View style={styles.passwordViewStyle}>
          <View style={styles.emailIconStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/key.png')}
            />
          </View>
          <View style={styles.contactTextInputStyle}>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setPassword(text)}
              value={password}
              secureTextEntry
              autoCapitalize="none"
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/eye.png')}
            />
          </View>
        </View>
        {passwordError ? (
          <Text style={styles.error}>{passwordError}</Text>
        ) : null}
      </View>

      <View style={styles.buttonViewStyle}>
        <TouchableOpacity style={styles.button} onPress={signUpPostAPI}>
          <Text style={styles.Login}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.orViewStyle}>
          <Text style={styles.orTextStyle}>Or</Text>
        </View>

        <TouchableOpacity
          style={styles.signup}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.Login}>Log In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  createAccountViewStyle: {
    height: 100,
    width: 135,
    marginTop: 105,
    marginLeft: 35,
  },
  createAccountText: {
    color: '#646464',
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  inoutMainViewStyle: {
    height: 200,
    width: 330,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'space-around',
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
  passwordViewStyle: {
    marginTop: 35,
    width: 324,
    height: 45,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
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
  contactTextInputStyle: {
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
  buttonViewStyle: {
    height: 200,
    width: 330,
    alignSelf: 'center',
    justifyContent: 'center',
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
  orTextStyle: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Open Sans',
    fontWeight: 'bold',
  },
  signup: {
    width: 324,
    height: 45,
    color: '#747474',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#A4A3A3',
    borderWidth: 1,
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
  contactTextInputStyle: {
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
  inoutMainViewStyle: {
    height: 200,
    width: 330,
    alignSelf: 'center',
    marginTop: 60,
    justifyContent: 'space-around',
  },
  passwordViewStyle: {
    marginTop: 35,
    width: 324,
    height: 45,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    borderWidth: 2,
    flexDirection: 'row',
    alignItems: 'center',
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
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonViewStyle: {
    height: 200,
    width: 330,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  createAccountViewStyle: {
    height: 100,
    width: 135,
    marginTop: 105,
    marginLeft: 35,
  },
  createAccountText: {
    color: '#646464',
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
  error: {
    color: 'red',
    marginTop: 30,
    marginLeft: 20,
  },
});
