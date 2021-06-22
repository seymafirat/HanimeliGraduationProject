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
  SafeAreaView,
  ScrollView,
} from 'react-native';
import axios from 'axios';
// import Animated from "react-native-reanimated";
// import log from "module:react-native-reanimated.Animated.log";
import {
  Container,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  Button,
} from 'native-base';
import {Header} from 'react-native-elements';
export default class TheBest extends Component {
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
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Left>
                <Body>
                  <Text style={styles.ad}>{item.adi}</Text>
                  <Text note>21 Haziran, 2021</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image style={styles.avatar} source={{uri: item.resim}} />
                <Text style={styles.name}>{item.aciklama}</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="person" />
                  <Text>{item.userid}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  };

  render() {
    const {navigate} = this.props.navigation;
    const {navigation} = this.props;
    const {name, surname, resim, loading} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={{marginTop: 10}}>
          <Header
            style={{marginTop: -40}}
            placement={'left'}
            leftComponent={{
              icon: 'arrow-back',
              color: 'black',
              onPress: () => this.props.navigation.navigate('Home'),
            }}
            centerComponent={{
              text: 'Hanımeli Gündem',
              style: {fontSize: 20, marginTop: -2, fontWeight: 'bold'},
            }}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'space-around',
              marginTop: -10,
            }}
          />
        </View>
        <FlatList
          ListFooterComponent={this.renderFooter}
          numColumns={1}
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
    justifyContent: 'center',
  },
  ad: {
    fontSize: 19,
    fontWeight: 'bold',
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
