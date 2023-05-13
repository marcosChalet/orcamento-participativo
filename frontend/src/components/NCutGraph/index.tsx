/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AppText from 'components/ui/AppText';
import HorizontalRule from 'components/ui/HorizontalRule';
import ResultBar from 'components/ResultBar';
import BarType from 'src/core/bar.type';

type NCutGraphType = {
  areas: string[];
  type: 'YES-NO' | 'N-CUT';
  values: {[key: number]: number};
};

function getFormattedValue(value: number) {
  let finalCost = String(value.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
  return finalCost;
}

function loadBarData(
  setSum: (T: number) => void,
  setItem: (T: BarType[]) => void,
  props: NCutGraphType,
) {
  let max = -1;
  let sum = 0;
  let results: BarType[] = [];
  if (props.type === 'N-CUT') {
    for (let i = 0; i < props.areas.length; i++) {
      if (props.values[i] > max) {
        max = props.values[i];
        sum += props.values[i];
      }
    }
  } else if (props.type === 'YES-NO') {
    for (const key in props.values) {
      if (props.values[key] > max) {
        max = props.values[key];
        sum += 1;
      }
    }
  }

  setSum(sum);

  if (props.type === 'N-CUT') {
    for (let i = 0; i < props.areas.length; i++) {
      let barWidth = {width: `${(100 * props.values[i]) / max}%`};
      results.push({
        title: props.areas[i].toUpperCase(),
        value: +getFormattedValue(props.values[i]),
        style: barWidth,
      });
    }
  } else if (props.type === 'YES-NO') {
    let i = 0;
    for (const key in props.values) {
      let barWidth = {width: `${(100 * props.values[key]) / max}%`};
      results.push({
        title: props.areas[i].toUpperCase(),
        value: props.values[key],
        style: barWidth,
      });
      i += 1;
    }
  }

  setItem(results);
}

export default function NCutGraph(props: NCutGraphType) {
  const [items, setItem] = useState<BarType[]>([]);
  const [sum, setSum] = useState<number>(0);

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
