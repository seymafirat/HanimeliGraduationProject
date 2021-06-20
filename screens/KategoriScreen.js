import 'react-native-gesture-handler';
import React, {Component} from 'react';
//import {createStackNavigator} from '@react-navigation/stack';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class KategoriScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.genel}>
          <View style={styles.buttonsGenel}>
            <TouchableOpacity
              style={styles.buttonsSol}
              onPress={() => {
                navigate('Foods');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: 220,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginRight: 10,
                  }}>
                  {' '}
                  Yemek{' '}
                </Text>
                <Image
                  source={{
                    uri:
                      'https://www.kadinvekadin.net/modul/user/fuimg/202010/16027739510.05241100.jpg',
                  }}
                  style={{width: 100, height: 100}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonsSol}
              onPress={() => {
                navigate('DesignProducts');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginRight: 100,
                }}>
                <Image
                  source={{
                    uri:
                      'https://www.medikaynak.com/assets/uploads/files/images/images/2019/11/bilimsel-sunumlari-dinlemekte-zorlaniyor-musunuz-o-zaman-orgu-orun_v2.jpg',
                  }}
                  style={{width: 100, height: 100, marginRight: 30}}
                />
                <Text
                  style={{
                    fontSize: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Dekorasyon
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonsSol}
              onPress={() => {
                navigate('BabyProducts');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginLeft: 160,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 30,
                  }}>
                  Bebek{' '}
                </Text>
                <Image
                  source={{
                    uri:
                      'https://cdn03.ciceksepeti.com/cicek/kc8293254-1/L/tavsanli---ayakkabili-organik-bebek-hediye-kutusu-kc8293254-1-1c7771459941428880e03d516870b65c.jpg',
                  }}
                  style={{width: 100, height: 100, marginLeft: 10}}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonsSol}
              onPress={() => {
                navigate('DietProducts');
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginRight: 160,
                }}>
                <Image
                  source={{
                    uri:
                      'https://www.diabeteswa.com.au/wp-content/uploads/2020/02/cereals.jpg',
                  }}
                  style={{width: 100, height: 100, marginRight: 30}}
                />
                <Text
                  style={{
                    fontSize: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  Diyet
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsSol}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginLeft: 160,
                }}>
                <Text
                  style={{
                    fontSize: 25,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: 30,
                  }}>
                  Diğer{' '}
                </Text>
                <Image
                  source={{
                    uri:
                      'https://i.elmaelma.com/2/750/430/storage/files/images/2019/03/04/pratik-makyaj-nasil-yapilir-vakti-o-ytEf_cover.jpg',
                  }}
                  style={{width: 100, height: 100, marginLeft: 10}}
                />
              </View>
            </TouchableOpacity>
          </View>
          {/*<Image*/}
          {/*  style={{width: 260, height: 195, marginTop: 175}}*/}
          {/*  source={require('../assets/logo.png')}*/}
          {/*/>*/}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // kategoriText: {
  //
  // },
  buttonsGenel: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 1,
  },
  buttonsSol: {
    width: 350,
    height: 110,
    backgroundColor: 'white',
    borderColor: '#d5d5d5',
    borderWidth: 2,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
});
