import React, {Component} from 'react';
import {StyleSheet, Text, View, Platform} from 'react-native';
import {ActionSheet, Root} from 'native-base';

export default class VerilerGelsin extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    //console.log(this.props);
    const baslik = this.props.navigation.state.params;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text style={{fontSize: 20, marginTop: 10}}>data is {baslik}</Text>
        <Text style={{fontSize: 20, marginTop: 10}}> aa </Text>
      </View>
    );
  }

  //const baslik  = props.route.params.baslik;
}

const styles = StyleSheet.create({});
