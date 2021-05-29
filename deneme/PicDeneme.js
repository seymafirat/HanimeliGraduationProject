import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Button,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';
export default class PicDeneme extends Component {
  state = {
    avatarSource: null,
    loading: false,
  };
  uploadPhoto = async (response) => {
    const {getParam} = this.props.navigation;
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
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const {avatarSource, loading} = this.state;
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
          //console.log('İzin verildi');
          launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
            /*const source = {uri: response.uri};
            console.log('of niye olmuyo ya');
            this.setState({
              avatarSource: source,
            });*/
            //upload başarılı değilse görünmesin diye yorum satırı yaptım
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
        <View style={styles.avatarContainer}>
          {avatarSource && (
            <Image
              source={this.state.avatarSource}
              style={{width: 200, height: 200}}
            />
          )}
          {loading && <ActivityIndicator size="large" color="0000ff" />}
        </View>
        <Button title={'select picture'} onPress={requestGalleryPermission} />
      </View>
    );
  }
}
// More info on all the options is below in the API Reference... just some common use cases shown here

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarContainer: {
    marginBottom: 10,
    width: 200,
    height: 200,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: '#ddd',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
