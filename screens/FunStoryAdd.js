import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import {Header} from 'react-native-elements';
import LottieView from 'lottie-react-native';
export default class FunStoryAdd extends Component {
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
  InsertData = () => {
    const baseURL = 'http://213.159.30.21/service/api/Urun/';
    fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userid: 4,
        //username: userid.username,
        kategoriId: 6,
        altkategoriId: 2,
        adi: this.state.textBaslik,
        aciklama: this.state.aciklama,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const apiRequestUrl = this.state.lastId;
        console.log(
          'RESPONSE >>> ',
          apiRequestUrl,
          JSON.stringify(data, null, 4),
        );
        console.log(JSON.parse(data.id));
        this.props.navigation.navigate('FunCam', {
          apiRequestUrl: JSON.parse(data.id),
          adi: this.state.textBaslik,
          aciklama: this.state.aciklama,
          kategoriId: 6,
        });
        console.log('seyma' + JSON.parse(data.id));
      })
      .catch((error) => console.log(error));
  };

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
    }
    Keyboard.dismiss();
  };
  render() {
    return (
      <View style={styles.aciklamaContainer}>
        <ScrollView>
          <Header
            placement={'left'}
            leftComponent={{
              icon: 'arrow-back',
              color: 'black',
              onPress: () => this.props.navigation.navigate('Home'),
            }}
            centerComponent={{
              text: 'Detaylar',
              style: {fontSize: 20, marginTop: -2, fontWeight: 'bold'},
            }}
            rightComponent={{
              text: 'Devam',
              color: 'black',
              style: {fontSize: 16},
              //onPress: this.checkInput,
              onPress: () => this.InsertData(),
            }}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'space-around',
            }}
          />
          <Text style={styles.urunBasligiText}>Konu Başlığı</Text>
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
              onChangeText={(textBaslik) => this.setState({textBaslik})}
              returnKeyType={'next'}
              autoCapitalize="none"
              placeholder="Hangi konu hakkında birikimlerinizi paylaşacaksınız? Lütfen birkaç kelime ile belirtiniz."
            />
          </View>
          <View style={styles.urunAciklama}>
            <Text style={styles.urunAciklamaText}>Açıklama</Text>
            <TextInput
              {...this.props}
              placeholderTextColor="#ddd"
              style={styles.inputAciklama}
              value={this.state.aciklama}
              multiline={true}
              textAlignVertical={'top'}
              scrollEnabled={true}
              onChangeText={(aciklama) => this.setState({aciklama})}
              returnKeyType={'next'}
              autoCapitalize="none"
              placeholder="Söz sizde!"
            />
          </View>
          <LottieView
            style={styles.lottieView}
            source={require('../animations/1919-share-the-love.json')}
            autoPlay
            loop
          />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  lottieView: {
    height: 150,
    marginLeft: 60,
    marginTop: -60,
  },
  aciklamaContainer: {
    flex: 1,
  },
  urunBasligi: {
    height: 105,
    marginHorizontal: 5,
    marginVertical: 140,
    backgroundColor: 'white',
    //#dcdcdc
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: 10,
  },
  urunBasligiText: {
    fontSize: 20,
    marginTop: 20,
    marginLeft: 5,
  },
  inputUrunBasligi: {
    height: 105,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  urunAciklama: {
    height: 155,
    marginHorizontal: 5,
    marginVertical: 140,
    backgroundColor: 'white',
    //#dcdcdc
    borderRadius: 5,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    marginTop: -70,
  },
  inputAciklama: {
    height: 155,
    paddingHorizontal: 5,
    borderWidth: 2,
    borderRadius: 4,
    borderColor: '#dcdcdc',
    shadowColor: '#dcdcdc',
    shadowOpacity: 0.5,
    shadowRadius: 3,
    color: '#999',
    marginBottom: 12,
    fontSize: 18,
    fontWeight: '600',
  },
  urunAciklamaText: {
    fontSize: 20,
    marginLeft: 5,
    marginTop: -28,
  },
  inputFiyat: {
    backgroundColor: 'white',
    height: 55,
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
  urunFiyatText: {
    fontSize: 20,
    marginLeft: 5,
    marginTop: -100,
  },
});
