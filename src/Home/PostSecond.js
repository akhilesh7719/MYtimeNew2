import {Image, StyleSheet, Text, TouchableOpacity, View, SafeAreaView} from 'react-native';
import React from 'react';

const PostSecond = () => {
  return (
    <SafeAreaView style={styles.container}>
    <View>
      <View style={styles.headerStyle}>
        <Text style={styles.headerText}>New Post</Text>
      </View>

      <View style={styles.postContainer}>
        <Image style={styles.PostStyle} />
      </View>

      <View style={styles.captionStyle}>
        <Text style={styles.captionText}>Write A caption</Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.shareText}>share</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>
  );
};

export default PostSecond;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    // padding: 10,
  },
  headerStyle: {
    width: 82,
    height: 23,
    // backgroundColor:'yellow',
    marginLeft: 42,
  },
  headerText: {
    fontFamily: 'Poppins',
    fontSize: 15,
    fontWeight: '400',
    color: '#000000',
    lineHeight: 22.5,
  },
  postContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  PostStyle: {
    width: 346,
    height: 307,
    backgroundColor: '#D9D9D9',
    marginTop: 30,
  },
  captionStyle: {
    width: 125,
    height: 24,
    //backgroundColor:'green',
    margin: 40,
  },
  captionText: {
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#9E9E9E',
  },
  buttonContainer: {
    marginTop: 170,
    //backgroundColor:'black',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 336,
    height: 40,
    backgroundColor: '#D9D9D9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareText: {
    width: 47,
    height: 24,
    fontFamily: 'Poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#000000',
  },
});
