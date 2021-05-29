import React, {Component} from 'react';
import {View, Text, TouchableOpacity, PermissionsAndroid} from 'react-native';
//import {styles} from './Styles';
import {styles} from './styles';
import {ActionSheet, Root} from 'native-base';
import ImagePicker from 'react-native-image-crop-picker';
import AciklamaEkrani from './AciklamaEkrani';
import SecimEkrani from './SecimEkrani';
import ViewPhotos from './ViewPhotos';
import detayekrani from './detayekrani';
export default class Home extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  navigateToViewPhotos = (data) => {
    this.props.navigation.navigate('detayekrani', data);
  };

  takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      //ratio:{'2:2'},
      width: 300,
      height: 400,
      cropping: true,
    })
      .then((image) => {
        console.log(image);
        let imageData = [image];
        if (imageData.length > 0) {
          this.navigateToViewPhotos(imageData);
        }
      })
      .catch((err) => {
        console.log(' Error fetching image from Camera roll ', err);
      });
  };

  choosePhotosFromGallery = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 200,
      multiple: true,
      //cropping: true,
    })
      .then((images) => {
        console.log(images);
        if (images.length > 0) {
          this.navigateToViewPhotos(images);
        }
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

  render() {
    return (
      <Root>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.button}
            onPress={this.selectImages.bind(this)}>
            <Text style={styles.buttonText}>Select Images</Text>
          </TouchableOpacity>
        </View>
      </Root>
    );
  }
}
