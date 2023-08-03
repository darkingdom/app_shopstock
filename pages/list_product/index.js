import {
  Button,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
  ScrollView,
  TextInput,
} from 'react-native';
import React, {useEffect, useState} from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import * as myStyle from '../../components/styles';
import {Server} from '../../config';
import Axios from 'axios';

const ListProduk = ({route, navigation}) => {
  // const {categories} = route.categories;
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState('');
  const limit = 30;
  const [produk, setProduk] = useState([]);

  useEffect(() => {
    LoadDB();
  }, []);

  const LoadDB = () => {
    const data = {part: 'index', kategori: 1, page, limit};
    Axios.post(Server.urlHost + 'listProduct', data)
      .then(response => {
        setTotal(response.data.total);
        setProduk(response.data.produk);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const PrizeVarian = ({uniq_id, varian, harga}) => {
    const [Harga, setHarga] = useState(0);
    if (varian == '1') {
      const data = {part: 'varian-prize', uniq_id};
      Axios.post(Server.urlHost + 'listProduct', data).then(response => {
        setHarga(response.data.harga);
      });
    } else {
      const data = {part: 'prize', uniq_id};
      Axios.post(Server.urlHost + 'listProduct', data).then(response => {
        setHarga(response.data.harga);
      });
    }
    return Harga;
  };

  const ListItem = ({id, uuid, image, title, varian, harga}) => {
    return (
      <TouchableOpacity
        onPress={() => navigation.navigate('product', {uuid: uuid})}
        style={{
          flexDirection: 'row',
          borderBottomColor: '#CCC',
          borderBottomWidth: 1,
          paddingBottom: 10,
          paddingHorizontal: 10,
          marginBottom: 10,
        }}>
        <View
          style={{
            backgroundColor: '#FF00FF',
            height: 80,
            width: 80,
            borderRadius: 3,
          }}></View>
        <View style={{paddingLeft: 10, paddingRight: 80}}>
          <Text style={{fontSize: 20}}>{title}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {PrizeVarian({uniq_id: uuid, varian, harga})}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#FFF'}}>
      <View
        style={{
          backgroundColor: '#444',
          paddingVertical: 20,
          alignItems: 'center',
        }}>
        <Text style={{color: '#FFF'}}>MAN</Text>
      </View>
      <View style={{marginTop: 20, paddingHorizontal: 20}}>
        <TextInput
          style={{
            borderColor: '#CCC',
            borderWidth: 1,
            paddingHorizontal: 10,
            borderRadius: 10,
          }}
          placeholder="Cari"></TextInput>
      </View>

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <ScrollView style={{marginTop: 10}}>
          {produk.map(data => {
            return (
              <ListItem
                key={data.id}
                id={data.id}
                uuid={data.uniq_id}
                title={data.nama_produk}
                varian={data.varian}
                harga={data.harga}
              />
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};

export default ListProduk;

const styles = StyleSheet.create({});

{
  /* <View style={{padding: 50}}>
        <Text>Total: {total}</Text>
        <Text>Page: {page}</Text>
        <Text>Limit: {limit}</Text>
      </View> */
}
