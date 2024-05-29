import {
  View,
  Text,
  FlatList,
  PermissionsAndroid,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  Linking,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Contacts from 'react-native-contacts';

const ContactList = () => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    ReadContactList();
  }, []);

  const ReadContactList = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        {
          title: 'Contacts',
          message: 'This app would like to view your contacts.',
          buttonPositive: 'Please accept bare mortal',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Contacts.getAll()
          .then(contacts => {
            setContacts(contacts);
            console.log('Contacts:', contacts);
          })
          .catch(err => {
            console.log('Error fetching contacts', err);
          });
      } else {
        console.log('Permission denied');
      }
    } catch (err) {
      console.log('Error requesting permission', err);
    }
  };

  const sendInviteLink = (contact) => {
    const inviteLink = 'https://yourapp.com/invite?ref=yourReferralCode'; // Replace with your app's invite link
    const message = `Hi ${contact.givenName}, check out this cool app! ${inviteLink}`;

    Linking.openURL(`sms:${contact.phoneNumbers[0]?.number}?body=${encodeURIComponent(message)}`)
      .then(() => {
        Alert.alert('Success', 'Invitation sent successfully');
      })
      .catch(err => {
        Alert.alert('Error', 'Failed to send invitation');
        console.log('Error sending SMS:', err);
      });
  };

  const renderContact = ({item}) => (
    <View style={styles.contactItem}>
      {item.hasThumbnail ? (
        <Image source={{uri: item.thumbnailPath}} style={styles.contactImage} />
      ) : (
        <View style={styles.contactPlaceholder}>
          <Text style={styles.contactInitials}>
            {item.givenName?.charAt(0)}
            {item.familyName?.charAt(0)}
          </Text>
        </View>
      )}
      <View style={styles.contactInfo}>
        <Text style={styles.contactName}>{item.displayName}</Text>
      </View>
      <TouchableOpacity style={styles.inviteViewStyle} onPress={() => sendInviteLink(item)}>
        <Text style={styles.inviteTextStyle}>Invite</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Contact List</Text>
      <FlatList
        data={contacts}
        keyExtractor={item => item.recordID}
        renderItem={renderContact}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  contactImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  contactPlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    borderRadius: 25,
  },
  contactInitials: {
    fontSize: 18,
    color: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  inviteViewStyle: {
    height: 27,
    width: 70,
    backgroundColor: '#B9DDF3',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inviteTextStyle: {
    fontSize: 16,
    color: '#fff',
  },
});

export default ContactList;
