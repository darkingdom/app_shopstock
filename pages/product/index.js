import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
  Modal,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
// import EvilIcons from 'react-native-vector-icons/EvilIcons';
// import Icon from 'react-native-vector-icons/Ionicons';
// import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import * as myStyle from '../../components/styles';
import {Server} from '../../config';
import Axios from 'axios';
import {FormatNumber} from '../../components/utilities';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Produk = ({route, navigation}) => {
  const {userid} = route.params;
  const {uuid} = route.params;
  const [product, setProduct] = useState('');
  const [image, setImage] = useState([]);
  const [varian, setVarian] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [imgActive, setimgActive] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
      }
    }
  };

  useEffect(() => {
    GetProduct();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      GetProduct();
    }, 2000);
  }, []);

  const GetProduct = () => {
    const data = {part: 'index', uuid};
    Axios.post(Server.urlHost + 'product', data)
      .then(response => {
        setProduct(response.data.product);
        setImage(response.data.image);
        setVarian(response.data.varian);
      })
      .catch(error => {
        console.error(error);
      });
  };

  Masukkan = e => {
    console.log(e);
  };

  const ImageProduct = ({image}) => {
    return (
      <Image
        style={[styles.wrap, {objectFit: 'contain'}]}
        source={{
          uri: Server.urlImage + '/garduweb/storage/upload/images/' + image,
        }}
      />
    );
  };

  const Merek = idbrand => {
    const [brand, setBrand] = useState('');
    const data = {part: 'merek', id: idbrand};
    Axios.post(Server.urlHost + 'product', data).then(response => {
      setBrand(response.data.merek);
    });
    return brand;
  };

  const VarianWarna = varianWarna => {
    const [warna, setWarna] = useState('');
    const data = {part: 'varianWarna', id: varianWarna};
    Axios.post(Server.urlHost + 'product', data).then(response => {
      setWarna(response.data.varianWarna);
    });
    return warna;
  };

  const VarianProduct = ({
    uuidVarian,
    warnaVarian,
    ukuranVarian,
    jenisVarian,
    stokVarian,
    hargaVarian,
  }) => {
    const [jumlah, setJumlah] = useState('');
    return (
      <View style={styles.varianItemWrap}>
        <View style={{width: '30%'}}>
          <Text>
            {product.varian_warna == 1 && VarianWarna(warnaVarian)}{' '}
            {product.varian_ukuran == 1 && ukuranVarian}{' '}
            {product.varian_jenis == 1 && jenisVarian}
          </Text>
        </View>
        <View style={{width: '15%'}}>
          <Text>({stokVarian})</Text>
        </View>
        <View style={{width: '30%'}}>
          <Text style={{color: 'red'}}>Rp {FormatNumber(hargaVarian)}</Text>
        </View>

        {/* <View style={{width: '20%'}}>
          <TextInput
            onchange={this.Masukkan}
            value={jumlah}
            style={styles.frmVarian}
            keyboardType="number-pad"></TextInput>
        </View> */}

        <View style={{width: '25%', paddingLeft: 10}}>
          {stokVarian > 0 ? (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate('order', {
                  part: 'varian',
                  userid,
                  idproduk: product.uniq_id,
                  idvarian: uuidVarian,
                })
              }>
              <View style={styles.btnOrderVarian}>
                <Text style={{color: '#FFF', fontSize: 14}}>ORDER</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Text style={{textAlign: 'center', fontStyle: 'italic'}}>
              Habis
            </Text>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['orange']}
          tintColor="orange"
        />
      }>
      <View style={styles.wrap}>
        <ScrollView
          onScroll={({nativeEvent}) => onchange(nativeEvent)}
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          horizontal
          style={styles.wrap}>
          {image.map(response => {
            return (
              <ImageProduct key={response.id} image={response.url_image} />
            );
          })}
        </ScrollView>
        <View style={styles.wrapDot}>
          {image.map((response, index) => (
            <Text
              key={response.id}
              style={imgActive == index ? styles.dotActive : styles.dot}>
              &#x25cf;
            </Text>
          ))}
        </View>
      </View>

      <View style={styles.titleWrap}>
        <Text style={styles.title}>{product.nama_produk}</Text>
      </View>

      {product.varian != 1 && (
        <View style={styles.prizeWrap}>
          <Text style={styles.prize}>Rp {FormatNumber(product.harga)}</Text>
        </View>
      )}

      <View style={styles.detailWrap}>
        <View style={styles.detailItem}>
          <View style={styles.detailHead}>
            <Text>Merek</Text>
          </View>
          <View style={styles.detailContent}>
            <Text>{Merek(product.id_brand)}</Text>
          </View>
        </View>
        <View style={styles.detailItem}>
          <View style={styles.detailHead}>
            <Text>Kondisi</Text>
          </View>
          <View style={styles.detailContent}>
            <Text>{product.kondisi}</Text>
          </View>
        </View>

        {product.varian != 1 && (
          <View style={styles.detailItem}>
            <View style={styles.detailHead}>
              <Text>Stok</Text>
            </View>
            <View style={styles.detailContent}>
              <Text>{product.stok}</Text>
            </View>
          </View>
        )}
      </View>

      <View style={{paddingHorizontal: 20, paddingVertical: 40}}>
        <Text>{product.deskripsi_produk}</Text>
      </View>

      {product.varian == 1 && (
        <View style={styles.varianWrap}>
          <View style={styles.varianHeadWrap}>
            <View style={{width: '30%'}}>
              <Text style={styles.varianHeadTitle}>Varian</Text>
            </View>
            <View style={{width: '15%'}}>
              <Text style={styles.varianHeadTitle}>Stok</Text>
            </View>
            <View style={{width: '30%'}}>
              <Text style={styles.varianHeadTitle}>Harga</Text>
            </View>
            {/* <View style={{width: '20%'}}>
              <Text style={styles.varianHeadTitle}>Jumlah</Text>
            </View> */}
            <View style={{width: '25%'}}>
              <Text></Text>
            </View>
          </View>

          {varian.map(data => {
            return (
              <VarianProduct
                key={data.id}
                uuidVarian={data.uuid}
                hargaVarian={data.harga}
                warnaVarian={data.warna}
                ukuranVarian={data.ukuran}
                jenisVarian={data.jenis}
                stokVarian={data.stok}></VarianProduct>
            );
          })}
        </View>
      )}

      {/* {product.varian != 1 && (
        <View style={styles.jumlahWrap}>
          <View>
            <Text style={styles.jumlah}>Jumlah</Text>
          </View>
          <View style={{marginLeft: 20}}>
            <TextInput
              value="1"
              keyboardType="number-pad"
              style={styles.frmJumlah}></TextInput>
          </View>
        </View>
      )} */}

      {/* <View style={styles.keteranganWrap}>
        <Text style={styles.keterangan}>Keterangan</Text>
        <TextInput
          style={styles.frmKeterangan}
          placeholder="Keterangan"></TextInput>
      </View> */}

      <View style={styles.downloadWrap}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('productDownload', {
              uuid: product.uniq_id,
              title: product.nama_produk,
            })
          }>
          <View style={styles.btnDownload}>
            <Text style={styles.btnTitle}>Simpan Gambar</Text>
          </View>
        </TouchableOpacity>
      </View>

      {product.varian != 1 && (
        <View style={{paddingHorizontal: 20, marginTop: 10}}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('order', {
                part: 'non_varian',
                userid,
                idproduk: product.uniq_id,
                idvarian: '',
              })
            }>
            <View style={styles.btnOrder}>
              <Text style={styles.btnTitle}>ORDER</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}

      <View style={{marginBottom: 50}}></View>

      {/* ========================= */}
      {/* <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalWrap}>
            <ScrollView style={styles.modalContent}>
              <Text>{product.deskripsi_produk}</Text>
            </ScrollView>
            <View style={styles.modalNav}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={styles.modalBtnClose}>
                <Text style={{color: '#FFF', fontSize: 16}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal> */}
    </ScrollView>
  );
};

