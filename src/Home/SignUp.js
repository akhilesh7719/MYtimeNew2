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
import axios from 'axios';

const signUpPostAPI = () => {
  axios
    .post('https://api.mytime.co.in/users', {
      data: {
        // email: 'test22@yopmail.com',
        // phone_number: "9988776655",
        // password: 'Ppppp@1234',
        email: mail,
        phone_number: contact,
        password: password,
      },
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
};

const SignUp = ({navigation}) => {
  const [mail, setMail] = useState('');
  const [contact, setContact] = useState('');
  const [password, setPassword] = useState('');

  // const signUpPostAPI = () => {
  //   let res = axios
  //     .post('https://api.mytime.co.in/users', {
  //       data: {
  //         email: mail,
  //         phone_number: contact,
  //         password: password,
  //       },
  //     })
  //     .then(function (response) {
  //       console.log('jdhbfjhjueghfrejdbgfhgf', res);
  //       if (response.data) {
  //         navigation.navigate('ProfilePage');
  //       }
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });
  // };
  const signUpPostAPI = async () => {
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
        alert('Sign successfully');
        
        navigation.navigate('ProfilePage');
      } else {
        const errorData = await response.json();
        console.error('Response error:', errorData);
        alert('Please fill the all field', response.errors);
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
              //autoCapitalize='none'
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
        {/* <TouchableOpacity style={styles.forgotViewStyle}>
          <Text style={styles.forgot}>Forgot Password?</Text>
        </TouchableOpacity> */}
      </View>

      <View style={styles.buttonViewStyle}>
        <TouchableOpacity
          style={styles.button}
          //onPress={() => navigation.navigate('ProfilePage')}
          onPress={() => signUpPostAPI()}>
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
    //backgroundColor: 'red',
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
});
