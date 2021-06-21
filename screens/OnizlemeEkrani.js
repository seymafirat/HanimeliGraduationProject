import React, {Component} from 'react';
import {
  Alert,
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Platform,
} from 'react-native';
//import {styles} from './styles';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {Header} from 'react-native-elements';
export default class OnizlemeEkrani extends Component {
  constructor(props) {
    super();
    this.state = {
      infoList: [],
      imageList: [],
      response: null,
    };
    //const aciklama = this.props.navigation.state.params;
  }
  InsertData = (response) => {
    const {getParam} = this.props.navigation;
    const ad = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');

    const formData = new FormData();
    formData.append('adi', ad);
    formData.append('aciklama', aciklama);
    formData.append('fiyat', fiyat);
    formData.append('aktifmi', true);
    formData.append('stok', 5);
    formData.append('userid', 3);
    formData.append('kategoriId', 2);
    formData.append('altkategoriId', 2);
    console.log(formData);
    axios
      .post('http://213.159.30.21/service/api/Urun/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        console.log(response);
        console.log('ok');
      })
      .catch((error) => {
        console.log(error);
        console.log('no');
      });
  };
  navigateToProfileScreen = () => {
    const {getParam} = this.props.navigation;
    const avatarSource = getParam('avatarSource');
    this.props.navigation.navigate('ProfilScreen', {
      avatarSource,
    });
  };
  render = () => {
    const {getParam} = this.props.navigation;
    const adi = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');
    const avatarSource = getParam('avatarSource');
    const kategori = getParam('kategori');

    return (
      <View style={styles.OnizlemeEkraniContainer}>
        <Header
          placement={'left'}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
            onPress: () => this.props.navigation.navigate('CameraAndGallery'),
          }}
          centerComponent={{
            text: 'Önizleme Ekranı',
            style: {fontSize: 20, marginTop: -1, fontWeight: 'bold'},
          }}
          containerStyle={{
            backgroundColor: 'white',
            alignItems: 'space-around',
            marginTop: -10,
          }}
        />
        <View style={styles.FotografEkrani}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Fotoğraflar</Text>
          <View style={styles.avatarContainer}>
            <Image source={avatarSource} style={{width: 100, height: 100}} />
          </View>
          <TouchableOpacity style={styles.EkleDuzenle}>
            <Text style={{color: 'red'}}>Ekle/Düzenle</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.BaslikKontrol}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ürün Başlığı</Text>
          <Text style={{fontSize: 20, marginTop: 10}}>{adi}</Text>
        </View>
        <View style={styles.AciklamaKontrol}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            Ürün Açıklaması
          </Text>
          <Text style={{fontSize: 20, marginTop: 10}}>{aciklama}</Text>
        </View>
        <View style={styles.KategoriKontrol}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Kategori</Text>
          <Text style={{fontSize: 20, marginTop: 10}}>{kategori}</Text>
        </View>
        <View style={styles.FiyatKontrol}>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>Ürünün Fiyatı</Text>
          <Text style={{fontSize: 20, marginTop: 10}}>{fiyat}</Text>
        </View>
        <TouchableOpacity
          style={styles.Onay}
          onPress={() => this.navigateToProfileScreen()}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              marginLeft: 120,
              marginTop: 5,
            }}>
            ONAYA GÖNDER
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
}

const styles = StyleSheet.create({
  OnizlemeEkraniContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: 10,
  },
  FotografEkrani: {
    backgroundColor: 'white',
    height: 135,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 7,
    marginHorizontal: 5,
  },
  EkleDuzenle: {
    marginLeft: 300,
    marginTop: -20,
  },
  BaslikKontrol: {
    backgroundColor: 'white',
    height: 75,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 5,
    marginHorizontal: 5,
  },
  AciklamaKontrol: {
    backgroundColor: 'white',
    height: 105,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 5,
    marginHorizontal: 5,
  },
  KategoriKontrol: {
    backgroundColor: 'white',
    height: 75,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 5,
    marginHorizontal: 5,
  },
  FiyatKontrol: {
    backgroundColor: 'white',
    height: 75,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 5,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    marginTop: 5,
    marginHorizontal: 5,
  },
  Onay: {
    backgroundColor: 'red',
    width: '100%',
    height: 40,
  },
});
