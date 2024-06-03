import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import Splash from './src/Home/Splash';
import Login from './src/Home/Login';
import SignUp from './src/Home/SignUp';
import Profile from './src/Home/Profile';
import HomeScreen from './src/Home/HomeScreen';
import Setting from './src/Home/Setting';
import Notification from './src/Home/Notification';
import PostSecond from './src/Home/PostSecond';
import Search from './src/Home/Search';
import Post from './src/Home/Post';
import ProfilePage from './src/Home/ProfilePage';
import PostThird from './src/Home/PostThird';
import EditProfile from './src/Home/EditProfile';
import SearchOne from './src/Home/SearchOne';
import SendOtpScreen from './src/Home/SendOtpScreen';
import VerifyOtp from './src/Home/VerifyOtp';
import UpdatePassword from './src/Home/UpdatePassword';
import ResetPassword from './src/Home/ResetPassword';
import CreatePost from './src/Home/CreatePost';
import Header from './src/Home/Header';
import HomeNavigatorRoutes from './src/Home/TabNavigator';
import ContactList from './src/Home/ContactList';
import ShowPost from './src/Home/ShowPost';
import Share from './src/Home/Share'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        {/* <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{headerShown: false}}
        /> */}
        <Stack.Screen
          name="Setting"
          component={Setting}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostSecond"
          component={PostSecond}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Search"
          component={Search}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ProfilePage"
          component={ProfilePage}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="PostThird"
          component={PostThird}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchOne"
          component={SearchOne}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SendOtpScreen"
          component={SendOtpScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOtp"
          component={VerifyOtp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UpdatePassword"
          component={UpdatePassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ResetPassword"
          component={ResetPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CreatePost"
          component={CreatePost}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Header"
          component={Header}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeNavigatorRoutes"
          component={HomeNavigatorRoutes}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ContactList"
          component={ContactList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ShowPost"
          component={ShowPost}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Share"
          component={Share}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
