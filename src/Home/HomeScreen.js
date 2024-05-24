import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Image,
  SafeAreaView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from './Header';

const HomeScreen = ({navigation}) => {
  const [token, setToken] = useState('');

  const getCategoriesApiData = async () => {
    const url = 'https://api.mytime.co.in/categories';
    fetch(url, {
      method: 'GET',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log('@@@@@@@@@@ getCategoriesApiData ========== ', data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getToken();
    getCategoriesApiData();
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
    console.log('@@@@@@@@@@ Home page Screen token ========== ', setToken);
  };

  const handlePress = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={style.container}>
      <Header onPress={handlePress} />
      <View style={style.upperViewStyle}>
        <View style={style.searchBuutinViewStyle}>
          <Image
            style={{height: 12, width: 10}}
            source={require('../assets/search.png')}
          />
        </View>
        <TextInput
          style={style.textInputStyle}
          placeholder="Makeup Artist, Yoga Instructor Near Me"></TextInput>
      </View>
      <ScrollView
        style={{flexGrow: 0}}
        showsVerticalScrollIndicator={false}
        horizontal={true}>
        <TouchableOpacity style={style.buttonStyle}>
          <Text style={style.buttonTextStyle}>For You</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonStyle}>
          <Text style={style.buttonTextStyle}>Entertainment</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonStyle}>
          <Text style={style.buttonTextStyle}>Today Event</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.buttonStyle}>
          <Text style={style.buttonTextStyle}>Business</Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={style.fullNameViewStyle}>
        <Text style={style.fullNameTextStyle}>Full Name</Text>
      </View>

      <View style={style.profilePic}>
        <Image
          style={style.profilePicImage}
          source={{
            uri: 'https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1714731969~exp=1714735569~hmac=2a477c9bd95a4b6844fae745b472c7b0c973ae532cdd9d60c25c69c6da8e3b09&w=900',
          }}
        />
      </View>

      <TouchableOpacity
        onPress={() => navigation.navigate('Profile')}
        style={{
          height: 30,
          width: 358,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          marginTop: 8,
        }}>
        <Text style={style.ViewProfileTextStyle}>View Profile</Text>
      </TouchableOpacity>
      <View
        style={{
          backgroundColor: '#000',
          height: 2,
          width: 358,
          alignSelf: 'center',
        }}></View>
      <Text style={style.profileAbout}>
        A Small Family Run Business Offering Freshly Mode Bread, Cokes,
        Breakfast Rolls Sandwiches,Check My Page For Daily Updates. Serving New
        Palasia Indore
      </Text>
    </SafeAreaView>
  );
};

export default HomeScreen;

const style = StyleSheet.create({
  container: {
    flex: 1,
    //alignItems:'center',
    //justifyContent:'center'
  },
  upperViewStyle: {
    height: 45,
    width: 370,
    backgroundColor: '#d7dbd8',
    marginTop: 15,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 15,
  },
  searchBuutinViewStyle: {
    height: 35,
    width: 40,
    // backgroundColor: 'yellow',
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputStyle: {
    height: 35,
    width: 240,
    // backgroundColor: 'yellow',
    // marginLeft: 5,
  },
  buttonStyle: {
    height: 35,
    width: 100,
    backgroundColor: '#B8DCF4',
    marginLeft: 15,
    marginTop: 10,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonTextStyle: {
    fontSize: 12,
    color: '#757876',
  },
  fullNameViewStyle: {
    height: 40,
    width: 200,
    // backgroundColor: '#d7dbd8',
    marginTop: 10,
    marginLeft: 15,
  },
  fullNameTextStyle: {
    fontSize: 18,
    color: '#484a49',
    fontWeight: '500',
  },
  profilePic: {
    // alignItems: 'center',
    // backgroundColor:'green',
    // marginLeft:12,
    height: 318,
    width: 351,
    alignSelf: 'center',
  },
  profilePicImage: {
    height: 320,
    width: 351,
    opacity: 10,
  },
  profileAbout: {
    marginTop: 10,
    width: 350,
    alignSelf: 'center',
    //textAlign: 'justify',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19,
    color: '#000',
  },
  ViewProfileTextStyle: {
    fontSize: 14,
    color: '#000',
  },
  backIconButtonStyle: {
    height: 20,
    width: 20,
    //marginTop: 50,
    marginLeft: 30,
  },
});
