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

const HomeScreen = () => {
  const [token, setToken] = useState('');
  const [postData, showPostData] = useState('');
  const [postImage, setPostImage] = useState('');
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

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    console.log('@@@@@@@@@@ ShowPost Token ============', tokens);
    setToken(tokens);
    getAllShowApiData(tokens);
  };

  // const profileNNabigatttion = () => {
  //   navigation.navigate('Profile');
  // };

  const productItem = item => {
    console.log("@@@@@@@@@@@@HomeScreenItem======", item.user.id)
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
            //backgroundColor: 'green',
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
      <View style={{height: 60, width: 450}}>
        <ScrollView
          style={{flexGrow: 0}}
          showsVerticalScrollIndicator={false}
          horizontal={true}>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>For You</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Entertainment</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Today Event</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonStyle}>
            <Text style={styles.buttonTextStyle}>Business</Text>
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
});
