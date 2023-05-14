/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';

import {StyleSheet, View} from 'react-native';
import AppText from 'components/ui/AppText';
import NCutGraph from 'components/NCutGraph';

import strapi from '../../config/strapi';

type YesNoResultsType = {
  propostaId: number;
};

async function getVotes(propostaId: number) {
  return strapi
    .find('yes-nos', {
      filters: {
        proposta: {
          id: {
            $eq: propostaId,
          },
        },
      },
      pagination: {
        start: 0,
        limit: 10000,
      },
      fields: ['voto'],
      populate: ['proposta'],
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export default function YesNoResults(props: YesNoResultsType) {
  const [values, setValues] = useState<{[key: string]: number}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const areas = ['sim', 'não'];

  useEffect(() => {
    setIsLoading(true);
    getVotes(props.propostaId)
      .then(data => {
        let numVotos = data.length;
        let results: {[key: string]: number} = {
          sim: 0,
          não: 0,
        };

        for (let i = 0; i < numVotos; i++) {
          let voto = data[i].attributes.voto;
          results[voto] += 1;
        }

        setValues(results);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <AppText style={styles.loading}>Carregando...</AppText>}
      {!isLoading && <NCutGraph areas={areas} values={values} type="YES-NO" />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  results: {
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#532B1D',
    borderWidth: 1,
  },
  resultsText: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  loading: {
    fontSize: 12,
    textAlign: 'center',
  },
});
