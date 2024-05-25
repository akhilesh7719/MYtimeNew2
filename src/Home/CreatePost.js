import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const CreatePost = () => {
  const [image, setImage] = useState('');
  const [token, setToken] = useState('');

  useEffect(() => {
    getToken();
  }, []);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
  };

  const createPostApi = async () => {
    const url = 'https://api.mytime.co.in/posts';
    const formData = new FormData();
    formData.append('data[caption]', 'This is second post');
    formData.append('data[status]', 'universal');

    try {
      const response = await axios.post(url, formData, {
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:=======', JSON.stringify(response));
    } catch (error) {
      console.error('Error:=========', error);
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  const openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log(image);
      setImage(image.path);
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openGallery}>
        <Text>open gallery</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => createPostApi()}>
        <Text>open camera</Text>
      </TouchableOpacity>
      <Image source={{uri: image}} width={350} height={400} />
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'pink',
    width: 200,
    height: 60,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
});
