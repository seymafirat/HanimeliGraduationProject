import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  Keyboard,
  Alert,
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
    Alert.alert(
      'Teşekkürler!',
      'Talebini aldık en kısa sürede haftanın enlerinde görüşmek üzere😍',
    );
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
