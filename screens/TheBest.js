import React, {Component} from 'react';
import {Image, StyleSheet} from 'react-native';
import {
  Container,
  View,
  DeckSwiper,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Icon,
  Button,
} from 'native-base';
import {Header} from 'react-native-elements';
const cards = [
  {
    text: 'HAFTANIN KİTABI',
    name: 'One',
    text3:
      ' Bilişsel terapi alanında çok meşhur ve okunulabilir bir kitap. Kitap, depresyonun ve benzeri zihinsel rahatsızlıklarının sebebinin bilincimiz ve algılarımızdaki\n' +
      ' çarpıtmalar sonucunda meydana geldiğini ve bunun çözümünün direk kendi benliğimizde bulunduğunu söylüyor ve bunun kanıtlarını öne sürüyor. Bizi depresyona ve huzursuzluğa sürükleyen düşüncelerimizi, mükemmelliyetçilik, onay bağımlılığı gibi sebeplere yoruyor ve size yardım edebilecek tek şeyin kendiniz olduğunu söylüyor. ',
    //image: require('../assets/logo.png'),
    text2: 'İYİ HİSSETMEK- DR.BURNS',
    image: require('../assets/kitap.png'),
  },
  {
    text: 'HAFTANIN FİLMİ',
    name: 'Two',
    image: require('../assets/film.png'),
    text2: 'Forrest Gump',
    text3:
      'Forrest Gump, düşük I.Q. sahibi genç bir adamdır. Jenny ile tanıştığında ona aşık olur. Gump aralarında Elvis Presley, Kennedy, Nixon’ın da olduğu tarihsel kişilerle kaza eseri tanışır ve 50’lerden 70’lerin sonuna kadar gelen bir süre zarfında olaylar gelişir.',
  },
];
export default class DeckSwiperAdvancedExample extends Component {
  render() {
    return (
      <Container>
        <View style={{marginTop: 10}}>
          <Header
            placement={'left'}
            leftComponent={{
              icon: 'arrow-back',
              color: 'black',
              onPress: () => this.props.navigation.navigate('KategoriScreen'),
            }}
            centerComponent={{
              text: 'Hanımelinde Bu Hafta',
              style: {fontSize: 20, marginTop: -2, fontWeight: 'bold'},
            }}
            containerStyle={{
              backgroundColor: 'white',
              alignItems: 'space-around',
              marginTop: -10,
            }}
          />
          <DeckSwiper
            ref={(c) => (this._deckSwiper = c)}
            dataSource={cards}
            renderEmpty={() => (
              <View style={{alignSelf: 'center'}}>
                <Text>Over</Text>
              </View>
            )}
            renderItem={(item) => (
              <Card style={{elevation: 3}}>
                <CardItem>
                  <Left>
                    <Thumbnail source={require('../assets/kesfetresim.png')} />
                    <Body>
                      <Text>{item.text}</Text>
                      <Text note>21 Haziran,2021</Text>
                    </Body>
                  </Left>
                </CardItem>
                <Image
                  style={{
                    marginTop: 10,
                    width: 150,
                    height: 150,
                    marginLeft: 5,
                  }}
                  source={item.image}
                />
                <CardItem cardBody>
                  <Text>{item.text3}</Text>
                </CardItem>
                <CardItem>
                  <Icon name="book" style={{color: '#ED4A6A'}} />
                  <Text>{item.text2}</Text>
                </CardItem>
              </Card>
            )}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            position: 'absolute',
            bottom: 50,
            left: 0,
            right: 0,
            justifyContent: 'space-between',
            padding: 15,
          }}>
          <Button iconLeft onPress={() => this._deckSwiper._root.swipeLeft()}>
            <Icon name="arrow-back" />
            <Text>Geri</Text>
          </Button>
          <Button iconRight onPress={() => this._deckSwiper._root.swipeRight()}>
            <Icon name="arrow-forward" />
            <Text>İleri</Text>
          </Button>
        </View>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  lottieView: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
