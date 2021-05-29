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
import {styles} from './styles';
import axios from 'axios';
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
    /*resim = {
      uri: response.uri,
      type: response.mime,
      name: response.fileName,
    };*/
    // const newImage = ...resim;
    const formData = new FormData();
    formData.append('adi', ad);
    formData.append('aciklama', aciklama);
    formData.append('fiyat', fiyat);
    //    formData.append('resim', resim);
    /*resim,
      uri: resim.uri, // dosyanın yolu
      type: resim.type, // dosyanın mimeType değeri
      name: resim.name || `auto-file-${+new Date()}`,
    });*/
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
          //Accept: 'application/json',
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
    /*componentDidMount() {
      this.extractRequiredImageData();
    }

    extractRequiredImageData = () => {
      let data = this.props.navigation.state.params;
      let imageList = [];

      for (let i = 0; i < Object.keys(data).length; i++) {
        let foto = data[String(i)];
        let image = {
          id: String(i),
          contentType: foto.mime,
          fileSize: foto.size,
          filePath: foto.path,
        };
        console.log(foto.path);

        if (Platform.OS === 'android') {
          image.fileName = foto.filename;
        } else {
          let path = foto.path.split('/');
          image.fileName = path[path.length - 1];
        }

        imageList.push(image);
      }
      this.setState({
        imageList,
      });
    };*/
    /*componentDidMount() {
      this.getContacts();
    }

    getContacts = async () => {
      const {
        data: {results: infoList},
      } = await axios.get('https://randomuser.me/api/?results=30');
      this.setState({
        infoList,
        //loading: false,
      });
    };*/

    /*async makeRequests() {
      let [u1, u2] = await Promise.all([
        axios.get('https://api.github.com/users/janbodnar'),
        axios.get('https://api.github.com/users/symfony'),
      ]);

      //console.log(`Jan Bodnar: ${u1.data.created_at}`);
      //console.log(`Symfony: ${u2.data.created_at}`);
    }*/
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
    //const adi = this.props.navigation.state.params;
    //const aciklama = this.props.navigation.state.params;
    return (
      <View style={styles.OnizlemeEkraniContainer}>
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

//const styles = StyleSheet.create({});
