import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  PermissionsAndroid,
  Platform,
  Dimensions,
  Image,
  FlatList,
} from 'react-native';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import 'react-native-gesture-handler';
import {RNCamera} from 'react-native-camera';
import CameraRoll from '@react-native-community/cameraroll';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';

export default class CameraView extends Component {
  constructor(props) {
    super();
    this.state = {
      imageList: [],
    };
  }
  requestWriteExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  takePhoto = async () => {
    if (this.camera) {
      const options = {
        quality: 0.7,
        base64: true,
      };

      if (Platform.OS === 'android' && Platform.Version > 22) {
        await this.requestWriteExternalStoragePermission();
      }

      const data = await this.camera.takePictureAsync(options);

      CameraRoll.saveToCameraRoll(data.uri, 'photo')
        .then(() => {
          alert('Success');
        })
        .catch((e) => {
          alert('err');
          console.log(e);
        });
    }
  };
  navigateToViewPhotos = (data) => {
    this.props.navigation.navigate('SecimEkrani', data);
  };
  /*takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        let imageData = [image];
        if (imageData.length > 0) {
          this.navigateToViewPhotos(imageData);
          //this.setState(imageData);
        }
      })
      .catch((err) => {
        console.log(' Error fetching image from Camera roll ', err);
      });
  };*/

  choosePhotosFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      multiple: true,
      //cropping: true,
    })
      .then((images) => {
        console.log(images);
        if (images.length > 0) {
          images = this.state.images;
        }
      })
      .catch((err) => {
        console.log(' Error fetching images from gallery ', err);
      });
  };
  extractRequiredImageData = () => {
    let imageData = this.props.navigation.state.params;
    //let imageData = this.setState(imageData);
    let imageList = [];

    for (let i = 0; i < Object(imageData).length; i++) {
      let data = imageData[String(i)];
      let image = {
        id: String(i),
        contentType: data.mime,
        fileSize: data.size,
        filePath: data.path,
      };
      console.log(data.path);

      if (Platform.OS === 'android') {
        image.fileName = data.filename;
      } else {
        let path = data.path.split('/');
        image.fileName = path[path.length - 1];
      }

      imageList.push(image);
    }
    this.setState({
      imageList,
    });
  };
  componentDidMount() {
    //const deneme = this.extractRequiredImageData.bind();
    this.extractRequiredImageData();
  }
  render() {
    return (
      <View style={styles.container}>
        {
          <RNCamera
            ratio={'1:1'}
            ref={(ref) => {
              this.camera = ref;
            }}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.off}
            //mirrorImage={this.state.mirrorMode}
            style={styles.preview}
          />
        }
        <View style={styles.bottomController}>
          <Icon
            style={styles.galeriSecme}
            name="image"
            size={24}
            color={'#000'}
            onPress={() => this.choosePhotosFromGallery()}
          />
          <Icon
            style={styles.snapButton}
            name="camera"
            size={44}
            color={'#000'}
            onPress={() => this.takePhoto()}
          />
        </View>
        <View style={styles.deneme}>
          <FlatList
            data={this.state.imageList}
            numColumns={2}
            renderItem={({item}) => (
              <Image style={styles.image} source={{uri: item.filePath}} />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  preview: {
    //width: wp('100%'),
    //height: hp('50%'),
    height: width,
  },
  bottomController: {
    //width: wp('100%'),
    //height: hp('30%'),
    backgroundColor: 'white',
    flexDirection: 'row',
    //justifyContent: 'center',
    //borderRadius: 50,
    //height: 150,
    //justifyContent: 'space-around',
    flex: 1,
  },
  snapButton: {
    //backgroundColor: 'red',
    //flex: 1,
    borderRadius: 80,
    //padding: 15,
    //margin: 15,
    marginTop: 180,
    marginLeft: 150,
    //marginRight: 100,
    //marginLeft: 80,
  },
  galeriSecme: {
    //marginTop: 110,
    //marginLeft: -295,
    //marginBottom: 55,
    //flex: 1,
    marginTop: 195,
  },
  imageContainer: {
    height: '90%',
    marginTop: 430,
    marginLeft: 50,
    backgroundColor: 'white',
  },
  image: {
    margin: 5,
    width: 10,
    height: 10,
  },
});
