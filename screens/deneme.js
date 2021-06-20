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
    alldata: [],
    loading: true,
    detailname: '',
    detailcost: '',
    detailimage: '',
    detailaciklama: '',
  };

  componentDidMount() {
    axios.get('http://213.159.30.21/service/SepetEkle/').then((user) => {
      console.log(user);
      this.setState({
        all: user.data,
        alldata: user.data,
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
          //console.log(item);
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
                {item.detail} {'\n'}
                {item.urun} TL {'\n'}
                {item.sepet} TL {'\n'}
                {item.miktar} TL {'\n'}
                {/*{item.userid.username} TL {'\n'}*/}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  searchFilter = (text) => {
    const newData = this.state.alldata.filter((item) => {
      const listItem = `${item.adi.toLowerCase()}`;

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
// const renderContactsItem = ({item, index}) => {
//   return (
//       <TouchableOpacity
//           style={[
//             styles.itemContainer,
//             {backgroundColor: index % 2 === 1 ? '#fafafa' : ''},
//           ]}>
//         <View style={styles.container}>
//           <View style={styles.general}>
//             <Image style={styles.avatar} source={{uri: item.resim}} />
//             <View style={styles.textContainer}>
//               <Text style={styles.name}>
//                 {item.adi} {'\n'}
//                 {item.fiyat} TL {'\n'}
//                 {/*{item.userid.username} TL {'\n'}*/}
//               </Text>
//             </View>
//           </View>
//         </View>
//       </TouchableOpacity>
//   );
// };
