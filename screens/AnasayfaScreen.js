import React, {Component} from 'react';
import 'react-native-gesture-handler';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';
import SaticiProfil from './SaticiProfil';

const isIos = Platform.OS === 'ios';

export default class AnasayfaScreen extends Component {
  state = {
    text: '',
    page: 1,
    contacts: [],
    allContacts: [],
    loading: true,
    refreshing: false,
  };

  componentDidMount() {
    this.getContacts();
  }

  getContacts = async () => {
    this.setState({
      loading: true,
    });
    const {
      data: {results: contacts},
    } = await axios.get(
      `https://randomuser.me/api/?results=30&page=${this.state.page}`,
    );
    if (this.state.refreshing) {
      users.reverse();
    }

    const users = [...this.state.contacts, ...contacts]; //3 nokta arraydekileri yerleştirmesi için
    this.setState({
      contacts: users,
      allContacts: users,
      loading: false,
      refreshing: false,
    });
  };

  loadMore = () => {
    if (!this.duringMomentum) {
      this.setState(
        {
          page: this.state.page + 1,
        },
        () => {
          this.getContacts();
        },
      );
      this.duringMomentum = false;
    }
  };

  onRefresh = () => {
    this.setState(
      {
        page: 1,
        refreshing: true,
      },
      () => {
        this.getContacts();
      },
    );
  };
  gotoDetail = (user) => {
    this.props.navigation.navigate('SaticiProfil', {
      user,
    });
  };

  renderContactsItem = ({item, index}) => {
    return (
      <SafeAreaView>
        <TouchableOpacity
          onPress={() => this.gotoDetail(item)}
          style={[
            styles.itemContainer,
            {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
          ]}>
          <View style={styles.container}>
            <View style={styles.cerceve}>
              <View style={styles.ustbanner}>
                <View style={styles.imageAndKullaniciad}>
                  <Image
                    style={styles.imageBack}
                    source={{uri: item.picture.thumbnail}}
                  />
                  <Text style={styles.kullaniciAdi}>
                    {item.name.first} {item.name.last}
                  </Text>
                </View>
                <Image
                  style={styles.avatar}
                  source={{uri: item.picture.thumbnail}}
                />
                <View style={styles.ustbanner2}>
                  <Image
                    style={styles.imageYildiz}
                    source={{uri: item.picture.thumbnail}}
                  />
                  <Image
                    style={styles.imageYildiz}
                    source={{uri: item.picture.thumbnail}}
                  />
                </View>
                <TouchableOpacity>
                  <Text style={styles.degerlendirme}> Daha Fazla Gör </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  renderFooter = () => {
    if (!this.state.loading) {
      return null;
    }
    return (
      <View style={{paddingVertical: 20}}>
        <ActivityIndicator size="large" />
      </View>
    );
  };
  render() {
    return (
      <FlatList
        ListFooterComponent={this.renderFooter}
        renderItem={this.renderContactsItem}
        keyExtractor={(item) => item.login.uuid}
        data={this.state.contacts}
        onEndReached={this.loadMore}
        onEndReachedThreshold={isIos ? 0 : 0.2}
        refreshing={this.state.refreshing}
        onRefresh={this.onRefresh}
      /> //arama için işlem yapılmadı.
    );
  }
}
const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  imageYildiz: {
    width: 170,
    height: 170,
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  kullaniciAdi: {
    fontSize: 18,
    margin: 10,
  },
  ustbanner: {
    flexDirection: 'column',
    borderColor: '#c5c5c5',
    borderWidth: 1,
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  ustbanner2: {
    flexDirection: 'row',
  },
  imageAndKullaniciad: {
    padding: 5,
    flexDirection: 'row',
  },
  imageBack: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  degerlendirme: {
    padding: 5,
    fontSize: 15,
    textAlign: 'right',
    fontWeight: 'bold',
  },
});
