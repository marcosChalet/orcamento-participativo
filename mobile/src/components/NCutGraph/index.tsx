/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AppText from 'components/ui/AppText';
import HorizontalRule from 'components/ui/HorizontalRule';
import ResultBar from 'components/ResultBar';
import BarType from 'src/core/bar.type';
import useBars from '../../hooks/useBars';

type NCutGraphType = {
  areas: string[];
  type: 'YES-NO' | 'N-CUT';
  values: {[key: number]: number};
};

export default function NCutGraph(props: NCutGraphType) {
  const [items, setItem] = useState<BarType[]>([]);
  const [sum, setSum] = useState<number>(0);
  const {loadBarData, getFormattedValue} = useBars();

  useEffect(() => {
    loadBarData(setSum, setItem, props);
  }, []);

  return (
    <View style={styles.container}>
      {items.map(item => (
        <ResultBar
          key={item.title}
          title={item.title}
          value={item.value}
          style={item.style}
        />
      ))}
      <HorizontalRule style={styles.dividingSpace} />
      {props.type === 'N-CUT' && (
        <AppText style={styles.totalText}>
          TOTAL: R$ {getFormattedValue(sum)}
        </AppText>
      )}
      {props.type === 'YES-NO' && (
        <AppText style={styles.totalText}>VOTOS: {sum}</AppText>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  dividingSpace: {
    marginTop: 10,
  },
});
