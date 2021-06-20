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
        <TextInput placeholder="Search..." style={styles.searchInput} />
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
          <DesignProducts
            tabLabel=" Tasarım & Dekorasyon"
            navigation={this.props.navigation}
          />
          <DietProducts tabLabel="Diyet" navigation={this.props.navigation} />
          <BabyProducts tabLabel="Bebek" navigation={this.props.navigation} />
          <Foods tabLabel=" Ev Yemekleri" navigation={this.props.navigation} />
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
  searchInput: {
    fontSize: 16,
    backgroundColor: '#fff',
    padding: 10,
    borderColor: '#d5d5d5',
    borderWidth: 1,
    borderRadius: 15,
    margin: 5,
  },
});
