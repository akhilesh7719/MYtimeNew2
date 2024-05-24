import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';


const Search = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="search"
          placeholderTextColor="#929292"
          style={styles.searchInput}
        />
      </View>

      <View style={styles.PostContainer}>
        <ScrollView>
          <View style={styles.PostBox}>
            <Image style={styles.image} />

            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}> View Profile </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>
              a small family run business offering freshly mode bread, cokes,
              breakfast rolls sandwiches,Check my page for daily updates.
              serving new palasia indore
            </Text>
          </View>
          <View style={styles.PostBox2}>
            <Image style={styles.image} />

            <TouchableOpacity style={styles.buttonStyle}>
              <Text style={styles.buttonText}> View Profile </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.captionContainer}>
            <Text style={styles.captionText}>
              a small family run business offering freshly mode bread, cokes,
              breakfast rolls sandwiches,Check my page for daily updates.
              serving new palasia indore
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
  },
  searchContainer: {
    width: 324,
    height: 45,
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#C1C1C1',
    marginTop: 33,
    alignItems: 'flex-start',
    //backgroundColor:'green'
  },
  searchInput: {
    fontFamily: 'Open Sans',
    fontWeight: '700',
    fontSize: 16,
    lineHeight: 21.79,
    width: 58,
    height: 40,
    marginLeft: 20,
  },
  PostContainer: {
    flexDirection: 'column',
    padding: 10,
  },
  PostBox: {
    // width:332,
    //height:236,
    marginTop: 30,
    alignItems: 'center',
    //backgroundColor:'#D9D9D9',
  },
  image: {
    backgroundColor: '#D9D9D9',
    width: 332,
    height: 191,
  },
  buttonStyle: {
    width: 332,
    height: 45.21,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D9D9D9',
  },
  buttonText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 14,
    lineHeight: 21,
    color: '#616161',
  },
  captionContainer: {
    width: 332,
    height: 98,
    // marginTop:10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  captionText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 13,
    lineHeight: 19.5,
    color: '#636363',
  },
  PostBox2: {
    marginTop: 20,
    alignItems: 'center',
  },
});
