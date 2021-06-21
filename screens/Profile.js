import React, {Component} from 'react';
import {StyleSheet, Text, View, Button, FlatList, Image} from 'react-native';
import axios from 'axios';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default class Profile extends Component {
  state = {
    us: '',
    contacts: [],
  };
  componentDidMount() {
    axios.get('http://213.159.30.21/auth/users/4/').then((user) => {
      console.log(user);
      this.setState({
        all: user.data,
      });
    });
  }
  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const detailname2 = navigation.getParam('detailname2');
    const detailcost2 = navigation.getParam('detailcost2');
    const detailimage2 = navigation.getParam('detailimage2');
  };
  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const detailname2 = navigation.getParam('detailname2');
    const detailcost2 = navigation.getParam('detailcost2');
    const detailimage2 = navigation.getParam('detailimage2');

    return (
      <View style={styles.container}>
        <Text>{this.state.us}</Text>
        <Image style={styles.avatar} source={{uri: detailimage2}} />
        <View style={styles.textContainer}>
          <Text>{detailname2}</Text>
          <Text>{detailcost2}</Text>
        </View>
        {/*<Button*/}
        {/*  title="go to flat page"*/}
        {/*  onPress={() =>*/}
        {/*    navigate('Flat', {*/}
        {/*      username: 'Safa',*/}
        {/*      password: '2317',*/}
        {/*    })*/}
        {/*  }*/}
        {/*/>*/}
        <FlatList
          ListFooterComponent={this.renderFooter}
          // ListHeaderComponent={this.renderHeader()}
          renderItem={this.renderContactsItem}
          numColumns={1}
          keyExtractor={(item) => item.login.uuid}
          data={this.state.contacts}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 5,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  avatarandtext: {
    flexDirection: 'row',
  },
  dene: {
    flexWrap: 'wrap',
  },
  deneme: {
    backgroundColor: 'red',
  },
  avatar: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
  },
  textContainer: {
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 20,
  },
  countrytext: {
    fontSize: 15,
  },
});
