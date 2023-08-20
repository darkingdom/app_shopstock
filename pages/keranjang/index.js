import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Server} from '../../config';
import Axios from 'axios';
import {FormatNumber} from '../../components/utilities';

const Keranjang = ({route, navigation}) => {
  const {userid} = route.params;
  const [keranjang, setKeranjang] = useState([]);
  const [totalHarga, setTotalHarga] = useState('');

  useEffect(() => {
    GetData();
  }, []);

  const GetData = () => {
    const data = {part: 'index', userid};
    Axios.post(Server.urlHost + 'keranjang', data)
      .then(response => {
        setKeranjang(response.data.keranjang);
        setTotalHarga(response.data.totalHarga);
        // console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const TotalPrice = () => {
    let total = 0;
    keranjang.map(item => (total = total + Number(item.harga)));
    return total;
  };

  const ItemKeranjang = ({
    title,
    image,
    harga,
    varian,
    typeVarian,
    keterangan,
    jumlah,
  }) => {
    return (
      <View style={styles.itemWrap}>
        <View style={styles.item}>
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
            <Text style={styles.titleContent}>{title}</Text>
            <Text style={styles.itemPrize}>{FormatNumber(harga)}</Text>
            {varian != '' && (
              <Text style={styles.itemVarian}>Varian: {typeVarian}</Text>
            )}
            {keterangan != '' && (
              <Text style={styles.itemKeterangan}>
                Catatan:{' '}
                <Text style={{fontStyle: 'italic', color: '#0022FF'}}>
                  {keterangan}
                </Text>
              </Text>
            )}
          </View>
        </View>
        <View style={styles.navItem}>
          <View style={styles.itemJumlahWrap}>
            <Text>Jumlah: </Text>
            <Text style={styles.itemJumlah}>{jumlah}</Text>
          </View>
          <View>
            <TouchableOpacity>
              <Icon name="trash-outline" size={20} color="red"></Icon>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainWrap}>
        <ScrollView>
          {keranjang.map(response => {
            return (
              <ItemKeranjang
                key={response.id}
                title={response.title}
                harga={response.harga}
                image={response.image}
                varian={response.varian}
                jumlah={response.jumlah}
                typeVarian={response.typeVarian}
                keterangan={response.keterangan}></ItemKeranjang>
            );
          })}
        </ScrollView>
      </View>
      <View style={styles.nav}>
        <View style={styles.totalPrizeWrap}>
          <Text style={styles.titleTotalPrize}>{FormatNumber(totalHarga)}</Text>
          <Text style={styles.infoTotalPrize}>
            Harga belum termasuk ongkir dan PPn
          </Text>
        </View>
        <View style={styles.btnCheckoutWrap}>
          <TouchableOpacity>
            <View style={styles.btnCheckout}>
              <Text style={styles.btnTitleCheckout}>Checkout</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Keranjang;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EEE',
  },
  mainWrap: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemWrap: {
    backgroundColor: '#FFF',
    paddingVertical: 10,
    borderRadius: 3,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    elevation: 1,
  },
  item: {flexDirection: 'row'},
  img: {
    height: 80,
    width: 80,
    objectFit: 'contain',
  },
  imgWrap: {
    height: 80,
    width: 80,
    borderRadius: 3,
    // backgroundColor: '#DDD',
  },
  content: {
    paddingLeft: 10,
    paddingRight: 80,
  },
  titleContent: {fontSize: 16},
  itemPrize: {fontSize: 18, fontWeight: 'bold'},
  itemVarian: {fontSize: 16},
  itemKeterangan: {},
  navItem: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#CCC',
    marginTop: 5,
    paddingTop: 5,
    justifyContent: 'flex-end',
  },
  itemJumlahWrap: {
    marginRight: 30,
    alignItems: 'center',
    flexDirection: 'row',
  },
  itemJumlah: {fontWeight: 'bold'},
  // ===NAV ===//
  nav: {
    height: 70,
    backgroundColor: '#FFF',
    elevation: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  totalPrizeWrap: {justifyContent: 'center'},
  titleTotalPrize: {fontSize: 25, color: 'red'},
  infoTotalPrize: {fontSize: 12},
  btnCheckoutWrap: {justifyContent: 'center'},
  btnCheckout: {
    backgroundColor: 'orange',
    borderRadius: 3,
    paddingHorizontal: 25,
    paddingVertical: 8,
  },
  btnTitleCheckout: {fontWeight: 'bold'},
});
