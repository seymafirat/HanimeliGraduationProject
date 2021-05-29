// import React, {Component} from 'react';
// import {
//   StyleSheet,
//   View,
//   Text,
//   SafeAreaView,
//   FlatList,
//   Image,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   KeyboardAvoidingView,
// } from 'react-native';
// import {createAppContainer} from 'react-navigation';
// import {createStackNavigator} from 'react-navigation-stack';
// import HomePage from './src/pages/HomePage';
// import Flat from './screens/Flat';
// import Profile from './screens/Profile';
// import Detail from './screens/Detail';
// import SepetDeneme from './screens/SepetDeneme';
// import deneme from './screens/deneme';
// export default class App extends Component {
//   render() {
//     return <AppContainer />;
//   }
// }
// const AppNavigator = createStackNavigator(
//   {
//     Flat: Flat,
//     Profile: Profile,
//     Detail: Detail,
//     Home: HomePage,
//     SepetDeneme: SepetDeneme,
//     deneme: deneme,
//   },
//   {
//     initialRouteName: 'deneme',
//   },
// );
//
// const AppContainer = createAppContainer(AppNavigator);
//
// //pnar_bedir p23172317
import React from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import AppContainer from './screens/routes';

const App = () => {
  return <AppContainer />;
};

export default App;
