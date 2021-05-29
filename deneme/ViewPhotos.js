import {Component} from 'react';
import * as React from 'react';
//import Carousel from 'react-native-snap-carousel';
//import Carousel from '../components/Carousel';
//import AnimatedFlatlist from '../components/AnimatedFlatlist';
import {
  View,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  Text,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
//import {styles} from './styles';
//import Icon from 'react-native-vector-icons/FontAwesome';
//const scrollY = useRef < new Animated.Value() > (0).current;

export default class ViewPhotos extends Component {
  //const camera = useRef < RNCamera > null;
  constructor(props) {
    super();
    this.state = {
      imageList: [],
      active: 0,
    };
  }
  change(nativeEvent) {
    // console.log("nativeEvent:", nativeEvent)
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide !== this.state.active) {
        this.setState({
          active: slide,
        });
      }
    }
  }

  componentDidMount() {
    this.extractRequiredImageData();
  }

  extractRequiredImageData = () => {
    let imageData = this.props.navigation.state.params;
    let imageList = [];

    for (let i = 0; i < Object.keys(imageData).length; i++) {
      let data = imageData[String(i)];
      let image = {
        id: String(i),
        contentType: data.mime,
        fileSize: data.size,
        filePath: data.path,
      };
      console.log(data.path);

      if (Platform.OS === 'android') {
        image.fileName = data.filename;
      } else {
        let path = data.path.split('/');
        image.fileName = path[path.length - 1];
      }

      imageList.push(image);
    }
    this.setState({
      imageList,
    });
  };

  render() {
    const {active} = this.state;
    //const scrollY = useRef < new Animated.Value() > (0).current;
    return (
      <SafeAreaView style={styles.container}>
        {/* <View style={{ padding: 20, backgroundColor: 'orange', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>HomeScreen</Text>
        </View> */}
        <View style={styles.wrap}>
          <ScrollView
            onScroll={({nativeEvent}) => this.change(nativeEvent)}
            //onScroll={({nativeEvent}) => this.change(nativeEvent)}
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}>
            {this.state.imageList.map((e, index) => (
              <Image
                key={index}
                resizeMode="stretch"
                style={styles.wrap}
                source={{uri: e.filePath}}
              />
            ))}
          </ScrollView>
          <View style={styles.wrapDot}>
            {this.state.imageList.map((e, index) => (
              <Text
                key={e}
                style={active === index ? styles.dotActive : styles.dot}>
                ●
              </Text>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    //height: '90%',
    //marginTop: 430,
    //marginLeft: 50,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25,
  },
  wrap: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.25, // 25% window
  },
  imageViewerContainer: {
    flex: 1,
    //backgroundColor: 'white',
    //height: '100%',
    //marginTop: 50,
    //padding: 5,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },

  image: {
    margin: 5,
    width: 100,
    height: 100,
  },
});
