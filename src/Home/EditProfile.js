import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ImagePicker from 'react-native-image-crop-picker';
import axios from 'axios';

const EditProfile = () => {
  const [token, setToken] = useState('');
  const [image, setImage] = useState('');
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [picUri, setPicUri] = useState('');

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
  };

  useEffect(() => {
    getToken();
  }, []);

  const handleEditProfileApi = async () => {
    const url = 'https://api.mytime.co.in/users/1'; // Replace with your API endpoint
    const formData = new FormData();
    formData.append('data[full_name]', 'Apple');
    formData.append('data[about_us]', 'unhhhh');
    formData.append('data[profile_image]', picUri);
    console.log('api formmmmmmmmm======', formData);

    try {
      const response = await axios.patch(url, formData, {
        headers: {
          token: token,
          'Content-Type': 'multipart/form-data', // This line can be optional
        },
      });

      //const result = await response;
      console.log('Response:=======',JSON.stringify(response));
    } catch (error) {
      console.error('Error:==========', error);
    }
  };

  const openGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
    }).then(image => {
      console.log('ijdhkfjrghjbdjhkgfjdnkjlhfgbdnjkhfbnkjhfbndjkh', image);
      setImage(image.path);
      let output = {
        uri: image.path,
        type: image.mime,
        name: image.filename,
      };
      setPicUri(output);
      console.log('ieuhjfjjdjjguydhjuyrhfjrjfjrfjfbgf======', picUri);
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
    <View style={styles.mainContainerView}>
      <View style={styles.headerContainerView}>
        <View style={styles.headerIconsView}>
          <TouchableOpacity>
            <Icon
              style={styles.profileIcon}
              name="user-alt"
              size={15}
              color="#000000"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="bell" size={25} color="#000000" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="cog" size={25} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.secondContainerNameLocView}>
        <View style={styles.nameLocView}>
          <Text style={styles.profileName}>Full Name</Text>
          <View style={styles.iconLoc}>
            <Icon
              style={styles.locIcon}
              name="map-marker-alt"
              size={20}
              color="#C1C1C1"
            />
            <Text style={styles.locName}>Indore</Text>
          </View>
        </View>
        <View style={styles.profilePicTextView}>
          <View style={styles.profilePicImageView}>
            {/* <Image
              style={styles.profilePicImage}
              source={{
                uri: 'https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1714731969~exp=1714735569~hmac=2a477c9bd95a4b6844fae745b472c7b0c973ae532cdd9d60c25c69c6da8e3b09&w=900',
              }}
            /> */}
            <Image
              source={
                {uri: image}
                  ? {uri: null}
                  : {
                      uri: 'https://img.freepik.com/free-photo/cheerful-indian-businessman-smiling-closeup-portrait-jobs-career-campaign_53876-129417.jpg?t=st=1714731969~exp=1714735569~hmac=2a477c9bd95a4b6844fae745b472c7b0c973ae532cdd9d60c25c69c6da8e3b09&w=900',
                    }
              }
              width={400}
              height={240}
            />
          </View>
          <View style={styles.profilePicIconView}>
            <View style={styles.profilePicIcon}>
              <TouchableOpacity onPress={() => openGallery()}>
                <Icon
                  style={styles.picType1Icon}
                  name="edit"
                  size={20.12}
                  color="#756E6E"
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <Icon
                  style={styles.picType1Icon}
                  name="trash-alt"
                  size={20.12}
                  color="#756E6E"
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={styles.profileAboutView}>
            <Text style={styles.profileAbout}>
              A Small Family Run Business Offering Freshly Mode Bread, Cokes,
              Breakfast Rolls Sandwiches,Check My Page For Daily Updates.
              Serving New Palasia Indore
            </Text>
          </View>
        </View>
        <View style={styles.recentsPics}>
          <View style={styles.recentPicsEditView}>
            <Image style={styles.picType1} />
            <TouchableOpacity>
              <View style={styles.picType1IconView}>
                <Icon
                  style={styles.picType1Icon}
                  name="edit"
                  size={20.12}
                  color="#756E6E"
                />
              </View>
            </TouchableOpacity>
          </View>
          <Image style={styles.picType1} />
          <Image style={styles.picType2} />
        </View>
        <TouchableOpacity
          onPress={() => handleEditProfileApi()}
          style={{
            height: 50,
            width: 200,
            backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 20,
          }}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  mainContainerView: {
    flex: 1,
    padding: 10,
  },
  headerContainerView: {
    height: 30.7,
    width: 100,
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginTop: 30,
  },
  headerIconsView: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    backgroundColor: '#D9D9D9',
    padding: 6,
    borderRadius: 100,
  },
  secondContainerNameLocView: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameLocView: {
    width: '100%',
    // backgroundColor: 'grey',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginVertical: 10,
  },
  iconLoc: {
    flexDirection: 'row',
    // backgroundColor:'yellow',
  },
  profileName: {
    height: 24,
    // width: 81,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#515151',
  },
  locIcon: {
    height: 22,
    width: 18,
    color: '#000000',
    // borderWidth:2
  },
  locName: {
    // width: 52,
    height: 24,
    color: '#000000',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  profilePicTextView: {
    //  backgroundColor: 'green',
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: '100%',
    height: 243,
    position: 'relative',
  },
  profilePicIconView: {
    // backgroundColor: 'green',
    flexDirection: 'row',
    color: '#756E6E',
    padding: 5,
    width: '100%',
    position: 'absolute',
    alignSelf: 'flex-start',
  },
  profilePicIcon: {
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    // alignSelf:'center'
  },

  profilePicImageView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 243,
    // backgroundColor: 'yellow',
  },
  profilePicImage: {
    width: '100%',
    height: 243,
  },
  profileAboutView: {
    //  backgroundColor: 'green',
    alignSelf: 'center',
    width: '100%',
    // height: 98,
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'flex-end',
  },
  profileAbout: {
    width: 312,
    height: 70,
    fontSize: 13,
    fontWeight: '400',
    color: '#FFFFFF',
    justifyContent: 'center',
    alignSelf: 'center',
    lineHeight: 19.5,
  },
  recents: {
    marginTop: 10,
    flex: 1,
    //  backgroundColor:'green'
  },
  recentsText: {
    // backgroundColor:'yellow',
    color: '#000000',
    width: 64,
    height: 24,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  recentsPics: {
    marginTop: 10,
    // flex: 1,
    //  backgroundColor:'blue',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  recentPicsEditView: {
    //  backgroundColor:'green',
    flexDirection: 'row',
    position: 'relative',
  },
  picType1: {
    //  backgroundColor:'green',
    position: 'relative',
    width: 170,
    height: 155,
    backgroundColor: '#D9D9D9',
  },
  picType1IconView: {
    //  backgroundColor:'green',
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  picType1Icon: {
    padding: 5,
  },
  picType2: {
    marginTop: 10,
    width: '100%',
    height: 70,
    backgroundColor: '#D9D9D9',
  },
});
