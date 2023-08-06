import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Server} from '../../config';
import Axios from 'axios';

const Dashboard = ({route, navigation}) => {
  const {uuid} = route.params;
  const [app, setApp] = useState('');

  useEffect(() => {
    LoadDashboard();
  }, []);

  const LoadDashboard = () => {
    const data = {uuid};
    Axios.post(Server.urlHost + 'dashboard', data)
      .then(response => {
        setApp(response.data.appSetting);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <ScrollView style={styles.container}>
      <View
        style={{
          backgroundColor: '#444',
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}>
        <Text style={{fontSize: 25, color: '#FFF'}}>
          IDHA BRANDED COLLECTION
        </Text>
      </View>
      <View style={{paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10}}>
        <TouchableOpacity>
          <Image
            source={require('../../components/assets/images/produk-terbaru.jpg')}
            style={{height: 110, width: 'auto'}}
          />
        </TouchableOpacity>
      </View>
      <View style={{paddingHorizontal: 20, paddingVertical: 10}}>
        <TouchableOpacity>
          <Image
            source={require('../../components/assets/images/produk-promo.jpg')}
            style={{height: 110, width: 'auto'}}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          paddingTop: 40,
          paddingHorizontal: 30,
          justifyContent: 'space-between',
          flexDirection: 'row',
          flexWrap: 'wrap',
        }}>
        <View style={styles.itemWrapper}>
          <TouchableOpacity
            style={styles.itemThumbnail}
            onPress={() =>
              navigation.navigate('listproduct', {categories: app.man})
            }>
            <Image
              source={require('../../components/assets/images/man.jpg')}
              style={{height: 100, width: 100, borderRadius: 5}}
            />
          </TouchableOpacity>
          <View style={styles.titleItemWrapper}>
            <Text style={styles.titleItem}>MAN</Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.itemThumbnail}>
            <Image
              source={require('../../components/assets/images/woman.jpg')}
              style={{height: 100, width: 100, borderRadius: 5}}
            />
          </TouchableOpacity>
          <View style={styles.titleItemWrapper}>
            <Text style={styles.titleItem}>WOMAN</Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.itemThumbnail}>
            <Image
              source={require('../../components/assets/images/kids.jpg')}
              style={{height: 100, width: 100, borderRadius: 5}}
            />
          </TouchableOpacity>
          <View style={styles.titleItemWrapper}>
            <Text style={styles.titleItem}>KIDS & BABY</Text>
          </View>
        </View>
        <View style={styles.itemWrapper}>
          <TouchableOpacity style={styles.itemThumbnail}>
            <Image
              source={require('../../components/assets/images/hijab.jpg')}
              style={{height: 100, width: 100, borderRadius: 5}}
            />
          </TouchableOpacity>
          <View style={styles.titleItemWrapper}>
            <Text style={styles.titleItem}>BUSANA MUSLIM</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  itemWrapper: {
    width: 120,
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  itemThumbnail: {
    backgroundColor: '#000',
    height: 100,
    width: 100,
    borderRadius: 5,
    elevation: 5,
  },
  titleItemWrapper: {alignItems: 'center'},
  titleItem: {fontWeight: 'bold', fontSize: 16},
});

// import React, {useEffect, useState} from 'react';
// import {
//   Button,
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   ToastAndroid,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import IconMaterial from 'react-native-vector-icons/MaterialCommunityIcons';
// import * as myStyle from '../../components/styles';
// import {Server} from '../../config';
// import Axios from 'axios';

// const App = ({route, navigation}) => {
//   const {uuid} = route.params;
//   const [serverName, setServerName] = useState('');
//   const [sumClient, setClient] = useState('');
//   const [sumActive, setActive] = useState('');
//   const [sumDisconnect, setDisconnect] = useState('');
//   const [sumDisconnectToday, setDisconnectToday] = useState('');

//   useEffect(() => {
//     dashboard();
//   }, []);

//   const dashboard = () => {
//     const data = {uuid};
//     const url = Server.urlHost + 'dashboard';
//     Axios.post(url, data)
//       .then(response => {
//         setServerName(response.data.serverName);
//         setClient(response.data.pelanggan);
//         setActive(response.data.pelanggan_aktif);
//         setDisconnect(response.data.pelanggan_tidak_aktif);
//         setDisconnectToday(response.data.pelanggan_tidak_aktif_hari_ini);
//       })
//       .catch(error => {
//         console.error(error);
//       });
//   };

//   const reload = () => {
//     dashboard();
//     ToastAndroid.show('Reload', ToastAndroid.SHORT);
//   };

//   //=====================================================
//   return (
//     <View style={[myStyle.Container.container, {backgroundColor: 'darkred'}]}>
//       <View style={styles.atas}>
//         <TouchableOpacity
//           style={{
//             elevation: 3,
//             borderRadius: 5,
//             backgroundColor: 'rgba(181, 9, 9, 0.7)',
//             padding: 8,
//             position: 'absolute',
//             top: 20,
//             right: 20,
//           }}
//           onPress={reload}>
//           <IconMaterial name="reload" size={32} color={'#FFF'} />
//         </TouchableOpacity>
//         <Text style={styles.title}>PPPOE MONITOR</Text>
//         <Text style={styles.subtitle}>{serverName}</Text>
//       </View>
//       <View style={styles.bawah}>
//         {/* <View style={styles.item}>
//           <Text>Total Client</Text>
//         </View> */}

