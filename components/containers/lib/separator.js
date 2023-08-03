import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const Separator = () => {
  return <View style={styles.SeparatorBlank}></View>;
};

const MenuSeparator = ({name}) => {
  return (
    <View style={styles.SeparatorBlank}>
      <Text style={styles.TextSeparator}>{name}</Text>
    </View>
  );
};

const LineSeparator = ({margin = 20}) => {
  let mt = margin - 5;
  return (
    <View
      style={[
        styles.LineSeparator,
        {marginTop: mt, marginBottom: margin},
      ]}></View>
  );
};

export {Separator, MenuSeparator, LineSeparator};

const styles = StyleSheet.create({
  SeparatorBlank: {
    paddingVertical: 5,
    backgroundColor: '#000',
  },
  TextSeparator: {
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#000',
    marginLeft: 20,
    color: '#DDD',
  },
  LineSeparator: {
    height: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
});
