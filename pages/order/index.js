import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {Server} from '../../config';
import {FormatNumber} from '../../components/utilities';
import Axios from 'axios';

const Order = ({route, navigation}) => {
  const {part} = route.params;
  const {userid} = route.params;
  const {idproduk} = route.params;
  const {idvarian} = route.params;

  const [product, setProduct] = useState('');
  const [image, setImage] = useState('');
  const [varian, setVarian] = useState('');

  const [jumlah, setJumlah] = useState(1);
  const [keterangan, setKeterangan] = useState('');

  useEffect(() => {
    GetProduct();
  }, []);

  const GetProduct = () => {
    const data = {
      part: 'index',
      partVarian: 'varian',
      uuid: idproduk,
      uuidVarian: idvarian,
    };
    Axios.post(Server.urlHost + 'order', data).then(response => {
      setProduct(response.data.product);
      setImage(response.data.image);
      setVarian(response.data.varian);
    });
  };

  const jumlahMin = () => {
    if (jumlah > 1) {
      setJumlah(jumlah - 1);
    }
  };
  const jumlahPlus = () => {
    setJumlah(Number(jumlah) + 1);
  };

  const VarianWarna = varianWarna => {
    const [warna, setWarna] = useState('');
    const data = {part: 'varianWarna', id: varianWarna};
    Axios.post(Server.urlHost + 'order', data).then(response => {
      setWarna(response.data.varianWarna);
    });
    return warna;
  };

  const PressOrder = () => {
    let sisaStok;
    if (part == 'varian') {
      sisaStok = varian.stok - jumlah;
    } else {
      sisaStok = product.stok - jumlah;
    }

    // console.log(sisaStok);
    if (sisaStok < 0) {
      Alert.alert('WARNING', 'Stok tidak cukup');
    } else {
      Alert.alert('PESANAN', 'Apakah anda ingin melanjutkan pemesanan?', [
        {text: 'BATAL', style: 'cancel'},
        {text: 'OKE', onPress: () => Order()},
      ]);
    }
  };

  const Order = () => {
    let typeVarian = '1';
    if (part != 'varian') {
      typeVarian = '';
    }

    const data = {
      part: 'keranjang',
      userid,
      idproduk,
      varian: typeVarian,
      idvarian,
      jumlah,
      keterangan,
    };
    Axios.post(Server.urlHost + 'order', data).then(response => {
      if (response.data.simpan == 'Berhasil') {
        Alert.alert('INFO', 'Berhasil ditambahkan ke keranjang', [
          {text: 'OKE', onPress: () => navigation.goBack()},
        ]);
      } else {
        Alert.alert(
          'WARNING',
          'Koneksi tidak stabil. GAGAL menambahkan ke keranjang',
        );
      }
      console.log(response);
    });
  };

  return (
    <View style={styles.container}>
      <View
        style={{
          backgroundColor: '#FFF',
          marginHorizontal: 20,
          marginTop: 40,
          padding: 10,
          borderRadius: 5,
          elevation: 5,
        }}>
        <View style={styles.itemWrap}>
          <View style={styles.imgWrap}>
            <Image
              style={styles.img}
              source={{
                uri:
                  Server.urlImage +
                  '/garduweb/storage/upload/images/thumb/' +
                  image,
              }}
            />
          </View>
          <View style={styles.content}>
            <Text style={styles.titleContent}>{product.nama_produk}</Text>

            {part == 'varian' ? (
              <View>
                <Text style={styles.prizeWrap}>
                  Rp {FormatNumber(varian.harga)}
                </Text>
                <Text>Stok: {varian.stok}</Text>
                <Text>
                  Varian: {VarianWarna(varian.warna)} {varian.ukuran}{' '}
                  {varian.jenis}
                </Text>
              </View>
            ) : (
              <View>
                <Text style={styles.prizeWrap}>
                  Rp {FormatNumber(product.harga)}
                </Text>
                <Text>Stok: {product.stok}</Text>
              </View>
            )}
          </View>
        </View>

        <View style={styles.keteranganWrap}>
          <TextInput
            onChangeText={e => setKeterangan(e)}
            value={keterangan}
            style={styles.frmKeterangan}
            placeholder="Keterangan"></TextInput>
        </View>

        <View style={styles.jumlahWrap}>
          <View>
            <Text style={styles.jumlah}>Jumlah</Text>
          </View>
          <View style={{marginLeft: 20, flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => jumlahMin()}
              style={{
                borderColor: '#CCC',
                borderWidth: 1,
                paddingHorizontal: 10,
                justifyContent: 'center',
                borderTopLeftRadius: 5,
                borderBottomLeftRadius: 5,
              }}>
              <Icon name="minus" size={18}></Icon>
            </TouchableOpacity>
            <TextInput
              onChangeText={e => setJumlah(e)}
              value={jumlah.toString()}
              inputMode="numeric"
              keyboardType="number-pad"
              style={styles.frmJumlah}></TextInput>
            <TouchableOpacity
              onPress={() => jumlahPlus()}
              style={{
                borderColor: '#CCC',
                borderWidth: 1,
                paddingHorizontal: 10,
                justifyContent: 'center',
                borderTopRightRadius: 5,
                borderBottomRightRadius: 5,
              }}>
              <Icon name="plus" size={18}></Icon>
            </TouchableOpacity>
          </View>
        </View>

        <View
          style={{
            marginTop: 10,
            borderColor: '#EEE',
            borderWidth: 1,
            paddingTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => PressOrder()}
            style={{
              backgroundColor: 'green',
              paddingVertical: 8,
              borderRadius: 3,
            }}>
            <Text style={{textAlign: 'center', color: '#FFF'}}>Keranjang</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Order;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  img: {
    height: 80,
    width: 80,
    objectFit: 'contain',
  },
  imgWrap: {
    height: 80,
    width: 80,
    borderRadius: 3,
  },
  itemWrap: {
    flexDirection: 'row',
    paddingBottom: 10,
    paddingHorizontal: 10,
  },
  content: {
    paddingLeft: 10,
    paddingRight: 80,
  },
  titleContent: {fontSize: 20},
  prizeWrap: {fontSize: 18, fontWeight: 'bold'},
  keteranganWrap: {marginTop: 0},
  keterangan: {marginLeft: 5},
  frmKeterangan: {
    borderWidth: 1,
    borderColor: 'green',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  jumlahWrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 10,
  },
  jumlah: {fontWeight: 'bold', fontSize: 16, marginLeft: 5},
  frmJumlah: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 50,
    fontSize: 18,
  },
});
