import React, {Component} from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';
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
import BabyProducts from './BabyProducts';
import DesignProducts from './DesignProducts';
import DietProducts from './DietProducts';
//import SaticiProfil from './SaticiProfil';
import Icon from 'react-native-vector-icons/FontAwesome';
import Favorites from './Favorites';
import Card from './Card';

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
const TabNavigator = createBottomTabNavigator({
  Anasayfa: {
    screen: Home,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="home" size={22} color={tintColor} />
      ),
    },
  },
  Kategoriler: {
    screen: KategoriScreen,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="search" size={22} color={tintColor} />
      ),
    },
  },
  Favoriler: {
    screen: Favorites,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="heart" size={22} color={tintColor} />
      ),
    },
  },
  Siparişler: {
    screen: Card,
    navigationOptions: {
      tabBarIcon: ({tintColor}) => (
        <Icon name="shopping-basket" size={22} color={tintColor} />
      ),
    },
  },
  Profil: {
    screen: ProfilScreen,
    navigationOptions: {
      backgroundColor: '#FFF7A2',
      tabBarIcon: ({tintColor}) => (
        <Icon name="user" size={22} color={tintColor} />
      ),
    },
  },
});
const AppNavigator = createStackNavigator(
  {
    Auth: BeforeSignin,
    //App: AfterSignin,
    AuthLoading: AuthLoading,
    Flat: Flat,
    Profile: Profile,
    Detail: Detail,
    deneme: deneme,
    Register: Register,
    Anasayfa: Foods,
    Satici: TabNavigator,
    Ayarlar: Ayarlar,
    Kampanya: Kampanya,
    Campaign: Campaign,
    Announcement: Announcement,
    CampaignAnnounc: CampaignAnnounc,
    PasswordInfo: PasswordInfo,
    UserInfo: UserInfo,
    AddressInfo: AddressInfo,
    Home: TabNavigator,
    ProfilScreen: TabNavigator,
    AciklamaEkrani: AciklamaEkrani,
    KategoriSecme: KategoriSecme,
    CameraAndGallery: CameraAndGallery,
    OnizlemeEkrani: OnizlemeEkrani,
    Foods: Foods,
    KategoriScreen: KategoriScreen,
    BabyProducts: BabyProducts,
    DesignProducts: TabNavigator,
    DietProducts: DietProducts,
  },
  {
    headerMode: 'none',
    initialRouteName: 'Home',
  },
);

export default createAppContainer(AppNavigator);
//pnar_bedir p23172317
//    3.8.4
