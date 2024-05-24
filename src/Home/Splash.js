import {View, Text, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000);
  }, []);
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
  mytimeTextStyle:{
    fontSize: 30,
    fontWeight:'bold',
    
  }
});
