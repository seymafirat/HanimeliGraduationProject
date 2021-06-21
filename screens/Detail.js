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
  Dimensions,
  RefreshControl,
} from 'react-native';
var {width} = Dimensions.get('window');
import axios from 'axios';
// import Animated from "react-native-reanimated";
// import log from "module:react-native-reanimated.Animated.log";
export default class Flat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false,
    };
  }

  /* componentDidMount() {
    axios.get('http://213.159.30.21/service/api/Urun/').then((user) => {
      //console.log(user);
      this.setState({
        all: user.data,
      });
    });
  }*/
  InsertData = () => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const detailname2 = navigation.getParam('detailname2');
    const detailcost2 = navigation.getParam('detailcost2');
    const detailimage2 = navigation.getParam('detailimage2');
    fetch('http://213.159.30.21/service/api/Sepet/', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        //userid: 4,
        //username: userid.username,
        //stok: 5,
        //kategoriId: 2,
        //altkategoriId: 2,
        //adi,
        //aciklama,
        //fiyat,
        adi: detailname2,
        fiyat: detailcost2,
        resim: detailimage2,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log('ok');
        //console.log(data);
        this.props.navigation.navigate('Profile', {
          //apiRequestUrl: JSON.parse(data.id),
          detailimage2,
          detailname2,
          detailcost2,
          //kategori: 'Yemek',
        });
        //console.log('seyma' + JSON.parse(data.id));
        //this.props.navigation.navigate('OnizlemeEkrani', data.aciklama);
        //Alert.alert('adi:' + data.adi + 'aciklama:' + data.aciklama);
      })
      .catch((error) => console.log(error));
  };
  _onRefresh = () => {
    this.setState({refreshing: true});
  };
  renderContactsItem = ({item, index}) => {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const detailname = navigation.getParam('detailname');
    const detailcost = navigation.getParam('detailcost');
    const detailimage = navigation.getParam('detailimage');
    return (
      <View
        style={[
          styles.itemContainer,
          {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
        ]}
      />
    );
  };
  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const detailname = navigation.getParam('detailname');
    const detailcost = navigation.getParam('detailcost');
    const detailimage = navigation.getParam('detailimage');
    const detailaciklama = navigation.getParam('detailaciklama');
    return (
      <View style={styles.container}>
        <Text>{this.state.dene}</Text>
        <View style={styles.avatarandtext}>
          <Image style={styles.avatar} source={{uri: detailimage}} />
          <View style={styles.textContainer}>
            <Text style={styles.name2}>{detailname}</Text>
            <Text style={styles.name}>{detailaciklama} </Text>
            <Text style={styles.name3}>{detailcost} TL</Text>
            <View style={styles.sepeteklebuton}>
              <View style={{width: 100, height: 100, marginHorizontal: 10}}>
                <Button
                  onPress={() => this.refreshPage}
                  /*navigate('Profile', {
                        detailname2: detailname,
                        detailcost2: detailcost,
                        detailimage2: detailimage,
                        all2: detailcost,*/
                  title="sepete ekle"
                  color="#841584"
                />
              </View>
              <View style={{width: 100, height: 100, marginHorizontal: 10}}>
                <Button
                  onPress={() => this.InsertData()}
                  /*navigate('Profile', {
                      detailname2: detailname,
                      detailcost2: detailcost,
                      detailimage2: detailimage,
                      all2: detailcost,*/
                  title="Favorilere ekle"
                  color="#841584"
                />
              </View>
            </View>
          </View>
        </View>
        <Text>{this.state.name}</Text>
        <FlatList
          renderItem={this.renderContactsItem}
          numColumns={2}
          keyExtractor={(item) => item.login.uuid}
          data={this.state.contacts}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
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
    marginTop: 20,
    // borderBottomWidth: 1,
    // borderBottomColor: '#eee',
  },
  goProfile: {
    backgroundColor: '#c5c5c5',
    width: 250,
    height: 40,
    marginHorizontal: 75,
  },
  sepeteklebuton: {
    marginHorizontal: 120,
    flexDirection: 'row',
    marginTop: 15,
  },
  sepetekleyazi: {
    fontSize: 22,
    textAlign: 'center',
    justifyContent: 'center',
  },
  avatarandtext: {
    flexDirection: 'column',
    marginTop: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dene: {
    flexWrap: 'wrap',
  },
  deneme: {
    backgroundColor: 'red',
  },
  avatar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 370,
    height: 250,
    marginHorizontal: 25,
    flexDirection: 'column',
    borderColor: '#333333',
    borderWidth: 4,
  },
  textContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 15,
  },
  name: {
    fontSize: 20,
    marginHorizontal: 3,
    marginTop: 10,
    borderBottomWidth: 2,
    borderColor: '#cccccc',
    paddingBottom: 10,
  },
  name2: {
    fontSize: 20,
    marginHorizontal: 3,
    fontWeight: 'bold',
    borderBottomWidth: 2,
    borderColor: '#cccccc',
    paddingBottom: 10,
  },
  name3: {
    fontSize: 20,
    marginHorizontal: 3,
    marginTop: 10,
    fontWeight: 'bold',
  },
  countrytext: {
    fontSize: 15,
  },
});
