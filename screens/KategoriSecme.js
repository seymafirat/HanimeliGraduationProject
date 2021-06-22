import React, {Component} from 'react';
import {
  Container,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {Header} from 'react-native-elements';
import {Icon} from 'react-native-elements';
import {Alert, StyleSheet} from 'react-native';
import AciklamaEkrani from './AciklamaEkrani';
export default class ListAvatarExample extends Component {
  constructor() {
    super();
    this.state = {
      categoryInput: ' ',
    };
  }
  InsertData = (kategoriId) => {
    const {getParam} = this.props.navigation;
    const adi = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');
    const baseURL = 'http://213.159.30.21/service/api/Urun/';
    fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userid: 'pnarbedir_',
        //username: userid.username,
        stok: 1,
        kategoriId,
        altkategoriId: 2,
        adi,
        aciklama,
        fiyat,
      }),
    })
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        const apiRequestUrl = this.state.lastId;
        console.log(
          'RESPONSE >>> ',
          apiRequestUrl,
          JSON.stringify(data, null, 4),
        );
        console.log(JSON.parse(data.id));
        this.props.navigation.navigate('CameraAndGallery', {
          apiRequestUrl: JSON.parse(data.id),
          adi,
          aciklama,
          fiyat,
          kategoriId,
        });
        console.log('seyma' + JSON.parse(data.id));
      })
      .catch((error) => console.log(error));
  };

  navigateToPreviewScreen = () => {
    this.props.navigation.navigate('AciklamaEkrani');
  };
  render() {
    const {navigate} = this.props.navigation;
    return (
      <Container>
        <Content style={{marginTop: 10}}>
          <Header
            style={{height: 120, marginTop: 50}}
            placement={'left'}
            leftComponent={{
              icon: 'arrow-back',
              color: 'black',
              onPress: () => navigate('AciklamaEkrani'),
            }}
            centerComponent={{
              text: 'Kategoriler',
              style: {fontSize: 20, marginTop: -2},
            }}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'space-around',
              marginTop: -10,
            }}
          />
          <List>
            <ListItem avatar>
              <Left>
                <Thumbnail source={require('../assets/ben/yemekfoto.jpg')} />
              </Left>
              <Body>
                <Text>Ev Yemekleri</Text>
                <Text note>
                  İçli Köfte, Yaprak Sarma, Ev Baklası, Börek, Poğaça, Kek...
                </Text>
              </Body>
              <Right>
                <Icon
                  name={'arrow-forward'}
                  onPress={() => this.InsertData(2)}
                />
              </Right>
            </ListItem>
            <ListItem avatar>
              <Left>
                <Thumbnail
                  source={require('../assets/ben/category-designs.jpg')}
                />
              </Left>
              <Body>
                <Text>Tasarım Ürünleri</Text>
                <Text note>
                  Makrome Ürünler, Hasır Çantalar, Tasarım Kolyeler, Tasarım
                  Küpeler, Tasarım Bileklikler, Örgüler...
                </Text>
              </Body>
              <Right>
                <Icon
                  name={'arrow-forward'}
                  onPress={() => this.InsertData(3)}
                />
              </Right>
            </ListItem>
            <List>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../assets/ben/diyet.png')} />
                </Left>
                <Body>
                  <Text>Diyet Ürünleri</Text>
                  <Text note>
                    Yulaflı Ürünler, Glutensiz Ürünler, Rafine Şekersiz
                    Ürünler...
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name={'arrow-forward'}
                    onPress={() => this.InsertData(4)}
                  />
                </Right>
              </ListItem>
              <ListItem avatar>
                <Left>
                  <Thumbnail
                    source={require('../assets/ben/category-baby.jpg')}
                  />
                </Left>
                <Body>
                  <Text>Bebekler İçin</Text>
                  <Text note>
                    Doğal Kemik Suları, Meyve Püreleri, Bebek Kekleri...
                  </Text>
                </Body>
                <Right>
                  <Icon
                    name={'arrow-forward'}
                    onPress={() => this.InsertData(5)}
                  />
                </Right>
              </ListItem>
              <ListItem avatar>
                <Left>
                  <Thumbnail source={require('../assets/ben/others.jpg')} />
                </Left>
                <Body>
                  <Text>Diğer</Text>
                  <Text note>Kategorilerde bulunmayan diğer ürünler....</Text>
                </Body>
                <Right>
                  <Icon
                    name={'arrow-forward'}
                    onPress={() => this.InsertData(6)}
                  />
                </Right>
              </ListItem>
            </List>
          </List>
        </Content>
      </Container>
    );
  }
}
const styles = StyleSheet.create({});
