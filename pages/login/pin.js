import React, {useState} from 'react';
import {Alert, TextInput, StyleSheet, Text, View} from 'react-native';
import {Button} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Config} from '../../config';
import Axios from 'axios';

const pin = ({route, navigation}) => {
  const {id} = route.params;
  const [pin, setPIN] = useState('');

  const submitPIN = () => {
    loginPIN();
  };

  const loginPIN = () => {
    const data = {id, pin};
    const url = Config.url + 'loginPIN';
    Axios.post(url, data)
      .then(response => {
        if (response.data.status == 'successful') {
          storeData(id);
        } else {
          Alert.alert('', response.data.message);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@storage_Key', value);
      navigation.replace('dashboard', {id: value});
    } catch (e) {
      Alert.alert('Terjadi Kesalahan');
    }
  };

  //====================================================================================

  return (
    <View style={styles.container}>
      <View
        style={{alignItems: 'center', padding: 20, marginTop: 150, flex: 1}}>
        <Text style={{fontSize: 25}}>Masukan PIN</Text>
        <TextInput
          keyboardType="number-pad"
          secureTextEntry
          maxLength={6}
          value={pin}
          onChangeText={value => setPIN(value)}
          style={styles.frmPIN}
        />
      </View>
      <View style={{marginBottom: 40, paddingHorizontal: 20}}>
        <Button mode="contained" dark={true} onPress={submitPIN}>
          Lanjutkan
        </Button>
      </View>
    </View>
  );
};

export default pin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  frmPIN: {
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
    width: 250,
    textAlign: 'center',
    fontSize: 24,
    marginTop: 30,
    letterSpacing: 30,
    fontWeight: 'bold',
  },
});
