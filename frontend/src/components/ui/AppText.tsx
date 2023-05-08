import React from 'react';
import {StyleSheet, Text} from 'react-native';

type TextType = {
  children: React.ReactNode;
  style?: {};
};

export default function AppText({children, style}: TextType) {
  return <Text style={[styles.baseText, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  baseText: {
    color: '#532B1D',
    fontFamily: 'System font',
  },
});
