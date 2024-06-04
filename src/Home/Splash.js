import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      temp();
    }, 2000);
  }, []);

  const temp = async () => {
    let status = await AsyncStorage.getItem('TOKEN');
    if (status != null) {
      navigation.navigate('HomeNavigatorRoutes');
    } else {
      navigation.navigate('Login');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.mytimeTextStyle}>MyTime</Text>
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
