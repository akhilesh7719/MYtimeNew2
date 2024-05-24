import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ShowPost = () => {
  const [token, setToken] = useState('');
  const [postData, showPostData] = useState('');
  const [postImage, setPostImage] = useState('');

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

  return (
    <View style={styles.MainContainerView}>
      <View style={styles.contactListView}>
        <FlatList
          data={postData}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

const Item = ({item}) => {
  console.log('ittttttttttttem========', item.images[0]?.url);
  return (
    <View style={styles.ImageMainView}>
      <View style={styles.contactListItemNameView}>
        <Image
          style={{width: 350, height: 220}}
          source={{uri: item.images[0]?.url}}
        />
      </View>

      {item.text && (
        <View style={styles.contactListItemTextView}>
          <TouchableOpacity>
            <Text style={styles.contactListItemText}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ShowPost;

const styles = StyleSheet.create({
  MainContainerView: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  headerContainerView: {
    //  backgroundColor: 'green',

    width: 62,
    // flexDirection:'row',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  headerIconsView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  contactListView: {
    //  backgroundColor: 'green',
    flex: 1,
    marginTop: 70,
    width: '100%',
  },
  ImageMainView: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'red',
    width: 350,
    height: 220,
    alignSelf: 'center',
  },
  contactListItemImageNameView: {},
  contactListItemImageView: {
    // backgroundColor: 'yellow',
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
    // backgroundColor: 'blue',
    fontWeight: '400',
    color: '#FFFFFF',
    fontSize: 16,
    lineHeight: 24,
  },
});
