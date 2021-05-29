import React, {Component} from 'react';
import {FlatList, Image, Platform, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Home from '../deneme/Home';
import {styles} from './styles';
import {createSwitchNavigator, createAppContainer} from 'react-navigation';
import AciklamaEkrani from './AciklamaEkrani';
import ImagePicker from 'react-native-image-crop-picker';
import {ActionSheet, Root} from 'native-base';
export default class SecimEkrani extends Component {
  constructor(props) {
    super();
    this.state = {
      //images: '',
      //setImages: '',
      imageList: [],
      imageData: '',
    };
  }

  navigateToViewPhotos = (data) => {
    this.props.navigation.navigate('SecimEkrani', data);
  };
  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        let imageData = [image];
        if (imageData.length > 0) {
          this.navigateToViewPhotos(imageData);
          //this.setState(imageData);
        }
      })
      .catch((err) => {
        console.log(' Error fetching image from Camera roll ', err);
      });
  };

  choosePhotosFromGallery = () => {
    //let resimList = [];
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      multiple: true,
      //cropping: true,
    })
      .then((images) => {
        console.log(images);
      })
      .catch((err) => {
        console.log(' Error fetching images from gallery ', err);
      });
  };

  selectImages() {
    const buttons = ['Kamera', 'Fotoğraf Kitaplığım', 'Çıkış'];
    ActionSheet.show(
      {
        options: buttons,
        cancelButtonIndex: 2,
      },
      (buttonIndex) => {
        console.log(' selected index ', buttonIndex);
        switch (buttonIndex) {
          case 0:
            this.takePhotoFromCamera();
            break;
          case 1:
            this.choosePhotosFromGallery();
            break;
          default:
            break;
        }
      },
    );
  }
  componentDidMount() {
    //const deneme = this.extractRequiredImageData.bind();
    this.extractRequiredImageData.bind(this.extractRequiredImageData);
  }

  extractRequiredImageData = () => {
    let imageData = this.props.navigation.state.params;
    //let imageData = this.setState(imageData);
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
    return (
      <Root>
        <View style={styles.SecimEkraniContainer}>
          <View style={styles.ustBaslik}>
            <Icon style={styles.kapat} name="close" size={26} color={'#000'} />
            <Icon
              onPress={() => this.props.navigation.navigate('AciklamaEkrani')}
              style={styles.ileri}
              name="arrow-forward"
              size={26}
              color={'#000'}
            />
          </View>
          <View style={styles.imageContainer}>
            <Icon
              style={styles.galeriSecme}
              name="image"
              size={24}
              color={'#000'}
              onPress={() => this.choosePhotosFromGallery()}
            />
            <FlatList
              data={this.state.imageList}
              numColumns={2}
              renderItem={({item}) => (
                <Image style={styles.image} source={{uri: item.filePath}} />
              )}
              keyExtractor={(item) => item.id}
            />
          </View>
        </View>
      </Root>
    );
  }
}
