import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
  Keyboard,
} from 'react-native';
import {styles} from './styles';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from './Home';
import VerilerGelsin from './VerilerGelsin';
import OnizlemeEkrani from './OnizlemeEkrani';
import axios from 'axios';
//import {withNavigation} from 'react-navigation';
import {Header} from 'react-native-elements';
export default class AciklamaEkrani extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBaslik: '',
      aciklama: '',
      textFiyat: '',
      imageList: [],
      lastId: '',
    };
  }
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
  };
*/
  checkInput = () => {
    var fiyat = this.state.textFiyat;
    var baslik = this.state.textBaslik;
    var aciklama = this.state.aciklama;
    if (!fiyat.trim()) {
      this.setState({msg: 'Ürün Fiyatı boş olamaz!'});
    } else if (!baslik.trim()) {
      this.setState({msg: 'Ürün Başlığı boş olamaz!'});
    } else if (!aciklama.trim()) {
      this.setState({msg: 'Ürün Açıklaması boş olamaz'});
    } else {
      this.setState({msg: 'success'});
    }
    Keyboard.dismiss();
  };

  buttonClickListener = () => {
    //const {textBaslik} = this.state;
    //var baslik = this.state.textBaslik;
    //var aciklama = this.state.aciklama;
    //this.props.navigation.navigate('OnizlemeEkrani', baslik);
    //this.props.navigation.navigate('OnizlemeEkrani', aciklama);
    //Alert.alert(textBaslik);
  };
  InsertData = () => {
    this.props.navigation.navigate('KategoriSecme', {
      //apiRequestUrl: JSON.parse(data.id),
      adi: this.state.textBaslik,
      aciklama: this.state.aciklama,
      fiyat: this.state.textFiyat,
    });
  };
  //this.props.navigation.navigate('OnizlemeEkrani');
  //Alert.alert('adi:' + data.adi + 'aciklama:' + data.aciklama);
  //})
  //.catch((error) => console.log(error));
  render() {
    return (
      <View style={styles.aciklamaContainer}>
        <ScrollView>
          <Header
            placement={'left'}
            leftComponent={{
              icon: 'arrow-back',
              color: 'black',
              //onPress: () => this.goGallery(),
            }}
            centerComponent={{
              text: 'Detaylar',
              style: {fontSize: 20, marginTop: -2},
            }}
            rightComponent={{
              text: 'Devam',
              color: 'black',
              style: {fontSize: 16},
              //onPress: this.checkInput,
              onPress: this.InsertData,
            }}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'space-around',
            }}
          />
          <Text style={styles.urunBasligiText}>Ürün Başlığı(5+ Karakter)</Text>
          <Text style={{color: 'red', fontSize: 16, marginLeft: 5}}>
            {' '}
            {this.state.msg}
          </Text>
          <View style={styles.urunBasligi}>
            <TextInput
              {...this.props}
              placeholderTextColor="#ddd"
              style={styles.inputUrunBasligi}
              value={this.state.textBaslik}
              multiline={true}
              textAlignVertical={'top'}
              //ref={this.props.inputRef}
              onChangeText={(textBaslik) => this.setState({textBaslik})}
              returnKeyType={'next'} //klavyede aşağıda ok yerinde bu yazsın androidde oklar değişiyo
              autoCapitalize="none"
              placeholder="Ürünü hızlıca anlatacak bir başlık gir.
            Örn: Cevizli Kızartılmış İçli Köfte"
            />
          </View>
          <View style={styles.urunAciklama}>
            <Text style={styles.urunAciklamaText}>Ürün Açıklaması</Text>
            <TextInput
              {...this.props}
              // mode={'outlined'}
              placeholderTextColor="#ddd"
              style={styles.inputAciklama}
              value={this.state.aciklama}
              multiline={true}
              textAlignVertical={'top'}
              scrollEnabled={true}
              //ref={this.props.inputRef}
              onChangeText={(aciklama) => this.setState({aciklama})}
              returnKeyType={'next'} //klavyede aşağıda ok yerinde bu yazsın androidde oklar değişiyo
              autoCapitalize="none"
              placeholder="Ürünün açıklamasını girin"
            />
          </View>
          <Text style={styles.urunFiyatText}>Ürün Fiyatı</Text>
          <View style={styles.urunFiyat}>
            <TextInput
              {...this.props}
              placeholderTextColor="#ddd"
              style={styles.inputFiyat}
              value={this.state.textFiyat}
              multiline={true}
              textAlignVertical={'top'}
              //ref={this.props.inputRef}
              onChangeText={(textFiyat) => this.setState({textFiyat})}
              returnKeyType={'next'} //klavyede aşağıda ok yerinde bu yazsın androidde oklar değişiyo
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Ürünün fiyatını girin"
            />
          </View>
          <View style={[{width: '93%', margin: 15, backgroundColor: 'red'}]}>
            <Button
              onPress={() => this.InsertData()}
              title="Get Value"
              color="#00B0FF"
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}
