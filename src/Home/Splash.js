import {View, Text, StyleSheet,PermissionsAndroid, Platform, Button} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Geolocation from 'react-native-geolocation-service';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const Splash = ({navigation}) => {
  // useEffect(() => {
  //   setTimeout(() => {
  //     temp();
  //   }, 2000);
  // }, []);

  // const temp = async () => {
  //   let status = await AsyncStorage.getItem('TOKEN');
  //   //let Tokenstatus = await AsyncStorage.getItem('Token');

  //   console.log('Status', status);

  //   if (status != null) {
  //     navigation.navigate('HomeNavigatorRoutes');
  //   } else {
  //     navigation.navigate('Login');
  //   }
  // };

  const [location, setLocation] = useState(null);
  const [permission, setPermission] = useState(null);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const permissionStatus = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
      setPermission(permissionStatus);
      if (permissionStatus === RESULTS.GRANTED) {
        getCurrentLocation();
      }
    } else {
      const permissionStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      setPermission(permissionStatus);
      if (permissionStatus === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      }
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        setLocation(position);
      },
      (error) => {
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };


  return (
    <View style={styles.container}>
      <Text style={styles.mytimeTextStyle}>MyTime</Text>
      {location ? (
        <Text>Latitude: {location.coords.latitude}, Longitude: {location.coords.longitude}</Text>
      ) : (
        <Text>Fetching Location...</Text>
      )}
      <Button title="Get Current Location" onPress={getCurrentLocation} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mytimeTextStyle: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
