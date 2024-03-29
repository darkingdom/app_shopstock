import React from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import Router from './router';

const App = () => {
  return (
    <NavigationContainer>
      <StatusBar hidden={true} />
      <Router />
    </NavigationContainer>
  );
};

export default App;
