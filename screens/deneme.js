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
// import Animated from "react-native-reanimated";
// import log from "module:react-native-reanimated.Animated.log";
export default class deneme extends Component {
  state = {
    name: '',
    surname: '',
    resim: '',
    all: [],
    loading: true,
    detailname: '',
    detailcost: '',
    detailimage: '',
    detailaciklama: '',
  };

  componentDidMount() {
    axios.get('http://213.159.30.21/service/api/Urun/').then((user) => {
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
      <TouchableOpacity
        onPress={() => {
          navigate('Detail', {
            detailname: item.adi,
            detailcost: item.fiyat,
            detailimage: item.resim,
            detailaciklama: item.aciklama,
          });
          // this.setState({
          //   name:
          //     this.state.name +
          //     item.name.first +
          //     item.name.last +
          //     item.location.state,
          //   //item.picture.thumbnail,
          // });
          console.log(item);
        }}
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}>
        <View style={styles.container}>
          <View style={styles.general}>
            <Image style={styles.avatar} source={{uri: item.resim}} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>
                {item.adi} {'\n'}
                {item.fiyat} TL {'\n'}
                {item.userid.username} TL {'\n'}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const {name, surname, resim, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        {/*<Button*/}
        {/*  title="go to flat page"*/}
        {/*  onPress={() =>*/}
        {/*    navigate('Profile', {*/}
        {/*      //username: 'Safa',*/}
        {/*      //password: '2317',*/}
        {/*    })*/}
        {/*  }*/}
        {/*/>*/}
        {/*<FlatListExample />*/}
        <View>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <Text>{/*{name} {surname}*/}</Text>
          )}
        </View>
        {/*<Image style={styles.avatar} source={{uri: resim}} />*/}
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
    marginHorizontal: 5,
  },
  avatar: {
    width: 185,
    height: 185,
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',
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
});
