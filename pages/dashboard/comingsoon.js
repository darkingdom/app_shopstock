import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

const ComingSoon = () => {
  return (
    <View style={styles.container}>
      <View style={styles.logoWrapper}>
        <Image
          source={require('../../components/assets/images/comingsoon.jpg')}></Image>
      </View>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logoWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
