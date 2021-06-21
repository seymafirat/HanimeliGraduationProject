import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
} from 'react-native';
import {styles} from './styles';
import {Header} from 'react-native-elements';
export default class FunStoryAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textBaslik: '',
      aciklama: '',
      imageList: [],
      lastId: '',
    };
  }
  checkInput = () => {
    var baslik = this.state.textBaslik;
    var aciklama = this.state.aciklama;
    if (!baslik.trim()) {
      this.setState({msg: 'Konu başlığı boş olamaz!'});
    } else if (!aciklama.trim()) {
      this.setState({msg: 'Açıklama boş olamaz'});
    } else {
      //this.setState({msg: 'success'});
    }
    Keyboard.dismiss();
  };

  InsertData = () => {
    const baseURL = 'http://213.159.30.21/service/api/Urun/';
    fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userid: 'seyma',
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
        this.props.navigation.navigate('TalkScreen', {
          apiRequestUrl: JSON.parse(data.id),
          adi: this.state.textBaslik,
          aciklama: this.state.aciklama,
          kategori: 6,
        });
      })
      .catch((error) => console.log(error));
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
              onPress: () => this.props.navigation.navigate('VideoPage'),
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
              onPress: this.InsertData,
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
          <View style={[{width: '93%', margin: 15, backgroundColor: 'red'}]} />
        </ScrollView>
      </View>
    );
  }
}
