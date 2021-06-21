// import AsyncStorage
import AsyncStorage from '@react-native-community/async-storage';
// import icons
import Icon from 'react-native-vector-icons/Ionicons';
import React, {Component} from 'react';
import axios from 'axios';
import {
  ActivityIndicator,
  Button,
  FlatList,
  Image,
  SafeAreaView,
  Fragment,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
export default class DesignProducts extends Component {
  state = {
    //name: '',
    surname: '',
    resim: '',
    all: [],
    alldata: [],
    loading: true,
    detailname: '',
    detailcost: '',
    detailimage: '',
    detailaciklama: '',
  };

  componentDidMount() {
    axios.get('http://213.159.30.21/service/tasarım/list/').then((user) => {
      console.log(user);
      this.setState({
        all: user.data,
        alldata: user.data,
      });
    });
  }
  onClickAddFav(data) {
    const itemfav = {
      all2: data,
      quantity: 1,
      name: data.adi,
      surname: data.aciklama,
      res: data.resim,
      fiy: data.fiyat,
    };

    AsyncStorage.getItem('fav')
      .then((datafav) => {
        if (datafav !== null) {
          // We have data!!
          const fav = JSON.parse(datafav);
          fav.push(itemfav);
          AsyncStorage.setItem('fav', JSON.stringify(fav));
        } else {
          const fav = [];
          fav.push(itemfav);
          AsyncStorage.setItem('fav', JSON.stringify(fav));
        }
        alert('Add Fav');
      })
      .catch((err) => {
        alert(err);
      });
  }
  onClickAddCart(data) {
    const itemcart = {
      all2: data,
      quantity: 1,
      name: data.adi,
      surname: data.aciklama,
      res: data.resim,
      fiy: data.fiyat,
    };

    AsyncStorage.getItem('cart')
      .then((datacart) => {
        if (datacart !== null) {
          // We have data!!
          const cart = JSON.parse(datacart);
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        } else {
          const cart = [];
          cart.push(itemcart);
          AsyncStorage.setItem('cart', JSON.stringify(cart));
        }
        alert('Add Cart');
      })
      .catch((err) => {
        alert(err);
      });
  }
  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    const {name, surname, resim, loading} = this.state;
    return (
      <View>
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
            //console.log(item);
          }}
          style={[styles.itemContainer, {backgroundColor: '#fafafa'}]}>
          <View style={styles.container}>
            <View style={styles.general}>
              {/*<Text style>{item.userid.username}</Text>*/}
              <Image style={styles.avatar} source={{uri: item.resim}} />
              <View style={styles.textContainer}>
                <Text style={styles.name}>
                  {item.adi} {'\n'}
                  {item.fiyat} {'TL'} {'\n'}
                </Text>
                <View style={{width: 8}} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
            marginTop: -15,
          }}>
          <TouchableOpacity
            style={{
              width: 70,
              height: 50,
              // backgroundColor: '#efefef',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 5,
            }}
            onPress={() => this.onClickAddCart(item)}>
            <Icon name="cart" size={30} color={'black'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 70,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 4,
              borderRadius: 5,
            }}
            onPress={() => this.onClickAddFav(item)}>
            <Icon name="heart" size={30} color={'black'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };
  //   {/*<Button>*/}
  // {/*  onPress={() => this.onClickAddCart(item)}*/}
  // {/*  style=*/}
  // {/*  {{*/}
  // {/*    width: 200,*/}
  // {/*    backgroundColor: '#33c37d',*/}
  // {/*    flexDirection: 'row',*/}
  // {/*    alignItems: 'center',*/}
  // {/*    justifyContent: 'center',*/}
  // {/*    borderRadius: 5,*/}
  // {/*    padding: 4,*/}
  // {/*  }}*/}
  // {/*  >*/}
  // {/*</Button>*/}
  searchFilter = (text) => {
    const newData = this.state.alldata.filter((item) => {
      const listItem = `${item.adi.toLowerCase()}${item.userid.toLowerCase()}`;
      return listItem.indexOf(text.toLowerCase()) > -1;
    });
    this.setState({
      all: newData,
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
    const {navigation} = this.props;
    const {name, surname, resim, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View />
        <FlatList
          ListFooterComponent={this.renderFooter}
          ListHeaderComponent={this.renderHeader()}
          numColumns={2}
          renderItem={this.renderContactsItem}
          data={this.state.all}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  genel: {},
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
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
    marginVertical: 10,
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
