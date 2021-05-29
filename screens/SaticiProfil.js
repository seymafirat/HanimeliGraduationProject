import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import 'react-native-gesture-handler';
export default class SaticiProfil extends Component {
  static navigationOptions = ({navigation}) => {
    const user = navigation.getParam('user');

    return {
      title: `${user.name.first} ${user.name.last}`,
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>Contact Detail</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
