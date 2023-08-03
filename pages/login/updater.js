import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  PermissionsAndroid,
} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob';

const Updater = ({route, navigation}) => {
  const {urlFile} = route.params;

  // const urlFile =
  //   'http://download.garduweb.com/files/mt4/STMJ-ForexCopy-1.71.rar';

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadFile();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          downloadFile();
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = () => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    let FILE_URL = urlFile;
    // Function to get extention of the file url
    let file_ext = getFileExtention(FILE_URL);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    // let RootDir = fs.dirs.PictureDir;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        // path:
        //   RootDir +
        //   '/file_' +
        //   Math.floor(date.getTime() + date.getSeconds() / 2) +
        //   file_ext,
        path: RootDir + '/Kasir.RTRW-NET.apk',
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', FILE_URL)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Downloaded Successfully.');
      });
  };

  const getFileExtention = fileUrl => {
    // To get the file extension
    return /[.]/.exec(fileUrl) ? /[^.]+$/.exec(fileUrl) : undefined;
  };

  const submitCancel = () => {
    navigation.replace('auth');
  };

  return (
    <View style={styles.container}>
      <View style={{paddingHorizontal: 20}}>
        <View style={{alignItems: 'center'}}>
          <Image
            source={require('../../components/assets/images/update.jpg')}></Image>
        </View>
        <View style={{marginTop: 30, marginBottom: 20}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>
            Versi baru sudah tersedia
          </Text>
        </View>
        <View style={{marginBottom: 10}}>
          <Button title="Update" onPress={checkPermission}></Button>
        </View>
        <View>
          <Button title="Cancel" color={'red'} onPress={submitCancel}></Button>
        </View>
      </View>
    </View>
  );
};

export default Updater;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
  },
});
