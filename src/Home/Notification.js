import {FlatList, StyleSheet, Switch, Text, View,SafeAreaView} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';

const Data = [
  {
    id: '1',
    name: 'Mytime',
    highlight: 'New Notification',
    notification: 'Your friend is posted on a mytime',
  },
  {
    id: '2',
    name: 'Mytime',
    highlight: 'New Notification',
    notification: 'your friend has updated their gallery',
  },
  {
    id: '3',
    name: 'Mytime',
    highlight: 'New Notification',
    notification: 'see what people are posting around you',
  },
  {
    id: '4',
    name: 'Mytime',
    highlight: 'New Notification',
    notification: 'explore top creater around you',
  },
  {
    id: '5',
    name: 'Mytime',
    highlight: 'New Notification',
    notification: 'explore top creater around you',
  },
];
const Item = ({item}) => {
  console.log(item);
  return (
    <View style={styles.notificationPanelView}>
      <View style={styles.notificationPanelTextView}>
        <Text style={styles.notificationPanelTextNameView}>{item.name}</Text>
        <Text style={styles.notificationPanelTextHighlightView}>
          {item.highlight}
        </Text>
        <Text style={styles.notificationPanelTextNotificationView}>
          {item.notification}
        </Text>
      </View>
    </View>
  );
};
const Notification = () => {
  return (
    <SafeAreaView style={styles.view}>
      <View style={styles.cross}>
        <Icon
          style={styles.crossIconStyle}
          name="times-circle"
          size={22}
          color="#000000"
        />
      </View>
      <View style={styles.notificationTextButtonView}>
        <Text style={styles.notificationTextViewStyle}>Notification</Text>
        <Switch
          trackColor={{false: '#D9D9D9', true: '#D9D9D9'}}
          style={styles.notificationSwitchViewStyle}></Switch>
      </View>
      <View style={styles.notificationView}>
        <FlatList
          data={Data}
          keyExtractor={item => item.id}
          renderItem={({item}) => <Item item={item} />}
        />
      </View>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  view: {
    backgroundColor: 'white',
    flex: 1,
    padding: 10,
  },
  cross: {
    //  backgroundColor:'green',
    width: 310,
    height: 22,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  crossIconStyle: {
    alignSelf: 'flex-end',
  },
  notificationTextButtonView: {
    //  backgroundColor: 'green',
    alignSelf: 'center',
    justifyContent: 'center',
    width: 310,
    height: 24,
    marginTop: 30,
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  notificationTextViewStyle: {
    width: 107,
    height: 23,
    fontWeight: '400',
    fontSize: 15,
    color: '#000000',
    lineHeight: 22.5,
  },
  notificationSwitchViewStyle: {
    //  backgroundColor:'yellow',
    color: '#D9D9D9',
    left: 15,
  },
  notificationView: {
    //  backgroundColor:'green',
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationPanelView: {
    //  backgroundColor:'green',
    alignSelf: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: 343,
    height: 120,
  },
  notificationPanelTextView: {
    width: 343,
    height: 110,
    borderRadius: 20,
    backgroundColor: '#D9D9D9',
    color: '#000000',
    fontWeight: '600',
    fontSize: 10,
    justifyContent: 'space-evenly',
    alignItems: 'baseline',
    lineHeight: 15,
    padding: 10,
  },
  notificationPanelTextNameView: {
    // width:50,
    height: 15,
    color: '#000000',
    fontWeight: '600',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'justify',
    // backgroundColor: 'green',
  },
  notificationPanelTextHighlightView: {
    // backgroundColor: 'green',
    height: 15,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 15,
    textAlign: 'justify',
    color: '#2F2F2F',
  },
  notificationPanelTextNotificationView: {
    //  backgroundColor:'green',
    height: 15,
    fontWeight: '400',
    fontSize: 10,
    lineHeight: 15,
    color: '#777777',
    textAlign: 'justify',
  },
});
