import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  PermissionsAndroid,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import {Button, Card, Title, Paragraph} from 'react-native-paper';
import {Header} from 'react-native-elements';
import {Avatar} from 'react-native-elements';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker';
//import Home from './Home';
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default class ProfilScreen extends Component {
  constructor() {
    super();
    this.state = {
      profilResmi: null,
      avatarSource: null,
    };
  }

  extractRequiredImageData = () => {
    let avatarSource = this.props.navigation.state.params;
  };

  uploadPhoto = async (response) => {
    this.setState({
      profilResmi: null,
    });
    const data = new FormData();
    data.append('profil', {
      uri: response.uri,
      type: response.type,
      name: response.fileName,
    });
    data.append('id', 4);
    const config = {
      headers: {
        Accept: 'application/json',
        'Content-type': 'multipart/form-data',
      },
    };
    axios
      .put('http://213.159.30.21/auth/users/4/profil/', data, config)
      .then((res) => {
        const source = {uri: response.uri};
        console.log(source);
        this.setState({
          profilResmi: source,
          //loading: false,
        });
        //console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    //const avatarSource = this.props.navigation.state.params;
    const {getParam} = this.props.navigation;
    const avatarSource = getParam('avatarSource');
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
            //const source = {uri: response.uri};
            /*this.setState({
              avatarSource: source,
            });*/
            //upload başarılı değilse görünmesin diye yorum satırı yaptım
            //this.cropLast(source);
            //this.cropLast();
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
          placement={'left'}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
          }}
          centerComponent={{
            text: 'Profilim',
            style: {fontSize: 20, marginTop: -2},
          }}
          rightComponent={
            {
              //text: 'Devam',
              //color: 'black',
              //style: {fontSize: 16},
            }
          }
          containerStyle={{
            backgroundColor: 'white',
            alignItems: 'space-around',
            marginTop: -10,
          }}
        />
        <View style={styles.cerceve}>
          <View style={styles.üstbanner}>
            <TouchableOpacity onPress={requestGalleryPermission}>
              <Image
                source={this.state.profilResmi}
                style={{width: 100, height: 100, borderRadius: 400 / 2}}
              />
            </TouchableOpacity>
            <View style={styles.ustbanner2}>
              <Text style={styles.kullaniciAdi}>Kullanıcı Adı</Text>
              <Image style={styles.imageYildiz} />
            </View>
            <Text style={styles.degerlendirme}> Değerlendirme></Text>
            <Text style={styles.hakkinda}> Hakkımda</Text>
          </View>
        </View>
        <ScrollableTabView
          style={{marginTop: 5}}
          initialPage={0}
          renderTabBar={() => <ScrollableTabBar />}>
          <Text tabLabel="Ev Yemekleri">
            <Image
              source={avatarSource}
              style={{width: 200, height: 200, marginLeft: 50}}
            />
            <Image
              source={avatarSource}
              style={{width: 200, height: 200, marginLeft: 50}}
            />
            <Image
              source={avatarSource}
              style={{width: 200, height: 200, marginLeft: 50}}
            />
            <Image
              source={avatarSource}
              style={{width: 200, height: 200, marginLeft: 50}}
            />
          </Text>
          <Text tabLabel="Dekorasyon">deko</Text>
          <Text tabLabel="Benim Hikayem">Benim Hikayem</Text>
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  imageBack: {
    width: 100,
    height: 100,
    borderRadius: 50,
    margin: 5,
  },
  üstbanner: {
    flexDirection: 'row',
    marginTop: 15,
  },
  ustbanner2: {
    flexDirection: 'column',
    marginLeft: 10,
  },
  kullaniciAdi: {
    fontSize: 18,
    marginTop: 10,
  },
  imageYildiz: {
    width: 110,
    height: 15,
    marginTop: 10,
  },
  degerlendirme: {
    marginTop: 45,
    fontSize: 15,
  },
  buttonGenel: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  box: {
    width: 200,
    height: 30,
    backgroundColor: '#e5e5e5',
    borderRadius: 7,
  },
  cerceve: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  iconOzellik: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 20,
  },
  hakkinda: {
    marginTop: 80,
    paddingRight: 50,
    marginLeft: -220,
  },
});
