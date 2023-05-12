import React from 'react';
import {StyleSheet, View} from 'react-native';

type lineProps = {
  style?: {};
};

export default function HorizontalRule(props: lineProps) {
  return <View style={[styles.HorizontalRule, props.style]} />;
}

const styles = StyleSheet.create({
  HorizontalRule: {
    borderBottomColor: '#CAC8C7',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
  },
});
