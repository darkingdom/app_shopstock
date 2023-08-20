import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as Route from '../pages/init';

const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="splashScreen">
      <Stack.Screen
        name="dashboard"
        options={{headerShown: false}}
        component={Route.Dashboard}
      />

      <Stack.Screen
        name="listproduct"
        options={{headerShown: false, title: 'Produk'}}
        component={Route.ListProduct}
      />
      <Stack.Screen
        name="product"
        options={{headerShown: true, title: '', headerTransparent: true}}
        component={Route.Product}
      />
      <Stack.Screen
        name="productDownload"
        options={{headerShown: true, title: 'Download Produk'}}
        component={Route.ProductDownload}
      />
      <Stack.Screen
        name="order"
        options={{headerShown: true, title: 'Pesanan'}}
        component={Route.Order}
      />
      <Stack.Screen
        name="keranjang"
        options={{headerShown: true, title: 'Keranjang'}}
        component={Route.Keranjang}
      />

      {/* ================= START LOGIN ================= */}
      <Stack.Screen
        name="updater"
        options={{headerShown: false}}
        component={Route.Updater}
      />
      <Stack.Screen
        name="splashScreen"
        options={{headerShown: false}}
        component={Route.SplashScreen}
      />
      <Stack.Screen
        name="auth"
        options={{headerShown: false}}
        component={Route.Auth}
      />
      <Stack.Screen
        name="login"
        options={{headerShown: false}}
        component={Route.Login}
      />
      {/* ================= END LOGIN ================= */}

      {/* ================= START LATIHAN ================= */}
      <Stack.Screen
        name="pagination"
        options={{headerShown: false}}
        component={Route.Pagination}
      />
      {/* ================= END LATIHAN ================= */}
    </Stack.Navigator>
  );
};

export default Router;
