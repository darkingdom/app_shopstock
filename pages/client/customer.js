import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View, ScrollView} from 'react-native';
import {Server} from '../../config';
import {FormatDate} from '../../components/utilities';
import Axios from 'axios';

const Customer = ({route}) => {
  const {uuid} = route.params;
  const [sumPelanggan, setSumPelanggan] = useState('');
  const [pelanggan, setPelanggan] = useState([]);

  useEffect(() => {
    customer();
  }, []);

  const customer = () => {
    const data = {uuid};
    const url = Server.urlHost + 'allcustomer';
    Axios.post(url, data)
      .then(response => {
        setSumPelanggan(response.data.total_pelanggan);
        setPelanggan(response.data.pelanggan);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const Item = ({id, date, pppoe, reason}) => {
    return (
      <View style={styles.listWrapper}>
        <View>
          <Text style={styles.listTitle}>{pppoe}</Text>
          <Text>{reason}</Text>
        </View>
        <View>
          <Text>{FormatDate(date, 'datetime')}</Text>
        </View>
      </View>
    );
  };

  //================================================================
  return (
    <View style={styles.container}>
      {sumPelanggan == 0 ? (
        <View
          style={{
            padding: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            marginTop: 20,
            backgroundColor: '#DDD',
            marginHorizontal: 20,
          }}>
          <Text>Tidak ada data ditampilkan</Text>
        </View>
      ) : (
        <ScrollView style={{marginTop: 10}}>
          {pelanggan.map(pppoe => {
            return (
              <Item
                key={pppoe.id}
                id={pppoe.id}
                date={pppoe.tanggal_connect}
                pppoe={pppoe.pppoe}
                reason={pppoe.ipv4_address}
              />
            );
          })}
        </ScrollView>
      )}
    </View>
  );
};

export default Customer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  listWrapper: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#DDD',
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  listTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#222',
  },
});
