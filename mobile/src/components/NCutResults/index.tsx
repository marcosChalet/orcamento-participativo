/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import NCutGraph from 'components/NCutGraph';
import AppText from 'components/ui/AppText';
import useNCut from '../../hooks/useNCut';

type NCutResultsType = {
  propostaId: number;
};

export default function NCutResults(props: NCutResultsType) {
  const [areas, setAreas] = useState<string[]>([]);
  const [values, setValues] = useState<{[key: number]: number}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {loadNCutDataResults} = useNCut();

  useEffect(() => {
    loadNCutDataResults(setValues, setAreas, setIsLoading, props.propostaId);
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <AppText style={styles.loading}>Carregando...</AppText>}
      {!isLoading && <NCutGraph areas={areas} values={values} type="N-CUT" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  loading: {
    fontSize: 12,
    textAlign: 'center',
  },
});
