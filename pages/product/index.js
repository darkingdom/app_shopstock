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
  Dimensions,
  Modal,
  Pressable,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
import * as myStyle from '../../components/styles';
import {Server} from '../../config';
import Axios from 'axios';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Produk = ({route, navigation}) => {
  const {uuid} = route.params;
  const [product, setProduct] = useState('');
  const [image, setImage] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [imgActive, setimgActive] = useState(0);

  onchange = nativeEvent => {
    if (nativeEvent) {
      const slide = Math.ceil(
        nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width,
      );
      if (slide != imgActive) {
        setimgActive(slide);
        console.log(slide);
      }
    }
  };

  useEffect(() => {
    GetProduct();
  }, []);

  const GetProduct = () => {
    const data = {part: 'index', uuid};
    Axios.post(Server.urlHost + 'product', data)
      .then(response => {
        setProduct(response.data.product);
        setImage(response.data.image);
      })
      .catch(error => {
        console.error(error);
      });
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

  return (
    <ScrollView style={{flex: 1, backgroundColor: '#FFF'}}>
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
      <View style={{paddingHorizontal: 20, paddingTop: 10}}>
        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
          {product.nama_produk}
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 10}}>
        <Text style={{fontSize: 24, color: 'red'}}>Rp 25.000</Text>
      </View>

      <View style={{alignItems: 'flex-end', paddingHorizontal: 20}}>
        <TouchableOpacity
          style={{
            width: 100,
            backgroundColor: 'blue',
            alignItems: 'center',
            borderRadius: 5,
          }}
          onPress={() => setModalVisible(true)}>
          <Text style={{color: '#FFF', paddingVertical: 5}}>Deskripsi</Text>
        </TouchableOpacity>
      </View>

      <View style={{paddingHorizontal: 20, paddingTop: 20}}>
        <View style={{flexDirection: 'row'}}>
          <View style={{width: '25%'}}>
            <Text style={{fontWeight: 'bold'}}>Varian</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text style={{fontWeight: 'bold'}}>Stok</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text style={{fontWeight: 'bold'}}>Harga</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text></Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 5,
          }}>
          <View style={{width: '25%'}}>
            <Text>Merah L</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text>(15)</Text>
          </View>
          <View style={{width: '25%'}}>
            <Text style={{color: 'red'}}>Rp 25.000</Text>
          </View>
          <View style={{width: '25%'}}>
            <TextInput
              style={{
                borderColor: '#CCC',
                borderWidth: 1,
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 0,
              }}
              keyboardType="number-pad"></TextInput>
          </View>
        </View>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 20}}>
        <Text style={{marginLeft: 5}}>Keterangan</Text>
        <TextInput
          style={{
            borderWidth: 1,
            borderColor: '#CCC',
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          }}
          placeholder="Keterangan"></TextInput>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 40}}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('productDownload', {
              uuid: product.uniq_id,
              title: product.nama_produk,
            })
          }>
          <View
            style={{
              backgroundColor: '#888',
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#FFF', fontSize: 14}}>Simpan Gambar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20, marginTop: 10}}>
        <TouchableOpacity>
          <View
            style={{
              backgroundColor: 'red',
              paddingVertical: 10,
              alignItems: 'center',
              borderRadius: 5,
            }}>
            <Text style={{color: '#FFF', fontSize: 14}}>ORDER</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* ========================= */}
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 30,
            paddingVertical: 100,
            // backgroundColor: 'rgba(0,0,0,0.5)',
          }}>
          <View
            style={{
              flex: 1,
              backgroundColor: '#FFF',
              borderRadius: 10,
              elevation: 5,
              position: 'relative',
            }}>
            <ScrollView style={{padding: 20}}>
              <Text>satu</Text>
            </ScrollView>
            <View
              style={{
                position: 'absolute',
                bottom: 0,
                borderTopWidth: 1,
                borderTopColor: '#CCC',
                width: '100%',
                paddingVertical: 10,
                paddingHorizontal: 20,
                alignItems: 'flex-end',
              }}>
              <TouchableOpacity
                onPress={() => setModalVisible(!modalVisible)}
                style={{
                  backgroundColor: 'skyblue',
                  width: 100,
                  paddingVertical: 10,
                  alignItems: 'center',
                  borderRadius: 5,
                }}>
                <Text style={{color: '#FFF', fontSize: 16}}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Produk;

const styles = StyleSheet.create({
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
});
