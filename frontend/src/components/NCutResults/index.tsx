import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import NCutGraph from 'components/NCutGraph';
import AppText from 'components/ui/AppText';
import strapi from '../../config/strapi';

type NCutResultsType = {
  propostaId: number;
};

async function getVotes(propostaId: number) {
  return strapi
    .find('n-cuts', {
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

export default function NCutResults(props: NCutResultsType) {
  const [areas, setAreas] = useState<string[]>([]);
  const [values, setValues] = useState<{[key: number]: number}>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getVotes(props.propostaId)
      .then(data => {
        let numVotos = data.length;
        let results: {[key: number]: number} = {};

        let areasNames: string[] = [];
        let areasObject = data[0].attributes.proposta.data.attributes.areas;

        for (let key in areasObject) {
          results[parseInt(key, 10)] = 0;
          areasNames.push(areasObject[key]);
        }

        setAreas(areasNames);

        for (let i = 0; i < numVotos; i++) {
          let voto = data[i].attributes.voto;
          for (let key in voto) {
            results[parseInt(key, 10)] +=
              parseFloat(voto[key]) / parseFloat(numVotos);
          }
        }

        setValues(results);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {}, [areas, values]);

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
