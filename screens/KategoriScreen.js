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
        <TextInput placeholder="Search..." style={styles.searchInput} />
        <View style={styles.genel}>
          <View style={styles.buttonsGenel}>
            <TouchableOpacity style={styles.buttonsSol}>
              <Text style={styles.kategoriText}>Yemek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsSol}>
              <Text style={styles.kategoriText}>Dekorasyon</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsSol}>
              <Text style={styles.kategoriText}>El İşi</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsSol}>
              <Text style={styles.kategoriText}>Bebek</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonsSol}>
              <Text style={styles.kategoriText}>Diyet</Text>
            </TouchableOpacity>
          </View>
          <Image
            style={{width: 260, height: 195, marginTop: 175}}
            source={require('../assets/logo.png')}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#d5d5d5',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 1,
  },
  genel: {
    flexDirection: 'row',
  },
  kategoriText: {
    fontSize: 18,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonsGenel: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginTop: 1,
  },
  buttonsSol: {
    width: 175,
    height: 110,
    backgroundColor: '#fff',
    borderColor: '#d5d5d5',
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 1,
  },
});
