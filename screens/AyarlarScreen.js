import 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/FontAwesome';
import React, {Component} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import KullaniciBilgilerim from './UserInfo';
import AdresBilgilerim from './AddressInfo';
import SifreDegisim from './PasswordInfo';
import HolidayMood from './HolidayMood';

export default class AyarlarScreen extends Component {
  static navigationOptions = {
    title: 'Ayarlar',
    headerStyle: {
      backgroundColor: '#FFF7A2',
      // textAlign: 'center',
      // alignItems: 'center',
      // justifyContent: 'center',
    },
  };
  render() {
    const {navigate, goBack} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.cerceve}>
          <View style={styles.buttonAyarlar}>
            <TouchableOpacity
              onPress={() => navigate('KullaniciBilgilerim')}
              style={styles.AyarlarMenu}>
              <View style={styles.iconAyarlar}>
                <Icon name="user" size={30} color="#a5a5a5" />
              </View>
              <View style={styles.genelTextIcon}>
                <Text style={styles.ayarlarText}>Kullanıcı Bilgilerim </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('AdresBilgilerim')}
              style={styles.AyarlarMenu}>
              <View style={styles.iconAyarlar}>
                <Icon name="map-marker" size={30} color="#a5a5a5" />
              </View>
              <View style={styles.genelTextIcon}>
                <Text style={styles.ayarlarText}>Adres Bilgilerim</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('SifreDegisim')}
              style={styles.AyarlarMenu}>
              <View style={styles.iconAyarlar}>
                <Icon name="unlock" size={30} color="#a5a5a5" />
              </View>
              <View style={styles.genelTextIcon}>
                <Text style={styles.ayarlarText}>Şifre Değişikliği</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('HolidayMood')}
              style={styles.AyarlarMenu}>
              <View style={styles.iconAyarlar}>
                <Icon name="plane" size={30} color="#a5a5a5" />
              </View>
              <View style={styles.genelTextIcon}>
                <Text style={styles.ayarlarText}>Tatil Modu</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => Linking.openURL('https://www.brkdgn.com')}
              style={styles.AyarlarMenu}>
              <View style={styles.iconAyarlar}>
                <Icon name="question" size={30} color="#a5a5a5" />
              </View>
              <View style={styles.genelTextIcon}>
                <Text style={styles.ayarlarText}>Yardım</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate('goBack()')}
              style={styles.AyarlarMenu}>
              <View style={styles.iconAyarlar}>
                <Icon name="sign-out" size={30} color="#a5a5a5" />
              </View>
              <View style={styles.genelTextIcon}>
                <Text style={styles.ayarlarText}>Çıkış</Text>
              </View>
            </TouchableOpacity>
          </View>
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
  AyarlarMenu: {
    alignItems: 'center',
    fontSize: 30,
    justifyContent: 'space-around',
    borderColor: '#d5d5d5',
    borderWidth: 0.5,
    flexDirection: 'row',
  },
  ayarlarText: {
    fontSize: 25,
    padding: 10,
    textAlign: 'center',
    flexDirection: 'row',
  },
  cerceve: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 5,
    paddingVertical: 20,
    paddingHorizontal: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    elevation: 3,
  },
  iconAyarlar: {
    marginLeft: 20,
  },
  genelTextIcon: {
    width: 280,
    height: 60,
    marginRight: 45,
  },
});
