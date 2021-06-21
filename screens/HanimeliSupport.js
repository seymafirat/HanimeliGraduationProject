import React from 'react';
import {View, StyleSheet, Text, Image, ScrollView} from 'react-native';
import ChatBot from 'react-native-chatbot';
import {Component} from 'react';
import {Header} from 'react-native-elements';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const steps = [
  {
    id: 1,
    message: 'Hanımeli ailesine hoşgeldiniz✨',
    trigger: 2,
  },
  {
    id: 2,
    message: 'Size hangi konuda yardımcı olabilirim?',
    trigger: 3,
  },
  {
    id: 3,
    options: [
      {
        value: 'Satın Alma İşlemleri',
        label: 'Satın Alma İşlemleri',
        trigger: 4,
      },
      {
        value: 'Satış İşlemleri',
        label: 'Satış İşlemleri',
        trigger: 5,
      },
      {
        value: 'İade ve iptal işlemleri hakkında',
        label: 'İade ve iptal işlemleri hakkında',
        trigger: 6,
      },
      {value: 'Hanımelinde yeniyim', label: 'Hanımelinde yeniyim', trigger: 7},
    ],
  },
  {
    id: 4,
    message:
      'İstediğiniz ürünü sepete ekleyip, adres ve iletişim bilgilerini tamamlayıp, kredi veya banka kartınız ile ödeme gerçekleştirebilirsiniz. Kapıda ödeme henüz mevcut değildir. İletişim bilgileriniz satıcı ile paylaşılmamaktadır.',
    trigger: 8,
  },
  {
    id: 5,
    message:
      'Ürününüzün fotoğraflarını ve açıklamasını ekleyip satış yapmaya hemen başlayabilirsiniz!',
    trigger: 8,
  },
  {
    id: 6,
    message:
      'Kişiye özel verilen siparişlerin ve yemek siparişlerinin iade ve değişimi yapılmamaktadır. Diğer ürünler için iade ve değişim söz konusudur.',
    trigger: 8,
  },
  {
    id: 7,
    message:
      'Aramıza hoşgeldiniz. Beraber daha güçlüyüz. Satıcı olmak isterseniz şaheserinizin fotoğraf ve açıklamasını yazıp yükleyerek başlayabilirsiniz! Müşteri olmak içinse dilediğiniz ürünü sepete atıp gerekli işlemleri yerine getirmeniz yeterli!',
    trigger: 8,
  },
  {
    id: 8,
    message: 'Bu bilgiler yeterli oldu mu?',
    trigger: 9,
  },
  {
    id: 9,
    options: [
      {
        value: 'Evet',
        label: 'Evet',
        trigger: 10,
      },
      {
        value: 'Hayır, müşteri temsilcisi ile konuşmak istiyorum.',
        label: 'Hayır, müşteri temsilcisi ile konuşmak istiyorum.',
        trigger: 12,
      },
    ],
  },
  {
    id: 10,
    message:
      'Sizi memnun edebildiğime sevindim! Yardımcı olmamı istediğiniz başka bir konu var mı?',
    trigger: 11,
  },
  {
    id: 11,
    options: [
      {
        value: 'Evet',
        label: 'Evet',
        trigger: 3,
      },
      {
        value: 'Hayır.',
        label: 'Hayır.',
        trigger: 13,
      },
    ],
  },
  {
    id: 12,
    message:
      'Tabi 444 00 44 numaralı telefonu arayarak 7/24 müşteri temsilcilerimizden destek alabilirsiniz.',
    trigger: 8,
  },
  {
    id: 13,
    message: 'Hoşçakalın. Sizi seviyoruz !',
    end: true,
  },
];
export default class HanımeliSupport extends Component {
  render() {
    return (
      <ScrollView style={{marginTop: 10}}>
        <Header
          placement={'left'}
          leftComponent={{
            icon: 'arrow-back',
            color: 'black',
            onPress: () => this.props.navigation.navigate('Home'),
          }}
          centerComponent={{
            text: 'Hızlı Destek',
            style: {fontSize: 20, marginTop: -1, fontWeight: 'bold'},
          }}
          containerStyle={{
            backgroundColor: 'white',
            alignItems: 'space-around',
            marginTop: -10,
          }}
        />
        <ChatBot steps={steps} />
      </ScrollView>
    );
  }
}
