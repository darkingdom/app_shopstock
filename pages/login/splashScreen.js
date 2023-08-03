import React, {useEffect} from 'react';
import {
  Alert,
  Linking,
  BackHandler,
  StyleSheet,
  Text,
  View,
  Image,
} from 'react-native';
// import VersionCheck from 'react-native-version-check';
import {App, Server} from '../../config';
import Axios from 'axios';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      //checkVersion();
      // navigation.replace('auth');
    }, 3000);
  }, []);

  const checkVersion = () => {
    const data = {versi: App.version};
    const url = Server.urlHost + 'version';
    Axios.post(url, data)
      .then(response => {
        if (response.data.update == 'UPDATE_READY') {
          navigation.replace('updater', {file: response.data.urlFile});
        } else {
          navigation.replace('auth');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };
  // const checkVersion = async () => {
  // try {
  // let updateNeeded = await VersionCheck.needUpdate();
  // if (updateNeeded && updateNeeded.isNeeded) {
  //   Alert.alert(
  //     'Please Update',
  //     'You will have update app to the lastest version continue using.',
  //     [
  //       {
  //         text: 'Update',
  //         onPress: () => {
  //           BackHandler.exitApp();
  //           Linking.openURL(updateNeeded.storeUrl);
  //         },
  //       },
  //     ],
  //     {cancelable: false},
  //   );
  // } else {
  //   navigation.replace('auth');
  // }
  // } catch (error) {}
  // };

  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../components/assets/images/pppoe-monitor.jpg')}></Image>
      </View>
      <View style={styles.markWrapper}>
        <Text>zizistudio</Text>
      </View>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  markWrapper: {
    alignItems: 'center',
    paddingVertical: 20,
  },
});
