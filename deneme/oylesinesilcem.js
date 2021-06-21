/*import React, {useState} from 'react';
import {Button, SafeAreaView, Alert, useColorScheme, View} from 'react-native';

import {launchImageLibrary} from 'react-native-image-picker';

export default function App() {
  const [lastId, setLastId] = useState(undefined);

  const uploadPhoto = photo_uri => {
    const data = new FormData();

    data.append('adi', 'DENEE');

    data.append('altkategoriId', '2');

    data.append('kategoriId', '2');

    data.append('photo', {
      uri: photo_uri,
      type: 'image/png',
    });

    const requestData = {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      body: data,
    };

    const apiRequestUrl = lastId
      ? http://213.159.30.21/service/api/Urun/${lastId}
      : 'http://213.159.30.21/service/api/Urun/';

    console.log('rEQQ', apiRequestUrl);

    return fetch(apiRequestUrl, requestData)
      .then(response => response.json())
      .then(resp => {
        console.log('RESPONSE >>>> ', lastId, JSON.stringify(resp, null, 4));

        Alert.alert('Hİ BABA ID ', `BENIM SON ID BUDUR : ${resp.id}`);

        setLastId(JSON.parse(resp.id));

        // if (data) {
        //   update(data[0]);
        // }
      })
      .catch(error => {
        console.log('ERR', error);
      });
  };

  return (
    <SafeAreaView>
      <View>
        <Button
          title="Upload IMAGE"
          onPress={() =>
            launchImageLibrary(
              {
                mediaType: 'photo',
                includeBase64: false,
                maxWidth: 100,
                maxHeight: 100,
              },
              response => {
                if (response?.didCancel) {
                  return;
                }

                if (response.errorCode === 'permission') {
                  Alert.alert(
                    'Fotoğraf yüklebilmek için galerinize izin vermelisiniz.',
                  );
                  return;
                }
                uploadPhoto(response.uri);
              },
            )
          }
        />
      </View>
    </SafeAreaView>
  );
}*/
