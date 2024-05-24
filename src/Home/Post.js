import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    console.log('Post page Token=====', tokens);
    setToken(tokens);
  };

  const handleUpdatePostRequest = async () => {
    const url = 'https://api.mytime.co.in/posts/8'; // Replace with your API endpoint

    // Create a new FormData object
    const formData = new FormData();
    formData.append('data[caption]', 'Apple');
    formData.append('data[status]', 'email');

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        body: formData,
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data', // This line is optional in some cases
        },
      });

      const result = await response.json();
      console.log('Response:=======', result);
    } catch (error) {
      console.error('Error:==========', error);
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.headerContainer}>
        <View style={styles.headerIcons}>
          <Icon
            style={styles.profileIcon}
            name="user-alt"
            size={15}
            color="#000000"
          />
          <Icon name="bell" size={25} color="#000000" />
        </View>
      </View>
      <View style={styles.secondContainer}>
        <View style={styles.nameLoc}>
          <Text style={styles.profileName}>Full Name</Text>
          <View style={styles.iconLoc}>
            <Icon
              style={styles.locIcon}
              name="map-marker-alt"
              size={20}
              color="#C1C1C1"
            />
            <Text style={styles.locName}>Indore</Text>
          </View>
        </View>
        <View style={styles.profilePic}>
          <Image
            style={styles.profilePicImage}
            source={{
              uri: 'https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1714731969~exp=1714735569~hmac=2a477c9bd95a4b6844fae745b472c7b0c973ae532cdd9d60c25c69c6da8e3b09&w=900',
            }}
          />
          <Text style={styles.profileAbout}>
            A Small Family Run Business Offering Freshly Mode Bread, Cokes,
            Breakfast Rolls Sandwiches,Check My Page For Daily Updates. Serving
            New Palasia Indore
          </Text>
        </View>
        <View style={styles.recents}>
          <Text style={styles.recentsText}>Recents</Text>
          <View style={styles.recentsPics}>
            <Image style={styles.picType1} />
          </View>
          <TouchableOpacity
            onPress={() => handleUpdatePostRequest()}
            style={styles.button}></TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  headerContainer: {
    //  backgroundColor:'green',
    height: 30.7,
    width: 80,
    alignSelf: 'flex-end',
  },
  headerIcons: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  profileIcon: {
    backgroundColor: '#D9D9D9',
    padding: 6,
    borderRadius: 100,
  },
  secondContainer: {
    flex: 1,
    // backgroundColor: 'green',
    marginHorizontal: 5,
    marginTop: 10,
  },
  nameLoc: {
    //  backgroundColor:'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    // padding:10
  },
  iconLoc: {
    flexDirection: 'row',
    // backgroundColor:'yellow',
  },
  profileName: {
    height: 24,
    width: 81,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#515151',
  },
  locIcon: {
    height: 22,
    width: 18,
    color: '#000000',
    // borderWidth:2
  },
  locName: {
    width: 52,
    height: 24,
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  profilePic: {
    backgroundColor: 'green',
    marginTop: 15,
    width: 351,
    height: 243,
  },
  profilePicImage: {
    width: 351,
    height: 243,
  },
  profileAbout: {
    width: 312,
    height: 98,
  },
  profileAbout: {
    // backgroundColor:'green',
    marginTop: -90,
    fontSize: 13,
    fontWeight: '400',
    COLOR: '#FFFFFF',
    lineHeight: 19.5,
    textAlign: 'justify',
    padding: 20,
  },
  recents: {
    marginTop: 10,
    flex: 1,
    //  backgroundColor:'green'
  },
  recentsText: {
    // backgroundColor:'yellow',
    color: '#000000',
    width: 64,
    height: 24,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  recentsPics: {
    flexDirection: 'row',

    justifyContent: 'space-between',
  },
  picType1: {
    width: 170,
    height: 155,
    backgroundColor: '#D9D9D9',
  },
  picType2: {
    marginTop: 10,
    width: '100%',
    height: 43,
    backgroundColor: '#D9D9D9',
  },
  button: {
    width: '100%',
    height: 43,
    backgroundColor: 'red',
  },
});
