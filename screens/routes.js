import React, {Component} from 'react';
import {
  StyleSheet,
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
//import {createBottomTabNavigator} from 'react-navigation-tabs';
import Flat from './Flat';
import Profile from './Profile';
import Detail from './Detail';
import deneme from './deneme';
import Login from './Login';
import Dashboard from './Dashboard';
import AuthLoading from './AuthLoadingScreen';
import Register from './Register';
import Anasayfa from './AnasayfaScreen';
//import Satici from './SaticiProfil';
import Ayarlar from './AyarlarScreen';
import Kampanya from './Campaign';
import Campaign from './Campaign';
import Announcement from './Announcement';
import CampaignAnnounc from './CampaignAnnounc';
import Home from './Home';
import KategoriScreen from './KategoriScreen';
import Foods from './Foods';
import PasswordInfo from './PasswordInfo';
import UserInfo from './UserInfo';
import AddressInfo from './AddressInfo';
import ProfilScreen from './ProfilScreen';
import AciklamaEkrani from './AciklamaEkrani';
import KategoriSecme from './KategoriSecme';
import CameraAndGallery from './CameraAndGallery';
import OnizlemeEkrani from './OnizlemeEkrani';
//import SaticiProfil from './SaticiProfil';
const BeforeSignin = createStackNavigator(
  {
    Login: {
      screen: Login,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Login',
  },
);

const AfterSignin = createStackNavigator(
  {
    Dashboard: {
      screen: Dashboard,
    },
  },
  {
    headerMode: 'none',
    initialRouteName: 'Dashboard',
  },
);
/*const TabNavigator = createBottomTabNavigator({
  Anasayfa: {
    screen: Anasayfa,
    // navigationOptions: {
    //   tabBarIcon: ({tintColor}) => (
    //     <Icon name="home" size={22} color={tintColor} />
    //   ),
    // },
  },
  Kategoriler: {
    screen: KategoriScreen,
    // navigationOptions: {
    //   tabBarIcon: ({tintColor}) => (
    //     <Icon name="search" size={22} color={tintColor} />
    //   ),
    // },
  },
  Favoriler: {
    screen: Campaign,
    // navigationOptions: {
    //   tabBarIcon: ({tintColor}) => (
    //     <Icon name="heart" size={22} color={tintColor} />
    //   ),
    // },
  },
  Siparişler: {
    screen: Foods,
    // navigationOptions: {
    //   tabBarIcon: ({tintColor}) => (
    //     <Icon name="shopping-basket" size={22} color={tintColor} />
    //   ),
    // },
  },
  Profil: {
    screen: Announcement,
    navigationOptions: {
      backgroundColor: '#FFF7A2',
      // tabBarIcon: ({tintColor}) => (
      //   <Icon name="user" size={22} color={tintColor} />
      // ),
    },
  },
});*/
const AppNavigator = createStackNavigator(
  {
    //Auth: BeforeSignin,
    //App: AfterSignin,
    AuthLoading: AuthLoading,
    Flat: Flat,
    Profile: Profile,
    Detail: Detail,
    deneme: deneme,
    Register: Register,
    Anasayfa: Anasayfa,
    //Satici: TabNavigator,
    Ayarlar: Ayarlar,
    Kampanya: Kampanya,
    Campaign: Campaign,
    Announcement: Announcement,
    CampaignAnnounc: CampaignAnnounc,
    PasswordInfo: PasswordInfo,
    UserInfo: UserInfo,
    AddressInfo: AddressInfo,
    Home: Home,
    ProfilScreen: ProfilScreen,
    AciklamaEkrani: AciklamaEkrani,
    KategoriSecme: KategoriSecme,
    CameraAndGallery: CameraAndGallery,
    OnizlemeEkrani: OnizlemeEkrani,
    Foods: Foods,
    KategoriScreen: KategoriScreen,
    //SaticiProfil: SaticiProfil,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Detail',
  },
);

export default createAppContainer(AppNavigator);
//pnar_bedir p23172317
