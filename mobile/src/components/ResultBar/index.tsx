import React from 'react';
import {StyleSheet, View} from 'react-native';

import AppText from 'components/ui/AppText';
import BarType from 'src/core/bar.type';

export default function ResultBar({title, value, style}: BarType) {
  return (
    <View>
      <AppText style={styles.areaText}>{title}</AppText>
      <View>
        <View style={[styles.bars, style]}>
          <AppText style={styles.valueText}>{value}</AppText>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  areaText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
  },
  valueText: {
    fontSize: 10,
    color: 'white',
    marginLeft: 5,
  },
  bars: {
    height: 25,
    backgroundColor: '#532B1D',
    borderRadius: 5,
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
});
