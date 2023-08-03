import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Server} from '../../config';
import Axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';

const Download = ({route, navigate}) => {
  const {uuid} = route.params;
  const {title} = route.params;
  const [image, setImage] = useState([]);

  useEffect(() => {
    GetImageProduct();
  }, []);

  const GetImageProduct = () => {
    const data = {part: 'imageProduct', uuid};
    Axios.post(Server.urlHost + 'product', data)
      .then(response => {
        setImage(response.data.image);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const ImageProduct = ({image}) => {
    return (
      <View
        style={{
          marginBottom: 20,
          borderBottomWidth: 1,
          borderBottomColor: '#CCC',
          paddingVertical: 10,
          paddingHorizontal: 5,
          flexDirection: 'row',
        }}>
        <View>
          <Image
            style={{width: 120, height: 120, objectFit: 'contain'}}
            source={{
              uri:
                Server.urlImage +
                '/garduweb/storage/upload/images/thumb/' +
                image,
            }}
          />
        </View>
        <View
          style={{
            marginLeft: 'auto',
            justifyContent: 'center',
          }}>
          <TouchableOpacity>
            <View
              style={{
                backgroundColor: 'blue',
                paddingHorizontal: 20,
                paddingVertical: 5,
                borderRadius: 5,
              }}>
              <Text style={{color: '#FFF'}}>Download</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={{flex: 1}}>
      <View style={{paddingHorizontal: 50, marginVertical: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center'}}>
          {title}
        </Text>
      </View>
      <View style={{marginTop: 20, paddingHorizontal: 20}}>
        {image.map(res => {
          return (
            <ImageProduct key={res.id} image={res.url_image}></ImageProduct>
          );
        })}
      </View>
    </ScrollView>
  );
};

export default Download;

const styles = StyleSheet.create({});
