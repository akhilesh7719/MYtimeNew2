import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
//import massaging from '@react-native-firebase/messaging';

const Login = ({navigation, route}) => {
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');
  const [newTT, setNeTT] = useState('');

  const [mailError, setMailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const login = () => {
    if (!mail || !password) {
      setMailError(true);
      setPasswordError(true);
    } else {
      setMailError(false);
      setPasswordError(false);
    }
  };

  const validateEmail = email => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = password => {
    return password.length >= 6;
  };

  const handleEmailChange = text => {
    setMail(text);
    if (validateEmail(text)) {
      setMailError('');
    } else {
      setMailError('Invalid email address');
    }
  };

  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    let token = await massaging().getToken();
    console.log(token);
  };

  // const postLoginAPI = () => {
  //   axios
  //     .post('https://api.mytime.co.in/auth/login', {
  //       data: {
  //         //email: mail,
  //         //password: password,
  //         email: 'test666@gmail.com',
  //         password: 'Password@12345',
  //       },
  //     })
  //     .then(async function (response) {
  //       console.log('@@@@@@@@@@------', response.data.data);
  //       let TToken = response.data.token;
  //       let userData= response.data.data
  //       setNeTT(TToken);
  //       await AsyncStorage.setItem('TOKEN', TToken);
  //       navigation.navigate('HomeScreen');
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };

  const postLoginAPI = async () => {
    const apiUrl = 'https://api.mytime.co.in/auth/login';
    const data = {
      data: {
        //email: mail,
        //password: password,
        email: 'test666@gmail.com',
        password: 'Password@12345',
      },
    };

    try {
      console.log('jhhghhhg-----------------------', data);
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
        alert('Login successfully');
        let TToken = responseData.token;
        let userData = response.data;
        setNeTT(TToken);
        await AsyncStorage.setItem('TOKEN', TToken);
        //navigation.navigate('HomeNavigatorRoutes');
        navigation.navigate('HomeNavigatorRoutes');
      } else {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        alert('Invalid Email/Phone Number', response.errors);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'Something went wrong while setting up the request');
    }
  };
  return (
    <View style={styles.view}>
      <View style={styles.welcomeViewStyle}>
        <Text style={styles.welcomeTextStyle}>welcome back </Text>
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

        <View style={styles.passwordViewStyle}>
          <View style={styles.emailIconStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/key.png')}
            />
          </View>
          <View style={styles.emailTextInputStyle}>
            <TextInput
              placeholder="Enter Password"
              placeholderTextColor={'#A4A1A1'}
              onChangeText={text => setPassword(text)}
              value={password}
              //secureTextEntry
            />
          </View>
          <View style={styles.rigntIconViewStyle}>
            <Image
              style={{height: 25, width: 25}}
              source={require('../assets/eye.png')}
            />
          </View>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('SendOtpScreen')}
          style={styles.forgotViewStyle}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.buttonViewStyle}>
        <TouchableOpacity
          style={styles.button}
          // onPress={() => navigation.navigate('Profile')}>
          onPress={() => postLoginAPI()}>
          <Text style={styles.Login}>Login</Text>
        </TouchableOpacity>
        <View style={styles.orViewStyle}>
          <Text style={styles.or}>Or</Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={styles.signup}>
          <Text style={styles.Login}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  view: {
    flex: 1,
    //justifyContent:'center',
    //alignItems:'center',
    backgroundColor: '#FFFFFF',
  },
  welcome: {
    width: 190,
    height: 110,
    fontFamily: 'poppins',
    fontWeight: 'bold',
    fontSize: 42,
    color: '#646464',
    marginTop: 105,
    left: 50,
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
    //backgroundColor: 'red',
    marginTop: 10,
  },
  Login: {
    fontFamily: 'Open Sans',
    fontSize: 14,
    color: '#747474',
    fontWeight: 'bold',
  },
  or: {
    width: 20,
    height: 20,
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Open Sans',
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
  rigntIconViewStyle: {
    height: 40,
    width: 40,
    marginLeft: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inoutMainViewStyle: {
    //backgroundColor: 'red',
    height: 250,
    width: 330,
    alignSelf: 'center',
    marginTop: 60,
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
  forgotViewStyle: {
    marginTop: 40,
    width: 180,
    height: 45,
    //backgroundColor: 'green',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  buttonViewStyle: {
    //backgroundColor: 'blue',
    height: 200,
    width: 330,
    alignSelf: 'center',
    justifyContent: 'center',
    //marginTop: 20,
  },
  welcomeViewStyle: {
    height: 100,
    width: 150,
    marginTop: 105,
    marginLeft: 35,
  },
  welcomeTextStyle: {
    color: '#646464',
    fontSize: 32,
    fontFamily: 'Poppins',
    fontWeight: '500',
  },
});
