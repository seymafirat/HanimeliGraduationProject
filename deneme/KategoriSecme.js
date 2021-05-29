import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Left,
  Body,
  Right,
  Thumbnail,
  Text,
} from 'native-base';
import {Icon} from 'react-native-elements';
import {Alert, StyleSheet} from 'react-native';
export default class ListAvatarExample extends Component {
  constructor() {
    super();
    this.state = {
      categoryInput: ' ',
    };
  }
  InsertData = () => {
    const {getParam} = this.props.navigation;
    const adi = getParam('adi');
    const aciklama = getParam('aciklama');
    const fiyat = getParam('fiyat');
    //const apiRequestUrl = getParam('apiRequestUrl');
    console.log('eslem');
    //console.log(apiRequestUrl);
    const baseURL = 'http://213.159.30.21/service/api/Urun/';
    fetch(baseURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        userid: 4,
        //username: userid.username,
        stok: 5,
        kategoriId: 2,
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
        //Alert.alert('Hİ BABA ID ', `BENIM SON ID BUDUR : ${data.id}`);
        console.log(JSON.parse(data.id));
        this.props.navigation.navigate('CameraAndGallery', {
          apiRequestUrl: JSON.parse(data.id),
          adi,
          aciklama,
          fiyat,
          kategori: 'Yemek',
        });
        console.log('seyma' + JSON.parse(data.id));
        //this.props.navigation.navigate('OnizlemeEkrani', data.aciklama);
        //Alert.alert('adi:' + data.adi + 'aciklama:' + data.aciklama);
      })
      .catch((error) => console.log(error));
  };
  render() {
    return (
      <Container>
        <Content>
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
                  onPress={() => this.InsertData()}
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
                  Küpeler, Tasarım Bileklikler...
                </Text>
              </Body>
              <Right>
                <Icon name={'arrow-forward'} />
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
                  <Icon name={'arrow-forward'} />
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
                  <Icon name={'arrow-forward'} onPress={() => this.deneme()} />
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
                  <Icon name={'arrow-forward'} onPress={() => this.deneme()} />
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
