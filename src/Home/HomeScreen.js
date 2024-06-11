import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
  Alert,
} from 'react-native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  useNavigation,
  useFocusEffect,
  useIsFocused,
} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {TextInput} from 'react-native-gesture-handler';
import Video from 'react-native-video';

const HomeScreen = ({onPress}) => {
  const [token, setToken] = useState('');
  const [postData, setPostData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedButton, setSelectedButton] = useState('button1');
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const [searchText, setSetsearchText] = useState('');

  const getAllShowApiData = async tokens => {
    setLoading(true);
    const url = 'https://api.mytime.co.in/posts';
    fetch(url, {
      method: 'GET',
      headers: {
        token: tokens,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log(
          '@@@@@@@@@@ ApiData ==============',
          data.near_me_public_posts,
        );
        setPostData(data?.near_me_public_posts);
        setFilteredData(data?.near_me_public_posts);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const backAction = () => {
      if (isFocused) {
        Alert.alert('Stop', 'Are you sure you want to go back?', [
          {
            text: 'Cancel',
            onPress: () => null,
            style: 'cancel',
          },
          {
            text: 'YES',
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [isFocused]);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
    getAllShowApiData(tokens);
  };

  useFocusEffect(
    useCallback(() => {
      getToken();
    }, []),
  );

  const handleButtonPress = buttonName => {
    setSelectedButton(buttonName);
    filterData(buttonName)
  };

  const filterData = (category_id) => {
    setSetsearchText('');
    setLoading(true);
    const url = `https://api.mytime.co.in/posts?category_id=${category_id}`;
    fetch(url, {
      method: 'GET',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        setFilteredData(data.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  const productItem = item => {
    return (
      <View style={styles.ImageMainView}>
        <View style={{height: 30, width: 120, justifyContent: 'center'}}>
          <Text style={styles.fullNameTextStyle}>{item.user.full_name}</Text>
        </View>
        <View style={styles.contactListItemNameView}>
          <ScrollView
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}>
            {item.images.map((item, index) => {
              let media_url = item.url;
              let mediaType = media_url.split('.');
              let mediaLength = mediaType.length;
              let mediaFormat = mediaType[mediaLength - 1];
              return (
                <View key={index} style={styles.mediaContainer}>
                  {mediaFormat == 'mp4' ? (
                    <Video
                      source={{uri: item.url}}
                      muted={true}
                      paused={true}
                      controls={true}
                      resizeMode="cover"
                      style={{width: 340, height: 340}}
                    />
                  ) : (
                    <Image
                      style={{width: 370, height: 360}}
                      source={{uri: item.url}}
                      resizeMode="cover"
                    />
                  )}
                </View>
              );
            })}
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => navigation.navigate('Profile', {item: item})}
          style={styles.viewProfileContainerStyle}>
          <Text style={styles.contactListItemText}>View Profile</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 30,
            width: 300,
            justifyContent: 'center',
            //alignItems: 'center',
            //backgroundColor:"yellow"
          }}>
          <Text>{item.caption}</Text>
        </View>
      </View>
    );
  };

  const getSearchData = async () => {
    setSetsearchText('');
    setLoading(true);
    const url = `https://api.mytime.co.in/posts/search?query=${searchText}`;
    fetch(url, {
      method: 'GET',
      headers: {
        token: token,
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(data => {
        setFilteredData(data.data);
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  };

  return (
    <SafeAreaView style={styles.MainContainerView}>
      <View style={styles.headerMainViewStyle}>
        <View style={styles.headerLeftMainViewStyle}>
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
          <TouchableOpacity onPress={getSearchData}>
            <Image
              style={{height: 14, width: 12}}
              source={require('../assets/search.png')}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.textInputViewStyle}>
          <TextInput
            style={styles.textInputStyle}
            placeholder="makeup artist, yoga instructor near me"
            onChangeText={text => setSetsearchText(text)}
            value={searchText}
          />
        </View>
      </View>
      <View style={{height: 45, width: '100%', marginTop: 10}}>
        <ScrollView horizontal={true}>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 1
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => getAllShowApiData(token)}>
            <Text style={styles.buttonText}>For you</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 2
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress(2)}>
            <Text style={styles.buttonText}>Entertainment</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 3
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress(3)}>
            <Text style={styles.buttonText}>Food</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 4
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress(4)}>
            <Text style={styles.buttonText}>Lifestyle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.button,
              selectedButton === 5
                ? styles.activeButton
                : styles.inactiveButton,
            ]}
            onPress={() => handleButtonPress(5)}>
            <Text style={styles.buttonText}>Business</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.contactListView}>
        <FlatList
          data={filteredData}
          renderItem={({item}) => productItem(item)}
          keyExtractor={item => item.id}
        />
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#B8DCF4" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  MainContainerView: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerMainViewStyle: {
    height: 50,
    width: 352,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  headerLeftMainViewStyle: {
    height: 50,
    width: 150,
    flexDirection: 'row',
  },
  mytimeViewStyle: {
    height: 50,
    width: 90,
    justifyContent: 'center',
  },
  rightSideIconMainViewStyle: {
    height: 50,
    width: 150,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    flexDirection: 'row',
  },
  rightSideButtonStyle: {
    height: 30,
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  serchMainViewStyle: {
    height: 40,
    width: 350,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  serchIconViewStyle: {
    height: 40,
    width: 22,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInputViewStyle: {
    height: 40,
    width: 240,
    justifyContent: 'center',
  },
  textInputStyle: {
    height: 40,
    width: 270,
  },
  contactListView: {
    width: '100%',
  },
  ImageMainView: {
    marginTop: 8,
    width: 380,
    height: 430,
    //justifyContent: 'center',
    alignSelf: 'center',
    //backgroundColor: 'green',
  },
  contactListItemNameView: {
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:"red",
    width: 380,
    height: 360,
    
  },
  scrollContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  mediaContainer: {
    width: 385,
    height: 360,
    marginHorizontal: 5,
  },
  contactListItemText: {
    fontWeight: '600',
    color: '#545454',
    fontSize: 16,
    lineHeight: 24,
  },
  fullNameTextStyle: {
    fontWeight: '600',
    color: '#545454',
    fontSize: 16,
    lineHeight: 24,
  },
  button: {
    height: 32,
    width: 91,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    marginLeft: 8,
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
  viewProfileContainerStyle: {
    height: 25,
    width: 370,
    //justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor:'yellow'
  },
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
