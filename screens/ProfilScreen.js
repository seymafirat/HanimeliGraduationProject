import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  PermissionsAndroid,
  Platform,
  ImageBackground,
  ActivityIndicator,
  Image,
  FlatList,
  TextInput,
  SafeAreaView,
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
import AsyncStorage from '@react-native-community/async-storage';
const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

const token = AsyncStorage.getItem('token');
console.log(token);
export default class ProfilScreen extends Component {
  constructor() {
    super();
    this.state = {
      avatarSource: null,
      name: '',
      profilResmi: '',
      resim: '',
      username: '',
      all: [],
      surname: '',
      alldata: [],
      loading: true,
      detailname: '',
      detailcost: '',
      detailimage: '',
      detailaciklama: '',
      profil: '',
    };
  }
  componentDidMount() {
    axios.get('http://213.159.30.21/auth/users/10/').then((user) => {
      //console.log(user.data);
      this.setState({
        name: user.data,
      });
    });
    axios.get('http://213.159.30.21/service/api/Urun/').then((user) => {
      //console.log(user);
      this.setState({
        all: user.data,
        alldata: user.data,
      });
    });
  }
  onClickAddFav(data) {
    const itemfav = {
      all2: data,
      quantity: 1,
      name: data.adi,
      surname: data.aciklama,
      res: data.resim,
      fiy: data.fiyat,
    };

    AsyncStorage.getItem('fav')
      .then((datafav) => {
        if (datafav !== null) {
          // We have data!!
          const fav = JSON.parse(datafav);
          fav.push(itemfav);
          AsyncStorage.setItem('fav', JSON.stringify(fav));
        } else {
          const fav = [];
          fav.push(itemfav);
          AsyncStorage.setItem('fav', JSON.stringify(fav));
        }
        alert('Add Fav');
      })
      .catch((err) => {
        alert(err);
      });
  }
  onClickAddCart(data) {
    const itemcart = {
      all2: data,
      quantity: 1,
      name: data.adi,
      surname: data.aciklama,
      res: data.resim,
      fiy: data.fiyat,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        }
        alert('Add Cart');
      })
      .catch((err) => {
        alert(err);
      });
  }

  extractRequiredImageData = () => {
    let avatarSource = this.props.navigation.state.params;
  };
  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    const {name, surname, resim, loading} = this.state;
    if (item.userid == 'zehra34') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              navigate('Detail', {
                detailname: item.adi,
                detailcost: item.fiyat,
                detailimage: item.resim,
                detailaciklama: item.aciklama,
              });
            }}
            style={[styles.itemContainer, {backgroundColor: '#fafafa'}]}>
            <View style={styles.container}>
              <View style={styles.general}>
                <Image style={styles.avatar} source={{uri: item.resim}} />
                <View style={styles.textContainer}>
                  <View style={{width: 8}} />
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'white',
              marginTop: -15,
            }}>
            <TouchableOpacity
              style={{
                width: 70,
                height: 50,
                // backgroundColor: '#efefef',
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 5,
              }}
              onPress={() => this.onClickAddCart(item)}>
              <Icon name="cart" size={30} color={'black'} />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                width: 70,
                height: 50,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 4,
                borderRadius: 5,
              }}
              onPress={() => this.onClickAddFav(item)}>
              <Icon name="heart" size={30} color={'black'} />
            </TouchableOpacity>
          </View>
        </View>
      );
    }
  };
  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
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
      .put('http://213.159.30.21/auth/users/3/profil/', data, config)
      .then((res) => {
        const source = {uri: response.uri};
        console.log(source);
        this.setState({
          profilResmi: source,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };
  render() {
    const {name, surname, resim, loading} = this.state;
    //const avatarSource = this.props.navigation.state.params;
    const {getParam} = this.props.navigation;
    const avatarSource = getParam('avatarSource');
    const username = getParam('username');
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
          style={{marginTop: -40}}
          placement={'left'}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
            onPress: () => this.props.navigation.navigate('Home'),
          }}
          centerComponent={{
            text: 'Profilim',
            style: {fontSize: 20, marginTop: -2, fontWeight: 'bold'},
          }}
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
                //source={{uri: name.profil}}
                //source={this.state.profilResmi}
                source={require('../assets/profilephoto.jpg')}
                style={{width: 100, height: 100, borderRadius: 400 / 2}}
              />
            </TouchableOpacity>
            <View style={styles.ustbanner2}>
              <Text style={styles.kullaniciAdi}>{name.username}</Text>
              <Text style={styles.kullaniciAdi}>
                {name.first_name} {name.last_name}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.degerlendirme}
              onPress={() => this.props.navigation.navigate('VideoPlayer')}>
              <Text style={{color: 'red'}}>Nasıl Ürün Yüklerim? </Text>
            </TouchableOpacity>
          </View>
        </View>
        <SafeAreaView style={styles.flat}>
          <View />
          <FlatList
            ListFooterComponent={this.renderFooter}
            //ListHeaderComponent={this.renderHeader()}
            numColumns={2}
            renderItem={this.renderContactsItem}
            data={this.state.all}
          />
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingBottom: 20,
  },
  urunler: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  avatar: {
    width: 185,
    height: 170,
  },
  flat: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginLeft: 5,
  },
  imageYildiz: {
    width: 110,
    height: 15,
    marginTop: 10,
  },
  degerlendirme: {
    marginLeft: -8,
    marginTop: 125,
    fontSize: 15,
    color: 'red',
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
    marginLeft: -190,
  },
});
