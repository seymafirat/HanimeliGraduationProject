import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

export default class UserInfo extends Component {
  state = {
    name: '',
    surname: '',
  };
  componentDidMount = async () => {
    const {
      data: {results},
    } = await axios.get('https://randomuser.me/api/');
    const {
      name: {first, last},
    } = results[0];

    this.setState({
      name: first,
      surname: last,
    });
  };

  render() {
    const {name, surname} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>Kullanıcı Adı: </Text>
          <Text style={styles.text2}>
            {name}
            {surname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>İsim Soyisim: </Text>
          <Text style={styles.text2}>
            {name} {surname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>E-Mail:</Text>
          <Text style={styles.text2}>
            {name} {surname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>Cinsiyet:</Text>
          <Text style={styles.text2}>{name}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>Telefon:</Text>
          <Text style={styles.text2}>{surname}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  kutu: {
    //flexDirection: 'row',
    padding: 10,
    margin: 3,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    borderColor: '#811010',
    backgroundColor: '#f1eeee',
  },
  text1: {
    fontSize: 18,
    color: '#316598',
  },
  text2: {
    fontSize: 20,
    color: '#0a213c',
  },
});
