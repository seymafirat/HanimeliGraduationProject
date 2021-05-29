/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  Alert,
} from 'react-native';

export default class HomeActivity extends Component {
  constructor(props) {
    super(props);
    this.state = {
      TextInputValue: '',
    };
  }

  buttonClickListener = () => {
    const {TextInputValue} = this.state;
    Alert.alert(TextInputValue);
  };

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Retrieve TextInput entered value on Button Click
        </Text>

        <TextInput
          style={{
            height: 45,
            width: '95%',
            borderColor: 'gray',
            borderWidth: 2,
          }}
          // Adding hint in TextInput using Placeholder option.
          placeholder=" Enter Your First Name"
          //set the value in state.
          onChangeText={(TextInputValue) => this.setState({TextInputValue})}
          // Making the Under line Transparent.
          underlineColorAndroid="transparent"
        />

        <View style={[{width: '93%', margin: 15, backgroundColor: 'red'}]}>
          <Button
            onPress={this.buttonClickListener}
            title="Get Value"
            color="#00B0FF"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e5e5e5',
  },
  headerText: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    fontWeight: 'bold',
  },
});
