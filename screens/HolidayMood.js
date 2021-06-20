import React, {Component} from 'react';
import {Image, StyleSheet, Text, View, Switch} from 'react-native';
import {Header} from 'react-native-elements';
//import Icon from 'react-native-vector-icons/Ionicons';
//import MyLeftComponent from '../components/MyLeftComponent';

export default class HolidayMood extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{barStyle: 'light-content'}}
          barStyle="light-content"
          //leftComponent={<MyLeftComponent />}
          centerComponent={{
            text: 'Tatil Modu',
            style: {color: '#000', fontSize: 20},
          }}
          containerStyle={{
            backgroundColor: '#92cbf6',
            justifyContent: 'space-around',
            height: 60,
          }}
        />
        {/*<Image*/}
        {/*  style={{width: '100%', height: 180, marginTop: 2}}*/}
        {/*  source={require('../assets/tatil.jpg')}*/}
        {/*/>*/}
        <View style={styles.tatilModu}>
          <Text style={styles.modYazi}>Tatil Modu</Text>
          <Switch
            style={styles.switch}
            trackColor={{false: '#767577', true: '#81b0ff'}}
            //thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            //backgroundColor="#f2f2f2"
            //onValueChange={toggleSwitch}
            //value={isEnabled}
          />
        </View>
        <View style={styles.bilgilendirme}>
          <Text style={styles.bilgilendirmeYazisi}>
            ->Ürünler yayından kaldırılır.Alıcılar ürünleri göremez ve satın
            alamaz.
          </Text>
          <Text style={styles.bilgilendirmeYazisi}>
            ->Eklediğin yeni ürünler yayınlanmaz. Tatil modunu kapattığında
            ürünlerin tekrardan satışta olur, iyi tatiller özletme kendini :)
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  header: {
    backgroundColor: '#f2f2f2',
    width: '100%',
    height: 50,
  },
  yazi: {
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
    color: 'black',
  },
  tatilModu: {
    backgroundColor: '#dcdcdc',
    width: '100%',
    height: 50,
  },
  modYazi: {
    color: 'black',
    fontSize: 20,
    marginTop: 10,
    marginLeft: 10,
  },
  bilgilendirme: {
    width: '100%',
    backgroundColor: '#bebebe',
    height: 415,
  },
  bilgilendirmeYazisi: {
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
  },
  switch: {
    marginTop: -27,
    marginRight: 10,
  },
});
