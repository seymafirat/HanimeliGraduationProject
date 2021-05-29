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
} from 'react-native';

export default class KategoriScreen extends Component {
  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <TextInput placeholder="Search..." style={styles.searchInput} />
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
            <Text style={styles.kategoriText}>Hediyelik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsSol}>
            <Text style={styles.kategoriText}>Bebek</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsSol}>
            <Text style={styles.kategoriText}>Organik</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttonsSol}>
            <Text style={styles.kategoriText}>Diyet</Text>
          </TouchableOpacity>
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
  searchInput: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#d5d5d5',
    borderWidth: 1,
    borderRadius: 15,
    marginTop: 1,
  },
  kategoriText: {
    fontSize: 14,
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
    width: 110,
    height: 71.6,
    backgroundColor: '#fff',
    borderColor: '#d5d5d5',
    borderWidth: 1,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