//         <View style={{alignItems: 'center', marginBottom: 10}}>
//           <Text style={{fontSize: 24}}>Total Pelanggan</Text>
//           <Text style={{fontSize: 32, fontWeight: 'bold', color: '#000'}}>
//             {sumClient}
//           </Text>
//         </View>

//         <View style={myStyle.ItemList.wrapper}>
//           <View style={myStyle.ItemList.list}>
//             <View style={myStyle.ItemList.menu}>
//               <View>
//                 <Text>Tersambung</Text>
//               </View>
//               <View style={myStyle.ItemList.more}>
//                 <Text style={{color: 'green', fontWeight: 'bold'}}>
//                   {sumActive}
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View style={myStyle.ItemList.list}>
//             <View style={myStyle.ItemList.menu}>
//               <View>
//                 <Text>Terputus</Text>
//               </View>
//               <View style={myStyle.ItemList.more}>
//                 <Text style={{color: 'red', fontWeight: 'bold'}}>
//                   {sumDisconnect}
//                 </Text>
//               </View>
//             </View>
//           </View>
//           <View style={[myStyle.ItemList.list, {borderBottomWidth: 0}]}>
//             <View style={myStyle.ItemList.menu}>
//               <View>
//                 <Text>Terputus Hari ini</Text>
//               </View>
//               <View style={myStyle.ItemList.more}>
//                 <Text style={{color: 'red', fontWeight: 'bold'}}>
//                   {sumDisconnectToday}
//                 </Text>
//               </View>
//             </View>
//           </View>

//           <View style={{marginTop: 20, marginBottom: 20}}>
//             <Text style={{fontWeight: 'bold', fontStyle: 'italic'}}>
//               Shortcut Menu
//             </Text>
//           </View>

//           <View style={{flexDirection: 'row'}}>
//             <TouchableOpacity
//               onPress={() => navigation.navigate('customer', {uuid})}
//               style={[myStyle.Card.card, styles.item]}>
//               <Icon color={'skyblue'} name="people" size={40} />
//               <Text>Pelanggan</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('disconnect', {uuid})}
//               style={[myStyle.Card.card, styles.item]}>
//               <IconMaterial color={'red'} name="lan-disconnect" size={40} />
//               <Text>Terputus</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('disconnectToday', {uuid})}
//               style={[myStyle.Card.card, styles.item]}>
//               <IconMaterial color={'darkorange'} name="lan-pending" size={40} />
//               <Text>Hari ini</Text>
//             </TouchableOpacity>

//             <TouchableOpacity
//               onPress={() => navigation.navigate('comingsoon')}
//               style={[myStyle.Card.card, styles.item]}>
//               <IconMaterial
//                 color={'blue'}
//                 name="microsoft-internet-explorer"
//                 size={40}
//               />
//               <Text>Internet</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </View>

//       <View
//         style={{
//           position: 'absolute',
//           width: '100%',
//           bottom: 0,
//           backgroundColor: 'white',
//           height: 60,
//           flexDirection: 'row',
//           justifyContent: 'space-between',
//           elevation: 3,
//         }}>
//         <View
//           style={{
//             height: 60,
//             width: 200,
//             // backgroundColor: 'red',
//             justifyContent: 'center',
//             alignItems: 'center',
//           }}>
//           <Image
//             source={require('../../components/assets/images/pppoe-monitor.jpg')}
//             style={{height: 30, width: 180}}></Image>
//         </View>
//         <View
//           style={{
//             // height: 60,
//             // width: 80,
//             borderLeftWidth: 1,
//             borderLeftColor: '#EEE',
//           }}>
//           <TouchableOpacity
//             onPress={() => navigation.navigate('comingsoon')}
//             style={{
//               alignItems: 'center',
//               justifyContent: 'center',
//               height: 60,
//               width: 80,
//             }}>
//             <Icon name="person-outline" size={28} />
//             <Text>Profile</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default App;

// const styles = StyleSheet.create({
//   atas: {
//     height: 200,
//     // backgroundColor: 'darkred',
//     justifyContent: 'center',
//   },
//   title: {
//     fontSize: 32,
//     color: 'white',
//     textAlign: 'center',
//   },
//   subtitle: {
//     color: 'white',
//     textAlign: 'center',
//   },
//   item: {
//     marginRight: 20,
//     alignItems: 'center',
//     justifyContent: 'center',
//     height: 80,
//     width: 80,
//   },
//   bawah: {
//     padding: 20,
//     borderTopLeftRadius: 20,
//     borderTopRightRadius: 20,
//     backgroundColor: 'white',
//     height: '100%',
//   },
// });
