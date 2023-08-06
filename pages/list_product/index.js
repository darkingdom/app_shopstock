import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
// import Icon from 'react-native-vector-icons/Ionicons';
import * as myStyle from '../../components/styles';
import {Server} from '../../config';
import Axios from 'axios';

const ListProduk = ({route, navigation}) => {
  const {categories} = route.params;
  const [page, setPage] = useState(0);
  const [total, setTotal] = useState('');
  const limit = 30;
  const [produk, setProduk] = useState([]);

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    LoadDB();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      LoadDB();
    }, 2000);
  }, []);

  const LoadDB = () => {
    const data = {part: 'index', kategori: categories, page, limit};
    Axios.post(Server.urlHost + 'listProduct', data)
      .then(response => {
        setTotal(response.data.total);
        setProduk(response.data.produk);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const SearchProduk = q => {
    if (q == '') {
      LoadDB();
    } else {
      const data = {part: 'search', q, kategori: categories, page, limit};
      Axios.post(Server.urlHost + 'listProduct', data).then(response => {
        setProduk(response.data.produk);
      });
    }
  };

  const PrizeVarian = ({uniq_id, varian}) => {
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

  const ListItem = ({uuid, image, title, varian}) => {
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
            height: 80,
            width: 80,
            borderRadius: 3,
          }}>
          <Image
            style={{height: 80, width: 80, objectFit: 'contain'}}
            source={{
              uri:
                Server.urlImage +
                '/garduweb/storage/upload/images/thumb/' +
                image,
            }}
          />
        </View>
        <View style={{paddingLeft: 10, paddingRight: 80}}>
          <Text style={{fontSize: 20}}>{title}</Text>
          <Text style={{fontSize: 18, fontWeight: 'bold'}}>
            {PrizeVarian({uniq_id: uuid, varian})}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      style={{flex: 1, backgroundColor: '#FFF'}}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['orange']}
          tintColor="orange"
        />
      }>
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
          onChangeText={q => SearchProduk(q)}
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
                uuid={data.uuid}
                title={data.title}
                image={data.image}
                varian={data.varian}
              />
            );
          })}
        </ScrollView>
      </View>
    </ScrollView>
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
