import {Component} from 'react';
import * as React from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  View,
} from 'react-native';
//import ImagePicker from 'react-native-image-crop-picker';
import * as ImagePicker from 'react-native-image-picker';
import Video from 'react-native-video';
import Icon from 'react-native-vector-icons/Ionicons';
import {RNCamera} from 'react-native-camera';
import {Header} from 'react-native-elements';
import CameraRoll from '@react-native-community/cameraroll';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
import axios from 'axios';
export default class CameraAndGallery extends Component {
  mediaType: any;
  constructor() {
    super();
    this.state = {
      image: '',
      images: '',
      active: 0,
      cameraType: 'back',
      mirrorMode: false,
      response: null,
    };
    this.pickerOptions = {
      title: 'Yüklemek İçin Resim Seç',
      noData: true, // dosyanın binary verisi gelmemesi için yapıldı
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    this.launchImageLibrary = this.launchImageLibrary.bind(this);
    this.uploadFile = this.uploadFile.bind(this);
  }
  launchImageLibrary() {
    ImagePicker.launchImageLibrary(this.pickerOptions, this.uploadFile);
  }

  uploadFile(response) {
    if (response.didCancel || response.error || response.customButton) {
      return;
    }

    this.setState({
      error: null,
      loading: true,
    });

    // form data türündeki dosya verisi
    const resim = {
      uri: response.uri, // dosyanın yolu
      type: response.type, // dosyanın mimeType değeri
      name: response.fileName || `auto-file-${+new Date()}`, // dosyanın ismi
    };
    // multipart/form-data şeklinde gönderilebilmesi için FormData şeklinde tanımlanıyor
    let formdata = new FormData();
    formdata.append('resim', resim);
    formdata.append('userid', 3);
    //formdata.append('urun', 17);
    formdata.append('adi', 'seymo');
    formdata.append('aciklama', 'denemeseyma');
    formdata.append('fiyat', 44);
    formdata.append('aktifmi', true);
    formdata.append('stok', 2);
    //formdata.append('userid', 2);
    //formdata.append('id', 10);
    formdata.append('kategoriId', 2);
    formdata.append('altkategoriId', 2);

    axios
      .post('http://213.159.30.21/service/api/Urun/', formdata, {
        headers: {
          'Content-Type': 'application/json', // Bu değeri vermek önemli!
          Accept: 'application/json',
        },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
    //var data = JSON.parse(formdata);
    // Sunucuya yükleme işlemi buradan oluyor
    //fetch('http://213.159.30.21/service/api/Urun/', {
    //method: 'POST',
    /*body: JSON.stringify({
        adi: 'deneme',
        aciklama: 'deneme',
        resim: formdata,
        fiyat: 44,
        aktifmi: true,
        stok: 1,
        userid: 2,
        kategoriId: 2,
        altkategoriId: 2,*/
    //}),
    //id: 10,
    /*adi: 'seyma',
      aciklama: 'deneme',
      fiyat: 44,
      stok: 2,
      kategoriId: 2,
      altkategoriId: 2,
      userid: 2,*/
    /*headers: {
        'Content-Type': 'application/json', // Bu değeri vermek önemli!
        Accept: 'application/json',
      },
    })
      .then(res => res.text())
      .then(res => {
        this.setState({
          response: res,
          loading: false,
        });
        console.log(res);
        console.log('basarili');
      })
      .catch(err => {
        this.setState({
          error: err,
          loading: false,
        });
        console.log(err);
        console.log('offff');
      });*/
  }

  requestWriteExternalStoragePermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //console.log('You can use the camera');
      } else {
        //console.log('Camera permission denied');
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
          //alert('Success');
          //this.navigateToInformationPage(data);
        })
        .catch((e) => {
          //alert('err');
          console.log(e);
        });
    }
  };
  navigateToInformationPage = () => {
    this.props.navigation.navigate('AciklamaEkrani', {
      resim: this.state.images,
    });
    //this.props.navigation.navigate('OnizlemeEkrani', foto);
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

  /* goGallery() {
    ImagePicker.openPicker({
      cropping: true,
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then((images) => {
        //this.navigateToInformationPage(images);
        this.setState({
          image: null,
          images: images.map((i) => {
            //console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
              id: i.id,
              //type: i.type,
            };
          }),
        });
      })
      .catch((e) => console.log(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }*/

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
    const {active} = this.state;
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
            onPress: () => this.navigateToInformationPage(),
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
        <View style={styles.viewImages}>
          <FlatList
            data={this.state.resim}
            numColumns={5}
            renderItem={({item}) => (
              <Image
                style={{
                  width: 100,
                  height: 100,
                  marginTop: 10,
                  backgroundColor: 'black',
                }}
                source={{uri: item.uri}}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <View style={styles.buttons}>
          <Icon
            style={styles.galeriSecmeIkonu}
            name="image"
            size={34}
            color={'white'}
            onPress={() => this.launchImageLibrary()}
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
    //marginTop: 15,
  },
});