export default Produk;

const styles = StyleSheet.create({
  container: {backgroundColor: '#FFF'},
  titleWrap: {paddingHorizontal: 20, paddingTop: 10},
  title: {fontSize: 24, fontWeight: 'bold'},
  prizeWrap: {paddingHorizontal: 20, paddingTop: 10},
  prize: {fontSize: 24, color: 'red'},
  descriptionWrap: {
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  btnDescription: {
    width: 100,
    backgroundColor: 'blue',
    alignItems: 'center',
    borderRadius: 5,
  },
  detailWrap: {
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#CCC',
    marginTop: 30,
  },
  detailItem: {flexDirection: 'row'},
  detailHead: {
    width: '50%',
    backgroundColor: '#EEE',
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  detailContent: {
    width: '50%',
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  varianWrap: {paddingHorizontal: 20, paddingTop: 20},
  varianHeadWrap: {flexDirection: 'row', paddingBottom: 3},
  varianHeadTitle: {fontWeight: 'bold'},

  varianItemWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
  },
  frmVarian: {
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 0,
  },
  btnOrderVarian: {
    backgroundColor: 'darkgreen',
    paddingVertical: 5,
    paddingHorizontal: 5,
    borderRadius: 5,
    alignItems: 'center',
  },

  jumlahWrap: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  jumlah: {fontWeight: 'bold', fontSize: 16},
  frmJumlah: {
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    width: 100,
    fontSize: 18,
  },
  keteranganWrap: {paddingHorizontal: 20, marginTop: 20},
  keterangan: {marginLeft: 5},
  frmKeterangan: {
    borderWidth: 1,
    borderColor: '#CCC',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  downloadWrap: {paddingHorizontal: 20, marginTop: 40},
  btnDownload: {
    backgroundColor: '#888',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnOrder: {
    backgroundColor: 'red',
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  btnTitle: {color: '#FFF', fontSize: 14},

  // IMAGE --------------------
  wrap: {
    width: WIDTH,
    height: HEIGHT * 0.5,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dotActive: {
    margin: 3,
    color: 'black',
    fontSize: 24,
  },
  dot: {
    margin: 3,
    color: 'white',
    fontSize: 24,
  },
  // END IMAGE --------------------

  // MODAL --------------------
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingVertical: 100,
  },
  modalWrap: {
    flex: 1,
    backgroundColor: '#FFF',
    borderRadius: 10,
    elevation: 5,
    position: 'relative',
  },
  modalContent: {
    padding: 20,
    marginBottom: 60,
  },
  modalNav: {
    position: 'absolute',
    bottom: 0,
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    width: '100%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'flex-end',
    backgroundColor: '#FFF',
  },
  modalBtnClose: {
    backgroundColor: 'skyblue',
    width: 100,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 5,
  },
  // END MODAL --------------------
});
