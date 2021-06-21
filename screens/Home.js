import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text, FlatList} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import 'react-native-gesture-handler';
import AnasayfaScreen from './AnasayfaScreen';
import DietProducts from './DietProducts';
import HandworkProducts from './HandworkProducts';
import Foods from './Foods';
import BabyProducts from './BabyProducts';
import DesignProducts from './DesignProducts';

export default class Home extends Component {
  static navigationOptions = {
    title: 'Anasayfa',
  };
  render() {
    return (
      <View style={styles.container}>
        <ScrollableTabView
          style={{marginTop: 8}}
          initialPage={0}
          //tabBarActiveTextColor="#009387"
          //tabBarInactiveTextColor="#808080"
          renderTabBar={() => <ScrollableTabBar />}>
          <AnasayfaScreen
            tabLabel="Anasayfa"
            navigation={this.props.navigation}
          />
          <DesignProducts tabLabel=" Tasarım & Dekorasyon" />
          <HandworkProducts tabLabel="Örgü" />
          <Foods tabLabel=" Ev Yemekleri" />
          <DietProducts tabLabel="Diyet" />
          <BabyProducts tabLabel="Bebek" />
        </ScrollableTabView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
});
