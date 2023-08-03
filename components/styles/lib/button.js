import {StyleSheet} from 'react-native';
export const Button = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'red',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  bottom: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    right: 10,
    paddingTop: 10,
  },
  wrapper: {
    backgroundColor: '#333',
  },
});
