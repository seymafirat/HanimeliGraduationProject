import React, {Component} from 'react';
import {StyleSheet, TextInput, View, Text, FlatList} from 'react-native';
import ScrollableTabView, {
  ScrollableTabBar,
} from 'react-native-scrollable-tab-view';
import 'react-native-gesture-handler';
import AnasayfaScreen from './AnasayfaScreen';
import DietProducts from './DietProducts';
import Foods from './Foods';
import BabyProducts from './BabyProducts';
import DesignProducts from './DesignProducts';
import {LogBox} from 'react-native';
import LocalNotification from './LocalNotification';
import ActionButton from 'react-native-action-button';
import PushNotification, {Importance} from 'react-native-push-notification';
import Icon from 'react-native-vector-icons/Ionicons';
import {SliderBox} from 'react-native-image-slider-box';
import axios from 'axios';
LogBox.ignoreLogs([
  'Animated: `useNativeDriver` was not specified. This is a required option and must be explicitly set to `true` or `false',
]);
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      images: [
        require('../assets/ben/category-foods.jpg'),
        require('../assets/ben/category-designs.jpg'),
        require('../assets/kayan3.png'),
        require('../assets/kayan4.png'),
        require('../assets/kayan5.png'),
        require('../assets/kayan6.png'),
      ],
      name: '',
      surname: '',
      resim: '',
      all: [],
      alldata: [],
      loading: true,
      detailname: '',
      detailcost: '',
      detailimage: '',
      detailaciklama: '',
    };
  }
  componentDidMount() {
    this.localNotification();
  }
  localNotification = () => {
    const showNotification = () => {
      PushNotification.createChannel(
        {
          channelId: '123456', // (required)
          channelName: 'My channel', // (required)
          channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
          playSound: false, // (optional) default: true
          soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
          importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
          vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
        },
        (created) => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
      );
      PushNotification.localNotification({
        /* Android Only Properties */
        channelId: '123456', // (required) channelId, if the channel doesn't exist, notification will not trigger.
        ticker: 'My Notification Ticker', // (optional)
        showWhen: true, // (optional) default: true
        autoCancel: true, // (optional) default: true
        largeIcon: 'ic_launcher', // (optional) default: "ic_launcher". Use "" for no large icon.
        //largeIconUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
        //smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
        bigText: 'Aramıza Hoşgeldiniz ', // (optional) default: "message" prop
        subText: 'Hanımeli', // (optional) default: none
        //bigPictureUrl: 'https://www.example.tld/picture.jpg', // (optional) default: undefined
        //bigLargeIcon: 'ic_launcher', // (optional) default: undefined
        //bigLargeIconUrl: 'https://www.example.tld/bigicon.jpg', // (optional) default: undefined
        color: 'red', // (optional) default: system default
        vibrate: true, // (optional) default: true
        vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
        tag: 'some_tag', // (optional) add tag to message
        group: 'group', // (optional) add group to message
        groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
        ongoing: true, // (optional) set whether this is an "ongoing" notification
        priority: 'high', // (optional) set notification priority, default: high
        visibility: 'private', // (optional) set notification visibility, default: private
        ignoreInForeground: false, // (optional) if true, the notification will not be visible when the app is in the foreground (useful for parity with how iOS notifications appear). should be used in combine with `com.dieam.reactnativepushnotification.notification_foreground` setting
        shortcutId: 'shortcut-id', // (optional) If this notification is duplicative of a Launcher shortcut, sets the id of the shortcut, in case the Launcher wants to hide the shortcut, default undefined
        onlyAlertOnce: false, // (optional) alert will open only once with sound and notify, default: false

        when: null, // (optional) Add a timestamp (Unix timestamp value in milliseconds) pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
        usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
        timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

        messageId: 'google:message_id', // (optional) added as `message_id` to intent extras so opening push notification can find data stored by @react-native-firebase/messaging module.

        //actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
        invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

        /* iOS only properties */
        category: '', // (optional) default: empty string

        /* iOS and Android properties */
        id: 0, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
        title: 'HANIMELİ🌹', // (optional)
        message: 'Aramıza Hoşgeldiniz! Birlikte daha güçlüyüz💎', // (required)
        userInfo: {}, // (optional) default: {} (using null throws a JSON value '<null>' error)
        playSound: false, // (optional) default: true
        soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
        number: 10, // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
        repeatType: 'day', // (optional) Repeating interval. Check 'Repeating Notifications' section for more info.
      });
    };
    showNotification();
    return <></>;
  };
  static navigationOptions = {
    title: 'Anasayfa',
  };
  render() {
    return (
      <View style={styles.container}>
        <SliderBox
          //ImageComponent={FastImage}
          images={this.state.images}
          sliderBoxHeight={100}
          onCurrentImagePressed={(index) =>
            console.warn(`image ${index} pressed`)
          }
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
          paginationBoxVerticalPadding={20}
          autoplay
          circleLoop
          resizeMethod={'resize'}
          resizeMode={'cover'}
          paginationBoxStyle={{
            position: 'absolute',
            bottom: 0,
            padding: 0,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            paddingVertical: 10,
          }}
          dotStyle={{
            width: 10,
            height: 10,
            borderRadius: 5,
            marginHorizontal: 0,
            padding: 0,
            margin: 0,
            backgroundColor: 'rgba(128, 128, 128, 0.92)',
          }}
          ImageComponentStyle={{borderRadius: 15, width: '97%', marginTop: 5}}
          imageLoadingColor="#2196F3"
        />
        <ScrollableTabView
          style={{marginTop: 8}}
          initialPage={0}
          //tabBarActiveTextColor="#009387"
          //tabBarInactiveTextColor="#808080"
          renderTabBar={() => <ScrollableTabBar />}>
          <AnasayfaScreen tabLabel="Yemek" navigation={this.props.navigation} />
          <DesignProducts
            tabLabel=" Tasarım & Dekorasyon"
            navigation={this.props.navigation}
          />
          <DietProducts tabLabel="Diyet" navigation={this.props.navigation} />
          <BabyProducts tabLabel="Bebek" navigation={this.props.navigation} />
        </ScrollableTabView>
        <ActionButton style={{marginTop: 50}} buttonColor="rgba(231,76,60,1)">
          <ActionButton.Item
            buttonColor="#9b59b6"
            title="Ürün Yükleme"
            onPress={() => this.props.navigation.navigate('AciklamaEkrani')}>
            <Icon
              name="add"
              size={20}
              color={'white'}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
          <ActionButton.Item
            buttonColor="#3498db"
            title="Eğlence"
            onPress={() => this.props.navigation.navigate('FunStoryAdd')}>
            <Icon
              name="happy"
              color={'white'}
              size={20}
              style={styles.actionButtonIcon}
            />
          </ActionButton.Item>
        </ActionButton>
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
