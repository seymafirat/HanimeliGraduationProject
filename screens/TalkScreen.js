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
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import Video from 'react-native-video';
export default class TalkScreen extends Component {
  state = {
    name: '',
    surname: '',
    resim: '',
    all: [],
    loading: true,
    detailname: '',
    detailaciklama: '',
  };

  componentDidMount() {
    axios.get('http://213.159.30.21/service/diger/list/').then((user) => {
      console.log(user);
      this.setState({
        all: user.data,
      });
    });
  }

  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    const {name, surname, resim, loading} = this.state;
    return (
      <View>
        <TouchableOpacity
          style={[
            styles.itemContainer,
            {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
          ]}>
          <View style={styles.container}>
            <View style={styles.general}>
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item.adi} {'\n'}
                  {item.aciklama} {'\n'}
                  {/*{item.userid.username} TL {'\n'}*/}
                </Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const {name, surname, resim, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View />
        <FlatList
          ListFooterComponent={this.renderFooter}
          numColumns={2}
          renderItem={this.renderContactsItem}
          data={this.state.all}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  general: {
    flex: 1,
    marginHorizontal: 10,
    marginVertical: -12,
  },
  avatar: {
    width: 185,
    height: 170,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  searchContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#969696',
    borderRadius: 15,
  },
  searchInput: {
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
});
