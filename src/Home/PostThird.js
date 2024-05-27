import {
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Video from 'react-native-video';

const PostThird = ({navigation, route}) => {
  const [token, setToken] = useState('');
  const [selectedButton, setSelectedButton] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [imagePaths, setImagePaths] = useState([]);
  const [caption, setCaption] = useState('');
  const [categoriesID, setCtegoriedID] = useState('');

  const [categories, showcategories] = useState([]);

  useEffect(() => {
    getAllCategories();

    // console.log("route.params?",route.params)
    getToken();
    if (route.params?.mediaPaths) {
      console.log('Received media paths:', route.params.mediaPaths);
      setImagePaths(route.params.mediaPaths);
    }
  }, [route.params]);

  const getToken = async () => {
    const tokens = await AsyncStorage.getItem('TOKEN');
    setToken(tokens);
  };

  const handleButtonPress = (button,id )=> {
    
    setCtegoriedID(id)
    setSelectedButton(button);
  };
  const handleSelect = option => {
    setSelectedOption(option);
  };
  const getAllCategories = async tokens => {
    const url = 'https://api.mytime.co.in/categories';
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(resp => resp.json())
      .then(function (data) {
        console.log('@@@@@@@@@@categoried============== ', data);
        showcategories(data.categories);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

 

 const createPostApi = async () => {
    console.log("category.id",categoriesID)
    const url = 'https://api.mytime.co.in/posts';
    const formData = new FormData();
    formData.append('data[caption]', caption);
    formData.append('data[status]', 'universal');

    formData.append('data[category_id]',categoriesID)

    imagePaths.forEach((path, index) => {
      const isVideo = path.endsWith('.mp4');
      formData.append('data[images][]', {
        uri: path,
        type: isVideo ? 'video/mp4' : 'image/jpeg',
        name: `media_${index}.${isVideo ? 'mp4' : 'jpg'}`,
      });
    });
    console.log('formData@@@', JSON.stringify(formData));

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
          token: token,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('Response:=======', JSON.stringify(data));
      alert('Post created successfully');
      navigation.navigate('HomeScreen');
    } catch (error) {
      console.error('Error:==========', error);
    }
  };
  // const createPostApi = async () => {
  //   const url = 'https://api.mytime.co.in/posts';
  //   const formData = new FormData();
  //   formData.append('data[caption]', caption);
  //   formData.append('data[status]', 'universal');
  //   formData.append('data[category_id]', categoriesID);
  
  //   try {
  //     for (let i = 0; i < imagePaths.length; i++) {
  //       const path = imagePaths[i];
  //       const isVideo = path.endsWith('.mp4');
  
  //       // Resize images
  //       if (!isVideo) {
  //         const resizedImageUri = await ImageResizer.createResizedImage(
  //           path,
  //           800, // Width
  //           600, // Height
  //           'JPEG', // Format
  //           80, // Quality
  //         );
  //         formData.append('data[images][]', {
  //           uri: resizedImageUri.uri,
  //           type: 'image/jpeg',
  //           name: `media_${i}.jpg`,
  //         });
  //       }
  
  //       // Compress videos
  //       if (isVideo) {
  //         const compressedVideoUri = await VideoProcessing.compress(
  //           path,
  //           {
  //             width: 720, // Width
  //             height: 480, // Height
  //             bitrateMultiplier: 3, // Bitrate multiplier
  //             outputFormat: 'mp4', // Output format
  //           }
  //         );
  //         formData.append('data[images][]', {
  //           uri: compressedVideoUri,
  //           type: 'video/mp4',
  //           name: `media_${i}.mp4`,
  //         });
  //       }
  //     }
  
  //     const response = await fetch(url, {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'multipart/form-data',
  //         token: token,
  //       },
  //       body: formData,
  //     });
  
  //     if (!response.ok) {
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }
  
  //     const data = await response.json();
  //     console.log('Response:=======', JSON.stringify(data));
  //     alert('Post created successfully');
  //     navigation.navigate('HomeScreen');
  //   } catch (error) {
  //     console.error('Error:==========', error);
  //   }
  // };
  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView>
        <View style={styles.headerContainer}>
          <View>
            <Image
              style={{height: 10, width: 10}}
              source={require('../assets/cross.png')}
            />
          </View>
          <View>
            <Text style={styles.headerText}>New Post</Text>
          </View>
        </View>

        <View style={styles.mainContainer}>
          <ScrollView
            horizontal={true}
            contentContainerStyle={styles.containerimage}
            showsHorizontalScrollIndicator={false}>
            {imagePaths && imagePaths.length > 0 ? (
              imagePaths.map((path, index) => {
                const isVideo = path.endsWith('.mp4'); // Simple check for video files
                return isVideo ? (
                  <Video
                    key={index}
                    source={{uri: path}}
                    style={{height: 300, width: 350}}
                    controls
                  />
                ) : (
                  <Image
                    key={index}
                    source={{uri: path}}
                    style={{height: 300, width: 350}}
                  />
                );
              })
            ) : (
              <Text>No media to display</Text>
            )}
          </ScrollView>
          <View style={styles.captionBox}>
            <TextInput
              style={styles.captionText}
              placeholder="write a caption"
              placeholderTextColor="#9E9E9E"
              onChangeText={text => setCaption(text)}
              value={caption}
              multiline={true}
            />
          </View>
          <View style={styles.ButtonContainer}>
            <ScrollView
              horizontal={true}
              contentContainerStyle={styles.containerimage}
              showsHorizontalScrollIndicator={false}>
              {categories &&
                categories.map((category, index) => (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.button,
                      selectedButton === category.name && {
                        marginRight: 10,
                        marginHorizontal: 20,
                      },
                    ]}
                    onPress={() => handleButtonPress(category.name,category.id)}>
                    <Text
                      style={[
                        styles.ButtonText,
                        selectedButton === category.name && {
                          marginHorizontal: 2,
                          marginRight: 10,
                        },
                      ]}>
                      {category.name} {selectedButton === category.name && '✓'}
                    </Text>
                  </TouchableOpacity>
                ))}
            </ScrollView>
          </View>
          <View style={styles.lastContainer}>
            <View style={styles.showPostStyle}>
              <Text style={styles.showPostText}>Show Post To</Text>
            </View>
            <View style={styles.selectBox}>
              <TouchableOpacity
                style={styles.selectStyle}
                onPress={() => handleSelect('Public')}>
                <View
                  style={[
                    styles.checkBox,
                    selectedOption === 'Public' && styles.checkedBox,
                  ]}>
                  {selectedOption === 'Public' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
                <Text style={styles.selectText}>
                  Public (recommended for businesses, professionals, and
                  creators)
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.selectStyle}
                onPress={() => handleSelect('Contacts')}>
                <View
                  style={[
                    styles.checkBox,
                    selectedOption === 'Contacts' && styles.checkedBox,
                  ]}>
                  {selectedOption === 'Contacts' && (
                    <Text style={styles.checkMark}>✓</Text>
                  )}
                </View>
                <Text style={styles.selectText2}>
                  Contacts (share only with contacts)
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={() => createPostApi(categories.id)}
            style={styles.shareButton}>
            <Text style={styles.shareText}>Share</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PostThird;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 10,
  },
  headerContainer: {
    marginTop: 17,
    alignItems: 'flex-start',
    justifyContent: 'center',
    left: 45,
    width: 82,
    height: 23,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#545454',
    marginLeft: 10,
  },
  mainContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ImageContainer: {
    marginTop: 40,
    width: 351,
    height: 288,
    borderWidth: 1,
    borderColor: '#B9DDF3',
  },
  captionBox: {
    width: 352,
    height: 58,
    marginTop: 30,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#545454',
    justifyContent: 'center',
  },
  captionText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 16,
    // lineHeight: 24,
    // width: 200,
    color: '#000',
    // backgroundColor:'green',
    padding: 10,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 349,
    height: 37,
    marginHorizontal: 20,
    marginLeft: 20,
    //backgroundColor:'green',
    marginTop: 15,
  },
  button: {
    backgroundColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10, // Add space between buttons
    justifyContent: 'center', // Center the text horizontally
    alignItems: 'center', // Center the text vertically
  },
  ButtonText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#545454',
  },
  lastContainer: {
    alignItems: 'flex-start',
    width: 351,
    marginTop: 10,
  },
  showPostStyle: {
    alignItems: 'flex-start',
    padding: 5,
    width: 150,
  },
  showPostText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#636363',
  },
  selectBox: {
    //flexDirection:'column',
  },
  checkBox: {
    width: 14,
    height: 14,
    backgroundColor: '#D9D9D9',
  },
  selectText: {
    width: 317,
    height: 46,
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#545454',
  },
  selectStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 351,
    marginTop: 10,
  },
  selectText2: {
    width: 317,
    height: 23,
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 15,
    lineHeight: 22.5,
    color: '#545454',
  },
  shareButton: {
    width: 177,
    height: 40,
    backgroundColor: '#B9DDF3',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 90,
    shadowColor: '#000000',
    shadowOffset: {
      x: 0,
      y: 4,
    },
    shadowOpacity: 0.25,
    elevation: 4,
  },
  shareText: {
    fontFamily: 'poppins',
    fontWeight: '400',
    fontSize: 16,
    lineHeight: 24,
    color: '#545454',
  },
  containerimage: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  selectBox: {
    padding: 20,
  },
  selectStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  checkedBox: {
    backgroundColor: '#eee',
    borderColor: '#eee',
  },
  checkMark: {
    color: '#000',
    fontSize: 14,
  },
  selectText: {
    fontSize: 16,
    color: '#000',
  },
  selectText2: {
    fontSize: 16,
    color: '#000',
  },
});
