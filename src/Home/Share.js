import React from 'react';
import {FlatList, Text, View, StyleSheet, Image} from 'react-native';

// Sample data for the FlatList
const DATA = [
  {
    id: '1',
    title: 'pawan :',
    about: 'sound interesting ',
  },
  {
    id: '2',
    title: 'pawan :',
    about: 'sound interesting',
  },
  {
    id: '3',
    title: 'pawan :',
    about: 'sound interesting',
  },

  // Add more items as needed
];

const Share = () => {
  const renderItem = ({item}) => (
    <View style={{height: 250, width: 340, marginTop: 10}}>
      <View style={styles.item}>
        <Image
          style={{height: 180, width: 300, resizeMode: 'contain'}}
          source={require('../assets/lady.png')}
        />
        <Text style={styles.title}>{item.name}</Text>
      </View>
      <View
        style={{
          height: 45,
          width: 325,

          flexDirection: 'row',
          alignSelf: 'center',
        }}>
        <View
          style={{
            height: 45,
            width: 240,
            alignItems: 'center',
            flexDirection: 'row',
          }}>
          <View
            style={{
              height: 45,
              width: 65,
              justifyContent: 'center',
            }}>
            <Text style={styles.title}>{item.title}</Text>
          </View>
          <View
            style={{
              height: 45,
              width: 140,
              justifyContent: 'center',
            }}>
            <Text style={styles.about}>{item.about}</Text>
          </View>
        </View>
        <View
          style={{
            height: 45,
            width: 100,
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <View
            style={{
              height: 45,
              width: 35,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={{height: 14, width: 18}}
              source={require('../assets/chat.png')}
            />
          </View>
          <View
            style={{
              height: 45,
              width: 30,
              justifyContent: 'center',
            }}>
            <Image
              style={{height: 14, width: 18}}
              source={require('../assets/heart.png')}
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default Share;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  item: {
    backgroundColor: '#f9c2ff',
    height: 200,
    width: 340,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
  },
  about: {
    fontSize: 18,
  },
});
