import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';

const HomeScreen = ({onPress}) => {
  const [token, setToken] = useState('');
  const [postData, showPostData] = useState('');
  const [postImage, setPostImage] = useState('');
  const [selectedButton, setSelectedButton] = useState('button1');
  const navigation = useNavigation();

  const getAllShowApiData = async tokens => {
    const url = 'https://api.mytime.co.in/posts';
    fetch(url, {
      method: 'GET',
      headers: {
        token: tokens,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log('@@@@@@@@@@ ApiData ============== ', data);
        showPostData(data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getToken();
  }, []);
  const handleGoBack = () => {
    navigation.goBack();
  };

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    console.log('@@@@@@@@@@ ShowPost Token ============', tokens);
    setToken(tokens);
    getAllShowApiData(tokens);
  };

  // const profileNNabigatttion = () => {
  //   navigation.navigate('Profile');
  // };

  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
  };
  const productItem = item => {
    console.log('@@@@@@@@@@@@HomeScreenItem======', item.user.id);
    return (
      <View style={styles.ImageMainView}>
        <TouchableOpacity
          style={{
            height: 35,
            width: 150,
            //backgroundColor: 'green',
            justifyContent: 'center',
            //alignItems: 'center',
          }}>
          <Text style={styles.fullNameTextStyle}>{item.user.full_name}</Text>
        </TouchableOpacity>
        <View style={styles.contactListItemNameView}>
          <Image
            style={{width: 350, height: 240}}
            source={{uri: item.images[0]?.url}}
          />
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {item: item})}
          style={{
            height: 35,
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 3,
            borderColor: 'black',
          }}>
          <Text style={styles.contactListItemText}>View Profile</Text>
        </TouchableOpacity>
        <View
          onPress={() => navigation.navigate('Profile', {item: item})}
          style={{
            height: 60,
            width: 350,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text>A small family run business offering freshly mode </Text>
          <Text>bread, cokes, breakfast rolls sandwiches,Check my </Text>
          <Text>page for daily updates. serving new palasia indore</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.MainContainerView}>
      <View style={styles.headerMainViewStyle}>
        <View style={styles.headerLeftMainViewStyle}>
          <TouchableOpacity
            onPress={() => handleGoBack()}
            style={styles.leftArrowButtonStyle}>
            <Image
              style={{height: 18, width: 22}}
              source={require('../assets/leftArrow.png')}
            />
          </TouchableOpacity>
          <View style={styles.mytimeViewStyle}>
            <Text style={{fontSize: 15, fontWeight: '700', color: '#A9A9A9'}}>
              MyTime
            </Text>
          </View>
        </View>
        <View style={styles.rightSideIconMainViewStyle}>
          <TouchableOpacity
            onPress={() => navigation.navigate('ProfilePage')}
            style={styles.rightSideButtonStyle}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/profile.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Notification')}
            style={styles.rightSideButtonStyle}>
            <Image
              style={{height: 18, width: 18}}
              source={require('../assets/bell.png')}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Setting')}
            style={styles.rightSideButtonStyle}>
            <Image
              style={{height: 15, width: 15}}
              source={require('../assets/setting.png')}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.serchMainViewStyle}>
        <View style={styles.serchIconViewStyle}>
          <Image
            style={{height: 14, width: 12}}
            source={require('../assets/search.png')}
          />
        </View>
        <View style={styles.textInputViewStyle}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="makeup artist , yoga instructor near me "
          />
        </View>
      </View>
      <View style={{height: 45, width: '100%', marginTop: 10}}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'button1'
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress('button1')}>
            <Text style={styles.buttonText}>For you</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'button2'
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress('button2')}>
            <Text style={styles.buttonText}>Entertainment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'button3'
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress('button3')}>
            <Text style={styles.buttonText}>Today’s events</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 'button4'
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress('button4')}>
            <Text style={styles.buttonText}>Business</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.contactListView}>
        <FlatList
          data={postData}
          renderItem={({item}) => productItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  MainContainerView: {
    flex: 1,
  },

  headerIconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactListView: {
    width: '100%',
  },
  ImageMainView: {
    marginTop: 10,
    //backgroundColor: 'red',
    width: 350,
    height: 370,
    alignSelf: 'center',
  },
  contactListItemImageNameView: {},
  contactListItemImageView: {
    height: 50,
    width: 50,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactListItemImage: {
    height: 48,
    width: 48,
    borderRadius: 50,
    lineHeight: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactListItemNameView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactListItemName: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
  contactListItemTextView: {
    backgroundColor: '#B9DDF3',
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    borderRadius: 10,
    height: 40,
    alignSelf: 'center',
  },
  contactListItemText: {
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
  },
  fullNameTextStyle: {
    fontWeight: '600',
    color: '#545454',
    fontSize: 16,
    lineHeight: 24,
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
  container: {
    flex: 1,
    marginTop: 50,
  },
  button: {
    height: 32,
    width: 91,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 11,
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#B8DCF4',
  },
  inactiveButton: {
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#545454',
    fontWeight: '400',
    fontSize: 10,
    fontFamily: 'poppins',
  },
  headerMainViewStyle: {
    height: 60,
    width: 352,
    //backgroundColor: 'red',
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerLeftMainViewStyle: {
    height: 50,
    width: 150,
    //backgroundColor: 'green',
    flexDirection: 'row',
  },
  leftArrowButtonStyle: {
    height: 50,
    width: 50,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mytimeViewStyle: {
    height: 50,
    width: 90,
    //backgroundColor: 'pink',
    justifyContent: 'center',
  },
  rightSideIconMainViewStyle: {
    height: 50,
    width: 150,
    //backgroundColor: 'pink',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  rightSideButtonStyle: {
    height: 30,
    width: 30,
    //backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serchMainViewStyle: {
    height: 40,
    width: 350,
    //backgroundColor: 'red',
    alignSelf: 'center',
    flexDirection: 'row',
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  serchIconViewStyle: {
    height: 40,
    width: 40,
    //backgroundColor: 'green',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputViewStyle: {
    height: 40,
    width: 240,
    //backgroundColor: 'blue',
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    width: 270,
    //backgroundColor: 'pink',
  },
});
