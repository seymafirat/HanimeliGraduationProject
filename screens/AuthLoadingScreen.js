import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class AuthLoading extends React.Component {
  constructor() {
    super();
    this.checkToken();
  }

  checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    if (token) {
      this.props.navigation.navigate('Dashboard');
    } else {
      this.props.navigation.navigate('Login');
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }
}

export default AuthLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
