import React, {Component} from 'react';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
} from 'native-base';
import {
  View,
  Platform,
  FlatList,
  Image,
  TouchableOpacity,
  Animated,
  Dimensions,
  StatusBar,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
export default class detayekrani extends Component {
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
    return (
      <Container>
        <Content>
          <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={require('./assets/profilfoto.jpg')} />
                <Body>
                  <Text>NativeBase</Text>
                  <Text note>April 15, 2016</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
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
                          source={require('./assets/profilfoto.jpg')}
                        />
                      ))}
                    </ScrollView>
                    <View style={styles.wrapDot}>
                      {this.state.imageList.map((e, index) => (
                        <Text
                          key={e}
                          style={
                            active === index ? styles.dotActive : styles.dot
                          }>
                          ●
                        </Text>
                      ))}
                    </View>
                  </View>
                </SafeAreaView>
                <Text>//Your text here</Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="heart" />
                  <Text>1,926 stars</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
        </Content>
      </Container>
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
