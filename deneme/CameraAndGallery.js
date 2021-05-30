import {Component} from 'react';
import * as React from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
//import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';
import {Header} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
export default class CameraAndGallery extends Component {
  mediaType: any;
  constructor() {
    super();
    this.state = {
      //image: '',
      //images: '',
      active: 0,
      cameraType: 'back',
      mirrorMode: false,
      avatarSource: null,
      loading: false,
      data: '',
      //response: null,
    };
  }
  uploadPhoto = async (response) => {
    const {getParam} = this.props.navigation;
    const adi = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');
    const kategori = getParam('kategori');
    const apiRequestUrl = getParam('apiRequestUrl');
    console.log('eslem');
    console.log(apiRequestUrl);
    const baseURL =
      'http://213.159.30.21/service/api/Urun/' + apiRequestUrl + '/resim/';
    console.log(baseURL);
    console.log('seymo');
    this.setState({
      avatarSource: null,
      loading: true,
    });
    const data = new FormData();
    data.append('resim', {
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    });
    console.log('anamm');
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'multipart/form-data',
      },
    };
    console.log('deneme');
    axios
      .post(baseURL, data, config)
      .then((res) => {
        const source = {uri: response.uri};
        this.setState({
          avatarSource: source,
          loading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  navigateToPreviewScreen = () => {
    const {getParam} = this.props.navigation;
    const adi = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');
    const kategori = getParam('kategori');
    this.props.navigation.navigate('OnizlemeEkrani', {
      avatarSource: this.state.avatarSource,
      aciklama,
      fiyat,
      adi,
      kategori,
    });
  };
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

      CameraRoll.save(data.uri, 'photo')
        .then(() => {
          Alert.alert('Selam!', 'Şaheserinize galeriden ulaşabilirsiniz');
          //alert('Success');
          //this.navigateToInformationPage(data);
        })
        .catch((e) => {
          //alert('err');
          console.log(e);
        });
    }
  };
  change(nativeEvent) {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== this.state.active) {
        this.setState({
          active: slide,
        });
      }
    }
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }
  cropLast() {
    ImagePicker.openCropper({
      path: this.state.avatarSource.uri,
      width: 200,
      height: 200,
    })
      .then((avatarSource) => {
        console.log('received cropped image', avatarSource);
        this.setState({
          avatarSource: {
            uri: avatarSource.path,
            width: avatarSource.width,
            height: avatarSource.height,
            mime: avatarSource.mime,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }

  renderVideo(video) {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 200}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={(e) => console.log(e)}
          onLoad={(load) => console.log(load)}
          repeat={true}
        />
      </View>
    );
  }

  renderImage(image) {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }
  changeCameraType() {
    if (this.state.cameraType == 'back') {
      console.log('doki');
      this.setState({
        cameraType: 'front',
        mirrorMode: true,
      });
      console.log('oki');
    } else {
      this.setState({
        cameraType: 'back',
        mirrorMode: false,
      });
    }
  }
  render() {
    const {active, avatarSource, loading} = this.state;
    const requestGalleryPermission = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            title: 'Galeri İzni',
            message:
              'Fotoğraf görüntüleme ve yükleme için dosya okuma izni vermeniz gereklidir.',
            buttonNeutral: 'Daha Sonra Sor',
            buttonNegative: 'İptal',
            buttonPositive: 'Tamam',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('calisiyo');
          const options = {
            title: 'Select Photo',
            cancelButtonTitle: 'cancel',
            takePhotoButtonTitle: 'camera',
            chooseFromLibraryButtonTitle: 'gallery',
            customButtons: [
              {name: 'fb', title: 'Choose Photo from Facebook'},
              {name: 'other', title: 'other'},
            ],
            storageOptions: {
              skipBackup: true, //yedeklenmesin
              path: 'images',
              allowsEditing: true, //olmuyo cunku androidde yok
            },
          };
          launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            this.uploadPhoto(response);
            console.log('nolcak');
            //}
          });
        } else {
          console.log('İzin verilmedi');
        }
      } catch (err) {
        console.warn(err);
      }
    };
    return (
      <View style={styles.container}>
        <Header
          leftComponent={{
            icon: 'close',
            color: '#fff',
            //onPress: () => this.goGallery(),
          }}
          centerComponent={
            <Icon
              name="camera-reverse"
              size={30}
              color={'white'}
              onPress={() => this.changeCameraType(this)}
            />
          }
          rightComponent={{
            icon: 'arrow-forward',
            color: '#fff',
            onPress: () => this.navigateToPreviewScreen(),
          }}
          containerStyle={{
            backgroundColor: 'black',
            alignItems: 'space-around',
          }}
        />
        {
          <RNCamera
            ratio={'1:1'}
            ref={(ref) => {
              this.camera = ref;
            }}
            //type={RNCamera.Constants.Type.back}
            type={this.state.cameraType}
            flashMode={RNCamera.Constants.FlashMode.off}
            mirrorImage={this.state.mirrorMode}
            style={styles.preview}
          />
        }
        <TouchableOpacity onPress={() => this.cropLast()} style={styles.button}>
          <Text style={styles.text}>Crop Last Selected Image</Text>
        </TouchableOpacity>
        <View style={styles.viewImages}>
          <TouchableOpacity onPress={() => this.cropLast()}>
            <Image
              source={this.state.avatarSource}
              style={{width: 100, height: 100}}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttons}>
          <Icon
            style={styles.galeriSecmeIkonu}
            name="image"
            size={34}
            color={'white'}
            onPress={requestGalleryPermission}
          />
          <Icon
            style={styles.cameraButtons}
            name="camera"
            size={50}
            color={'white'}
            onPress={() => this.takePhoto()}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    height: '100%',
    padding: 5,
    flex: 1,
    flexDirection: 'column',
  },
  image: {
    margin: 5,
    width: '50%',
    height: 150,
  },
  viewImages: {
    marginTop: -2,
    height: '20%',
    padding: 5,
  },
  cameraButtons: {
    marginLeft: 140,
  },
  galeriSecmeIkonu: {
    marginTop: 8,
  },
  buttons: {
    flexDirection: 'row',
    marginTop: -25,
  },
  preview: {
    height: width,
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
});
