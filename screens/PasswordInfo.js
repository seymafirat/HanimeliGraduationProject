import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  View,
  Button,
  TouchableOpacity,
  Linking,
} from 'react-native';

export default class PasswordInfo extends Component {
  render() {
    return (
      <SafeAreaView style={styles.container}>
        <TextInput style={styles.kutu} placeholder="Mevcut Şifre" />
        <TextInput style={styles.kutu} placeholder="Yeni Şifre" />
        <TextInput style={styles.kutu} placeholder="Yeni Şifre/Tekrar" />
        <View style={styles.kaydet}>
          <Button title={'Kaydet'} onPress={() => {}} color="#841584" />
        </View>
        <TouchableOpacity
          onPress={() => Linking.openURL('https://www.brkdgn.com')}>
          <Text style={{fontSize: 16, color: '#600460', marginLeft: 10}}>
            Şifreni mi Unuttun?
          </Text>
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
    padding: 8,
    margin: 6,
    borderBottomWidth: 2,
    borderBottomColor: '#eee',
    //marginLeft: 10,
    backgroundColor: '#f1eeee',
  },
  // text1: {
  //   fontSize: 18,
  // },
  // text2: {
  //   fontSize: 20,
  // },
  kaydet: {
    margin: 8,
    borderRadius: 5,
  },
});
