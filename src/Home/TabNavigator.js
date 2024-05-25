import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {StyleSheet, View, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import HomeScreen from './HomeScreen';
import ContactList from './ContactList';
import PostThird from './PostThird';
import ImagePicker from 'react-native-image-crop-picker';
import Profile from './Profile';

const Tab = createBottomTabNavigator();

const HomeNavigatorRoutes = props => {
  const [image, setImage] = useState('');
  const navigation = useNavigation();

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('@@@@@@@@@ImagePath=====', image);
      setImage(image.path);
      navigation.navigate('PostThird', {imagePath: image.path});
    });
  };

  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        tabBarStyle: {
          height: 70,
          borderRadius: 20,
          marginHorizontal: 15,
          bottom: 10,
        },
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size, focused}) => (
            <View style={styles.notificationIconContainer}>
              <Image
                style={{height: 20, width: 20, resizeMode: 'contain'}}
                source={require('../assets/Home.png')}
              />
            </View>
          ),
          headerShown: false,
          headerStyle: {backgroundColor: '#ebecf0'},
        }}
      />
      <Tab.Screen
        name="PostThird"
        component={PostThird}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size, focused}) => (
            <TouchableOpacity
              onPress={() => openGallery()}
              style={styles.notificationIconContainer}>
              <Image
                style={{height: 20, width: 20, resizeMethod: 'contain'}}
                source={require('../assets/plus.png')}
              />
            </TouchableOpacity>
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="ContactList"
        component={ContactList}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({color, size, focused}) => (
            <View style={styles.notificationIconContainer}>
              <Image
                style={{height: 20, width: 20, resizeMethod: 'contain'}}
                source={require('../assets/person.png')}
              />
            </View>
          ),
          headerShown: false,
          headerStyle: {backgroundColor: '#ebecf0'},
        }}
      />
    </Tab.Navigator>
  );
};

export default HomeNavigatorRoutes;

const styles = StyleSheet.create({
  notificationIconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
});
