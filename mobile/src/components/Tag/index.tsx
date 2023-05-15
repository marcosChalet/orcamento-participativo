import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

import AppText from '../ui/AppText';

type tagProps = {
  name: string;
};

export default function Tag(props: tagProps) {
  return (
    <TouchableOpacity style={styles.tag}>
      <AppText style={styles.tagText}>{props.name}</AppText>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  tag: {
    padding: 4,
    borderRadius: 5,
    borderColor: '#532B1D',
    borderStyle: 'solid',
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    display: 'flex',
    alignSelf: 'flex-start',
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 10,
  },
});
