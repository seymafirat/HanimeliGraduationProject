import {Component} from 'react';
import * as React from 'react';
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import Video from 'react-native-video';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    marginTop: 50,
    padding: 5,
    //flex: 1,
    //flexDirection: 'column',
    //backgroundColor: '#000',
    //justifyContent: 'center',
    //alignItems: 'center',
  },
  button: {
    backgroundColor: 'blue',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  wrap: {
    //width: Dimensions.get('window').width,
    //height: Dimensions.get('window').height * 0.5, // 25% window
    margin: 5,
    width: '50%',
    height: 150,
  },
  image: {
    margin: 5,
    width: '50%',
    height: 150,
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  deneme: {
    height: '40%',
    backgroundColor: 'white',
  },
});

export default class App extends Component {
  mediaType: any;
  constructor() {
    super();
    this.state = {
      image: '',
      images: '',
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
  /*pickSingle(cropit, circular = false, mediaType) {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      cropping: cropit,
      cropperCircleOverlay: circular,
      sortOrder: 'none',
      compressImageMaxWidth: 1000,
      compressImageMaxHeight: 1000,
      compressImageQuality: 1,
      compressVideoPreset: 'MediumQuality',
      includeExif: true,
      cropperStatusBarColor: 'white',
      cropperToolbarColor: 'white',
      cropperActiveWidgetColor: 'white',
      cropperToolbarWidgetColor: '#3498DB',
    })
      .then((image) => {
        console.log('received image', image);
        this.setState({
          image: {
            uri: image.path,
            width: image.width,
            height: image.height,
            mime: image.mime,
            id: image.id,
            //path: image.path,
          },
          images: null,
        });
      })
      .catch((e) => {
        console.log(e);
        Alert.alert(e.message ? e.message : e);
      });
  }*/

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      sortOrder: 'desc',
      includeExif: true,
      forceJpg: true,
    })
      .then((images) => {
        this.setState({
          image: null,
          images: images.map((i) => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
              id: i.id,
            };
          }),
        });
      })
      .catch((e) => alert(e));
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderVideo(video) {
    console.log('rendering video');
    return (
      <View style={{height: 300, width: 200}}>
        <Video
          source={{uri: video.uri, type: video.mime}}
          style={{position: 'absolute', top: 0, left: 0, bottom: 0, right: 0}}
          rate={1}
          paused={false}
          volume={1}
          muted={false}
          resizeMode={'cover'}
          onError={(e) => console.log(e)}
          onLoad={(load) => console.log(load)}
          repeat={true}
        />
      </View>
    );
  }

  renderImage(image) {
    return (
      <Image
        style={{width: 300, height: 300, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      return this.renderVideo(image);
    }

    return this.renderImage(image);
  }

  render() {
    const {active} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.deneme}>
          <FlatList
            data={this.state.images}
            numColumns={2}
            renderItem={({item}) => (
              <Image
                style={{
                  width: 60,
                  height: 60,
                  backgroundColor: 'black',
                  marginLeft: 50,
                }}
                source={{uri: item.uri}}
              />
            )}
            keyExtractor={(item) => item.id}
          />
        </View>
        <TouchableOpacity
          style={styles.button}>
          <Text style={styles.text}>Select Single</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={this.pickMultiple.bind(this)}
          style={styles.button}>
          <Text style={styles.text}>Select Multiple</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
