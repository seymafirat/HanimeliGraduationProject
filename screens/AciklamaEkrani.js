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
      this.props.navigation.navigate('KategoriSecme', {
        //apiRequestUrl: JSON.parse(data.id),
        adi: this.state.textBaslik,
        aciklama: this.state.aciklama,
        fiyat: this.state.textFiyat,
      });
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
              onPress: this.checkInput,
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
              onChangeText={(textFiyat) => this.setState({textFiyat})}
              returnKeyType={'next'} //klavyede aşağıda ok yerinde bu yazsın androidde oklar değişiyo
              autoCapitalize="none"
              keyboardType="number-pad"
              placeholder="Ürünün fiyatını girin"
            />
          </View>
          <View style={[{width: '93%', margin: 15, backgroundColor: 'red'}]} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
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
