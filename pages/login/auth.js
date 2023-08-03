import React, {useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Config, Server} from '../../config';
import Axios from 'axios';

const Auth = ({navigation}) => {
  useEffect(() => {
    const getData = async () => {
      const isLogin = await AsyncStorage.getItem('@uuid');
      if (isLogin !== null) {
        auth(isLogin);
      } else {
        navigation.replace('login');
      }
    };

    setTimeout(() => {
      getData();
    }, 2000);
  }, []);

  const auth = uuid => {
    const data = {uuid};
    const url = Server.urlHost + 'auth';
    Axios.post(url, data)
      .then(response => {
        if (response.data.status == 'OK') {
          //navigation.replace('dashboard', {uuid});
        } else {
          navigation.replace('login');
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  //====================================================================================

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'darkred',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
        <ActivityIndicator size="large" color="darkorange" />
      </View>
    </View>
  );
};

export default Auth;

const styles = StyleSheet.create({});
