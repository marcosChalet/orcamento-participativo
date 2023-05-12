import React, {useEffect, useState} from 'react';
import {Alert, StyleSheet, View} from 'react-native';

import AppText from 'components/ui/AppText';
import strapi from '../../config/strapi';
import HorizontalRule from 'components/ui/HorizontalRule';

type KnapsackResultsType = {
  propostaId: number;
};

async function getVotes(propostaId: number) {
  return strapi
    .find('knapsacks', {
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
      fields: ['votos'],
      populate: ['votos.titulo', 'proposta.valor'],
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

function getFormattedValue(value: number) {
  let finalCost = String(value.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
  return finalCost;
}

export default function KnapsackResults(props: KnapsackResultsType) {
  const [subpropostas, setSubpropostas] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getVotes(props.propostaId)
      .then(data => {
        setIsLoading(true);
        if (data !== undefined) {
          let resultados: {[key: string | number]: number} = {};
          let valores: {[key: string | number]: number} = {};
          let orcamento: number =
            data[0].attributes.proposta.data.attributes.valor;
          for (let i = 0; i < data.length; i++) {
            let votos = data[i].attributes.votos.data;
            for (let j = 0; j < votos.length; j++) {
              valores[votos[j].attributes.titulo] = votos[j].attributes.valor;
              if (votos[j].attributes.titulo in resultados) {
                resultados[votos[j].attributes.titulo] += 1;
              } else {
                resultados[votos[j].attributes.titulo] = 1;
              }
            }
          }

          let sortable: any[] = [];
          for (const key in resultados) {
            sortable.push([key, resultados[key]]);
          }
          sortable.sort((a: any[], b: any[]) => {
            return a[1] - b[1];
          });
          sortable.reverse();
          let acumulado = 0;
          let resultadoFinal: any[] = [];
          for (let i = 0; i < sortable.length; i++) {
            if (valores[sortable[i][0]] + acumulado <= orcamento) {
              acumulado += valores[sortable[i][0]];
              resultadoFinal.push(
                <View>
                  <AppText style={styles.areaText}>{sortable[i][0]}</AppText>
                  <AppText style={styles.valueText}>
                    {sortable[i][1]} voto(s)
                  </AppText>
                </View>,
              );
            } else {
              break;
            }
          }

          resultadoFinal.push(<HorizontalRule />);

          resultadoFinal.push(
            <AppText style={styles.totalText}>
              TOTAL: R$ {getFormattedValue(acumulado)}
            </AppText>,
          );
          setSubpropostas(resultadoFinal);
          setIsLoading(false);
        } else {
          Alert.alert('Erro', 'Não conseguimos resgatar os dados da votação.');
        }
      })
      .catch(() => {
        Alert.alert('Erro', 'Não conseguimos resgatar os dados da votação.');
      });
  }, []);

  return (
    <View style={styles.container}>
      {isLoading && <AppText>Carregando...</AppText>}
      {!isLoading && subpropostas}
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
