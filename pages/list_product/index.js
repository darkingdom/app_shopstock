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
// import * as myStyle from '../../components/styles';
import {Server} from '../../config';
import Axios from 'axios';

const ListProduk = ({route, navigation}) => {
  const {userid} = route.params;
  const {categories} = route.params;
  const [total, setTotal] = useState('');
  const limit = 30;
  const [produk, setProduk] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [nav, setNav] = useState(true);

  let activePage = 1;
  let page = route.params.page;
  if (page > 1) {
    activePage = page;
  } else {
    page = activePage;
  }

  const totalPage = Math.ceil(total / limit);
  const offset = (page - 1) * limit;

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
    const data = {part: 'index', kategori: categories, page: offset, limit};
    Axios.post(Server.urlHost + 'listProduct', data)
      .then(response => {
        setTotal(response.data.total);
        setProduk(response.data.produk);
      })
      .catch(error => {
        console.error(error);
      });
  };

  const TitleCategories = id => {
    const [titlePage, setTitlePage] = useState('');
    const data = {part: 'titleCategories', id};
    Axios.post(Server.urlHost + 'listProduct', data).then(response => {
      setTitlePage(response.data.categories);
    });
    return titlePage.toUpperCase();
  };

  const SearchProduk = q => {
    if (q == '') {
      LoadDB();
      setNav(true);
    } else {
      setNav(false);
      const data = {
        part: 'search',
        q,
        kategori: categories,
        page: offset,
        limit,
      };
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
        onPress={() => navigation.navigate('product', {userid, uuid: uuid})}
        style={styles.itemWrap}>
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
          <Text style={styles.prizeWrap}>
            {PrizeVarian({uniq_id: uuid, varian})}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{TitleCategories(categories)}</Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.listcontainer}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['orange']}
            tintColor="orange"
          />
        }>
        <View style={styles.searchWrap}>
          <TextInput
            onChangeText={q => SearchProduk(q)}
            style={styles.frmSearch}
            placeholder="Cari"></TextInput>
        </View>

        <View style={styles.mainWrap}>
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
      {nav == true && (
        <View style={styles.nav}>
          <TouchableOpacity
            disabled={page <= 1}
            onPress={() =>
              navigation.replace('listproduct', {
                categories,
                page: page - 1,
              })
            }>
            <View style={styles.previousWrap}>
              <Text style={{textAlign: 'right'}}>Previous</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={totalPage == page}
            onPress={() =>
              navigation.replace('listproduct', {
                categories,
                page: page + 1,
              })
            }>
            <View style={styles.nextWrap}>
              <Text>Next</Text>
            </View>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default ListProduk;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    paddingBottom: 50,
  },
  listcontainer: {},
  header: {
    backgroundColor: '#444',
    paddingVertical: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#FFF',
  },
  searchWrap: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  frmSearch: {
    borderColor: '#CCC',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  mainWrap: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  itemWrap: {
    flexDirection: 'row',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    paddingBottom: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
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
  content: {
    paddingLeft: 10,
    paddingRight: 80,
  },
  titleContent: {fontSize: 20},
  prizeWrap: {fontSize: 18, fontWeight: 'bold'},
  nav: {
    backgroundColor: '#CCC',
    position: 'absolute',
    bottom: 0,
    paddingVertical: 10,
    paddingHorizontal: 10,
    width: '100%',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  previousWrap: {
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    paddingVertical: 5,
    borderTopStartRadius: 10,
    borderBottomStartRadius: 10,
    width: 80,
  },
  nextWrap: {
    paddingHorizontal: 10,
    backgroundColor: '#FFF',
    paddingVertical: 5,
    borderTopEndRadius: 10,
    borderBottomEndRadius: 10,
    borderLeftColor: '#CCC',
    borderLeftWidth: 1,
    width: 80,
  },
});
