import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';

export default class Announcement extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.cerceve}>
          <View style={styles.kampGenel}>
            <View style={styles.kampGenelSol}>
              <Text style={styles.kampText}>
                Şimdi Tatil Modu ile dilediğiniz zaman dinlenme molası
                verebilirsiniz!
              </Text>
            </View>
            <Image
              style={styles.imageKampanya}
              source={require('../assets/avatar.png')}
            />
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
  kampanyaText: {
    fontSize: 22,
    marginVertical: 8,
    fontWeight: 'bold',
  },
  kampGenel: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  kampGenelSol: {
    width: 200,
    flexDirection: 'column',
    paddingVertical: 30,
    borderWidth: 1,
    borderColor: '#d5d5d5',
  },
  kampText: {
    fontSize: 17,
    margin: 15,
    textAlign: 'center',
  },
  kampTextDetay: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
  cerceve: {
    backgroundColor: '#fff',
    marginHorizontal: 10,
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
  imageKampanya: {
    width: 180,
    height: 180,
  },
});
