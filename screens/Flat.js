import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Button,
} from 'react-native';
import axios from 'axios';
// import Animated from "react-native-reanimated";
// import log from "module:react-native-reanimated.Animated.log";
export default class Flat extends Component {
  state = {
    // name: 'mehmet',
    newname: '',
    text: '',
    text2: '',
    text3: [],
    contacts: [],
    allContacts: [],
    dene: '',
    deneme: '',
    loading: true,
    //pict: '',
    bir: '',
    iki: '',
    uc: '',
  };

  componentDidMount() {
    this.getContacts();
  }
  handleOnPress = ({item, index}) => {};
  getContacts = async () => {
    const {
      data: {results},
    } = await axios.get('https://randomuser.me/api/?results=30');
    this.setState({
      contacts: results,
      allContacts: results,
      loading: false,
      // dene: this.props.navigation.state.params.username,
    });
  };
  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    return (
      <TouchableOpacity
        onPress={() => {
          navigate('Profile', {
            bir: item.name.first + item.name.last,
            iki: item.location.state,
            uc: item.picture.thumbnail,
          });
          this.setState({
            name:
              this.state.name +
              item.name.first +
              item.name.last +
              item.location.state,
            //item.picture.thumbnail,
          });
          console.log(item);
        }}
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}>
        <View style={styles.avatarandtext}>
          <Image style={styles.avatar} source={{uri: item.picture.thumbnail}} />
          <View style={styles.textContainer}>
            <Text style={styles.name}>
              {item.name.first} {item.name.last}
            </Text>
            <Text style={styles.countrytext}>{item.location.state}</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  searchFilter = (text) => {
    const newData = this.state.allContacts.filter((item) => {
      const listItem = `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()} ${item.location.state.toLowerCase()}`;

      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      contacts: newData,
    });
  };
  renderHeader = () => {
    const {text} = this.state;
    return (
      <View style={styles.searchContainer}>
        <TextInput
          onChangeText={(text) => {
            this.setState({
              text,
            });
            this.searchFilter(text);
          }}
          value={text}
          placeholder="Search..."
          style={styles.searchInput}
        />
      </View>
    );
  };
  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    //console.log(this.props.navigation.state.params);
    // const username = this.props.navigation.state.params;
    // const password = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Text>Profile Screen</Text>
        <Text>{this.state.dene}</Text>
        {/*<Text>{this.state.denee}</Text>*/}
        {/*<Text>Home</Text>*/}
        <Button
          title="go to detail page"
          onPress={() =>
            navigate('Profile', {
              user: 'pinos',
              pass: '23172317',
            })
          }
        />
        <Text>{this.state.name}</Text>
        <FlatList
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader()}
          renderItem={this.renderContactsItem}
          numColumns={2}
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
    width: 150,
    height: 150,
  },
  avatarandtext: {
    flexDirection: 'column',
  },
  dene: {
    flexWrap: 'wrap',
  },
  deneme: {
    backgroundColor: 'red',
    width: 100,
    height: 100,
  },
  avatar: {
    width: 80,
    height: 80,
    marginHorizontal: 5,
    flexDirection: 'column',
  },
  textContainer: {
    justifyContent: 'space-around',
  },
  name: {
    fontSize: 10,
  },
  searchContainer: {
    marginVertical: 5,
    padding: 10,
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 15,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  countrytext: {
    fontSize: 10,
  },
});
