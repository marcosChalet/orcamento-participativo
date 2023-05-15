/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import AppText from 'components/ui/AppText';
import HorizontalRule from 'components/ui/HorizontalRule';
import useKnapsack from '../../hooks/useKnapsack';

type KnapsackResultsType = {
  propostaId: number;
};

function getFormattedValue(value: number) {
  let finalCost = String(value.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
  return finalCost;
}

export default function KnapsackResults(props: KnapsackResultsType) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [subpropostas, setSubpropostas] = useState<any[]>([]);
  const [totalAcumulado, setTotalAcumulado] = useState<number>(0);
  const {loadVotes} = useKnapsack();

  useEffect(() => {
    loadVotes(setIsLoading, setSubpropostas, setTotalAcumulado, props);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <AppText>Carregando...</AppText>}
      {!isLoading &&
        subpropostas.map(proposta => (
          <View key={proposta.key}>
            <AppText style={styles.areaText}>{proposta.key}</AppText>
            <AppText style={styles.valueText}>
              {proposta.resultados} voto(s)
            </AppText>
          </View>
        ))}
      <HorizontalRule />
      <AppText style={styles.totalText}>
        TOTAL: R$ {getFormattedValue(totalAcumulado)}
      </AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  areaText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  totalText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 10,
    textAlign: 'center',
  },
  valueText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10,
  },
});
