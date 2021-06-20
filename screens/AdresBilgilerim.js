import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from 'react-native';
import axios from 'axios';

export default class AdresBilgilerim extends Component {
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
          <Text style={styles.text1}>Kayıtlı Adresim: </Text>
          <Text style={styles.text2}>
            {name}
            {surname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>Şehir: </Text>
          <Text style={styles.text2}>
            {name} {surname}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.kutu}>
          <Text style={styles.text1}>İlçe:</Text>
          <Text style={styles.text2}>
            {name} {surname}
          </Text>
        </TouchableOpacity>
        <Button
          title={'Adres Yenile'}
          onPress={() => {}}
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
        />
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
    padding: 8,
    margin: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    //marginLeft: 10,
    backgroundColor: '#f1eeee',
  },
  text1: {
    fontSize: 18,
    color: '#b773b7',
  },
  text2: {
    fontSize: 20,
    color: '#3b043b',
  },
  button1: {
    color: '#837d7d',
    borderRadius: 2,
  },
});
