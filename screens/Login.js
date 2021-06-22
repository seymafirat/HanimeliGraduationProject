import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      isLoading: false,
    };
  }

  onChangeHandler(name, value) {
    this.setState({
      [name]: value,
    });
  }

  onLoginSubmit() {
    const {username, password} = this.state;
    if (username && password) {
      this.setState({
        isLoading: true,
      });
      const req = {
        username,
        password,
      };
      axios.post('http://213.159.30.21/auth/token/', req).then(
        (res) => {
          AsyncStorage.setItem('token', res.data.access).then((res) => {
            //            alert('Login successful');
            console.log(req);
            this.props.navigation.navigate('Home', {
              username,
            });
            this.setState({
              isLoading: false,
            });
          });
        },
        (err) => {
          Alert.alert('Uyarı', 'Kullanıcı adı veya parola hatalı');
          this.setState({
            isLoading: false,
          });
        },
      );
    } else {
      Alert.alert('Uyarı', 'Kullanıcı adı veya parola boş olmamalıdır!');
    }
  }

  render() {
    const {username, password, isLoading} = this.state;
    return (
      <View style={styles.container}>
        <Image
          style={{width: 230, height: 175, marginLeft: 45}}
          source={require('../assets/logo.png')}
        />
        <View style={styles.loginWrap}>
          <TextInput
            style={styles.inputs}
            placeholder="Kullanıcı adınızı giriniz"
            placeholderTextColor="#333"
            value={username}
            onChangeText={(text) => this.onChangeHandler('username', text)}
          />
          <TextInput
            style={styles.inputs}
            placeholder="Parolanızı giriniz"
            placeholderTextColor="#333"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => this.onChangeHandler('password', text)}
          />
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              ...styles.loginBtn,
              backgroundColor: isLoading ? '#ddd' : '#808C79',
            }}
            onPress={() => {
              this.onLoginSubmit();
            }}>
            <Text style={styles.loginBtnText}>
              {isLoading ? 'Logging in' : 'Login'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  loginWrap: {
    width: '80%',
  },
  inputs: {
    height: 40,
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  loginBtn: {
    height: 40,
    justifyContent: 'center',
    width: '50%',
    alignSelf: 'center',
  },
  loginBtnText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
