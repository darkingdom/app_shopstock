import React, {useState} from 'react';
import {
  Text,
  Alert,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Server} from '../../config';
import Axios from 'axios';

const Login = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const submitLogin = () => {
    if (username == '' || password == '') {
      Alert.alert('', 'Form tidak boleh kosong');
    } else {
      login();
    }
  };

  const login = () => {
    const data = {username, password};
    const url = Server.urlHost + 'login';
    Axios.post(url, data)
      .then(response => {
        if (response.data.status == 'OK') {
          // navigation.replace('dashboard', {username: response.data.username});
          storeData(response.data.uuid);
        } else {
          Alert.alert('', response.data.status);
        }
      })
      .catch(error => {
        console.error(error);
      });
  };

  const storeData = async value => {
    try {
      await AsyncStorage.setItem('@uuid', value);
      navigation.replace('dashboard', {uuid: value});
    } catch (e) {
      Alert.alert('Alert', 'Terjadi kesalahan menyimpan data');
    }
  };

  //====================================================================================

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../components/assets/images/bg-login-shopstock.jpg')}
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
        // resizeMode="repeat"
        imageStyle={{width: '100%', height: '50%'}}>
        <View style={{alignItems: 'center', marginBottom: '10%'}}>
          <View
            style={{
              width: 160,
              backgroundColor: '#FFF',
              borderRadius: 80,
              // overflow: 'hidden',
            }}>
            <Image
              style={{width: 150, height: 150}}
              source={require('../../components/assets/images/logo-shopstock.png')}></Image>
          </View>
          <View style={{marginTop: 15}}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: 'bold',
                color: '#FFF',
                backgroundColor: '#000',
                paddingHorizontal: 10,
              }}>
              IDHA BRANDED COLLECTION
            </Text>
          </View>
        </View>
        <View
          style={{
            // display: 'none',
            backgroundColor: '#FFF',
            height: '70%',
            borderTopEndRadius: 100,
            paddingHorizontal: '15%',
          }}>
          <View
            style={{
              marginTop: '20%',
              alignItems: 'center',
            }}>
            <Text style={{fontSize: 46, fontWeight: 'bold'}}>Login</Text>
            <Text style={{fontSize: 14, marginTop: 7}}>
              Masukkan untuk melanjutkan
            </Text>
          </View>

          <View style={{paddingTop: '10%'}}>
            <TextInput
              style={{
                backgroundColor: '#d4d4d4',
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
              value={username}
              onChangeText={value => setUsername(value)}
              placeholder="Username"
            />
          </View>
          <View style={{paddingTop: 20}}>
            <TextInput
              style={{
                backgroundColor: '#d4d4d4',
                borderRadius: 10,
                paddingHorizontal: 15,
              }}
              onChangeText={value => setPassword(value)}
              placeholder="Password"
              secureTextEntry
            />
          </View>
          <View style={{marginTop: 40}}>
            <TouchableOpacity onPress={submitLogin}>
              <View
                style={{
                  backgroundColor: '#141414',
                  paddingVertical: 13,
                  alignItems: 'center',
                  borderRadius: 8,
                }}>
                <Text style={{color: '#f5f3f0', fontWeight: 'bold'}}>
                  Login
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={{marginTop: 60, alignItems: 'center'}}>
            <TouchableOpacity>
              <Text style={{fontSize: 16}}>Lupa password ?</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 10}}>
              <Text style={{fontSize: 16}}>Daftar baru</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'grey',
  },
});
