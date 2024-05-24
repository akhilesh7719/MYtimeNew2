import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Header from './Header';
const Data = [
  {
    id: '1',
    name: 'Pawan architech',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '2',
    name: 'Shivam Patel Colledge',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '3',
    name: 'Abhinav Bags',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '4',
    name: 'Adarsh',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '5',
    name: 'Abhinav Jain Carry Bags',
    // image: require('./src/Assests/contactProfilePic.png'),
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '6',
    name: 'Shivani Jain',
    text: 'Invite',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/747a/5d6b/0e52325c2669d80bf100b210469b2a50?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UqdzA~gBjBzkbo5DI2C-Xx6ZLgmWO37YIJd1kN~sZ-j~a1M6KhgYBRAnamcj9aApbYRNKTqjN8S0GU4n8dEtecM86kzy7mXA5to7O~-iS-cNrySK2jklanuxfyAXRaWTMRd3fPWEVvxntbZEXYDzb75--XZLwvYKqi4Nx6R5iUYbjd5Vnww8le7-5lbPo20pP9QvYa99xjx2hv8xOkV8cUbIH1hLeoNGMDfLJ46anoTWYmHv-0k0mHRRls~1TIp~2LbzEWtyEYpJ0nzM7vMtmjcMmAcQtA8QLK6AEMNHps9jTy5OdOHtEc6I1Jn4OzEQPwus-wxNmImX3f8qhQL0vg__',
    },
  },
  {
    id: '9',
    name: 'Praveen',
    text: 'Invite',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '8',
    name: 'Naman Sethi',
    text: 'Invite',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
  {
    id: '7',
    name: 'Access',
    text: 'Invite',
    image: {
      uri: 'https://s3-alpha-sig.figma.com/img/a08f/2ae1/77aad03c9519bb36e488b8dc473b29a9?Expires=1716163200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=IY~nWZETPAIJBSFDqaQd7LAFIgHc1P9cm8PXBGsN5tQM47jNhjNasaOC1lvbX9nP49m0G19FfY5AZsPj4ZzINMeIv80TDnaFlqp5oajt~kV8a~VaJcUMEIw650rUpFvfyzNLlHqc9b5zIDTqXsgq9crhpsXEYIjTtPKh5-X-bKYqd5eWpV5E-FjpBfOYgwIhf0vfjtsqUMaQGeiSXLhHwPZdo9WALhYmHnN8tFyvHYdH6xC6oYWBCiy4W-4hrI06G1zkE85Bh0T9XWOxg~jFaiLWR90i1Dn5inHRvHOcSxUGb8iJ8y5LM87Gfl~WHi6Wh2LasjUuxqhrvNuqdXlbMQ__',
    },
  },
];
const Item = ({item}) => {
  console.log(item);
  return (
    <View style={styles.contactListItemView}>
      {/* <ScrollView horizontal={true}> */}
      <View style={styles.contactListItemImageNameView}>
        <View style={styles.contactListItemImageView}>
          <Image style={styles.contactListItemImage} source={require('../assets/profile.png')} />
        </View>
        <View style={styles.contactListItemNameView}>
          <Text style={styles.contactListItemName}>{item.name}</Text>
        </View>
      </View>

      {item.text && (
        <View style={styles.contactListItemTextView}>
          <TouchableOpacity>
            <Text style={styles.contactListItemText}>{item.text}</Text>
          </TouchableOpacity>
        </View>
      )}
      {/* </ScrollView> */}
    </View>
  );
};
const ContactList = () => {
  return (
    <View style={styles.MainContainerView}>
      <View style={styles.contactListView}>
        <FlatList
          data={Data}
          renderItem={({item}) => <Item item={item} />}
          keyExtractor={item => item.id}
        />
      </View>
    </View>
  );
};

export default ContactList;

const styles = StyleSheet.create({
  MainContainerView: {
    //backgroundColor: 'white',
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
  contactListItemView: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'space-between',
    //backgroundColor: 'grey',
    width: '100%',
  },
  contactListItemImageNameView: {
    flexDirection: 'row',
    //backgroundColor: 'pink',
    alignContent: 'flex-start',
  },
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

    // backgroundColor: 'yellow',
    justifyContent: 'center',
    alignItems: 'center',
  },

  contactListItemNameView: {
    justifyContent: 'center',
    // backgroundColor: 'orange',
    alignItems: 'flex-start',
    width: '65%',
    paddingLeft: 10,
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
