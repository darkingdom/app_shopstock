import {StyleSheet} from 'react-native';

export const ItemList = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 10,
  },
  list: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#CCC',
  },
  menu: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  more: {
    justifyContent: 'center',
  },
});
