import React from 'react';
import {TouchableOpacity, StyleSheet} from 'react-native';

interface ButtonType {
  clickFn?: () => void;
  style?: {};
  children?: React.ReactNode;
}

export default function Button({style, clickFn, children}: ButtonType) {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => clickFn && clickFn()}>
      {children}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#532B1D',
    width: '80%',
    height: 47,
    maxWidth: 320,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    display: 'flex',
  },
});
