import React from 'react';
import {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
//import {Component} from 'react';

let data = new FormData();
export default class App extends Component {
  pickMultiple = () => {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then((images) => {
        images: images.map((item, index) => {
          data.append('urunresim', {
            urunresim: item.path,
            type: 'image/jpeg',
            urun: item.filename || 'temp_image_${index}.jpg',
          });
        });
      })
      .catch((e) => alert(e));
  };
  upload = () => {
    console.log(JSON.stringify(data));
    console.log('nneden');
    fetch(
      'http://213.159.30.21/service/api/UrunResimler/%7Bid%7D/resim_ekle/',
      {
        method: 'Post',
        headers: {
          //'Content-type': 'multipart/form-data',
          //Accept: 'application/json',
          'Content-Type': 'application/json',
          //Connection: 'close',
          //type: 'getUserData',
        },
        body: {
          userid: '1',
          //urun : fileName,
          urunResim: data,
        },
      },
    )
      .then((res) => res.json())
      .then((res) => {
        console.log('seyma');
        console.log(res);
        console.log('success');
      })
      .catch((err) => {
        console.log('of');
        console.error('error', err);
      });
  };
  render() {
    return (
      <View>
        <Button
          style={styles.button}
          onPress={this.pickMultiple}
          title={'multiple'}
        />
        <Button style={styles.button} onPress={this.upload} title={'select'} />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
});
