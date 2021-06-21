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
    username: '',
    name: '',
    surname: '',
  };
  componentDidMount() {
    axios
      .get('http://213.159.30.21/auth/users/3/')
      .then((User) => User.data)
      .then((User) => {
        console.log(User);
        this.setState({
          username: User.username,
          name: User.first_name,
          surname: User.last_name,
          email: User.email,
        });
      });
  }
  render() {
    const {username, name, surname, email} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>Kullanıcı Adı: </Text>
          <Text style={styles.text2}> {username} </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>İsim Soyisim: </Text>
          <Text style={styles.text2}>
            {name} {surname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>E-Mail:</Text>
          <Text style={styles.text2}>{email}</Text>
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
