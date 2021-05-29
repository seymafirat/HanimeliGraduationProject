import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

class Dashboard extends React.Component {
  logout() {
    AsyncStorage.removeItem('token').then((res) => {
      this.props.navigation.navigate('Auth');
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcomeText}>Welcome to Your Dashboard</Text>
        <TouchableOpacity
          style={styles.loginBtn}
          activeOpacity={0.8}
          onPress={() => this.logout()}>
          <Text style={styles.loginBtnText}>Logout</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: '100',
    marginBottom: 10,
  },
  loginBtn: {
    backgroundColor: '#f00',
    height: 40,
    justifyContent: 'center',
    width: 100,
    alignSelf: 'center',
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
