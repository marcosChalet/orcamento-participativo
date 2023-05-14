import {Alert} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import strapi from '../config/strapi';

export default function useNCut() {
  async function getAreas(id: number) {
    return strapi
      .findOne('propostas', id, {
        fields: ['areas', 'valor'],
      })
      .then((data: any) => {
        return data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function submitVote(
    userId: number,
    proposta: number,
    voto: {[key: number]: number},
  ) {
    return strapi
      .create('n-cuts', {
        proposta: {
          connect: [proposta],
        },
        usuario: {
          connect: [userId],
        },
        voto: voto,
      })
      .then((data: any) => {
        return data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

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

  function getFormattedValue(value: number) {
    let finalCost = String(value.toFixed(2)).replace('.', ',');
    finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
    return finalCost;
  }

  function votacaoStrings(areas: string[], valores: {[key: number]: number}) {
    let string: string = '';
    let soma = 0;
    for (let i = 0; i < areas.length; i++) {
      string += areas[i] + ': R$ ' + getFormattedValue(valores[i]) + '\n';
      soma += valores[i];
    }
    string += '\nValor total: R$ ' + getFormattedValue(soma);
    return string;
  }

  function onSubmit(
    id: number,
    userId: number,
    areas: string[],
    valorAlocado: number,
    valorMaximo: number,
    valores: {[key: number]: number},
    navigation: NavigationProp<any, any>,
  ) {
    if (valorAlocado > valorMaximo) {
      Alert.alert(
        'Valor inválido!',
        'O valor que você alocou é maior que o orçamento total.',
      );
    } else {
      let valoresAlert: string = votacaoStrings(areas, valores);
      Alert.alert('Confira os valores de sua votação: ', valoresAlert, [
        {text: 'Cancelar', style: 'cancel'},
        {
          text: 'Enviar voto',
          onPress: () => {
            submitVote(userId, id, valores)
              .then(data => {
                if (data !== undefined) {
                  if (Object.keys(data).length > 0) {
                    Alert.alert(
                      'Seu voto foi registrado!',
                      'Obrigado por participar desta votação.',
                      [{text: 'OK', onPress: () => navigation.goBack()}],
                    );
                  }
                } else {
                  Alert.alert(
                    'Algo deu errado!',
                    'Infelizmente, não conseguimos registrar o seu voto no nosso banco de dados. Por favor, tente novamente! Se mesmo assim você não conseguir, entre em contato com os responsáveis pelo app.',
                  );
                }
              })
              .catch(() => {
                Alert.alert(
                  'Algo deu errado!',
                  'Infelizmente, não conseguimos registrar o seu voto no nosso banco de dados. Por favor, tente novamente! Se mesmo assim você não conseguir, entre em contato com os responsáveis pelo app.',
                );
              });
          },
        },
      ]);
    }
  }

  function loadNCutDataResults(
    setValues: (T: {[key: number]: number}) => void,
    setAreas: (T: string[]) => void,
    setIsLoading: (T: boolean) => void,
    propostaId: number,
  ) {
    setIsLoading(true);
    getVotes(propostaId)
      .then(data => {
        let numVotos = data.length;
        let results: {[key: number]: number} = {};

        let areasNames: string[] = [];
        let areasObject = data[0].attributes.proposta.data.attributes.areas;

        for (let key in areasObject) {
          results[+key] = 0;
          areasNames.push(areasObject[key]);
        }

        setAreas(areasNames);

        for (let i = 0; i < numVotos; i++) {
          let voto = data[i].attributes.voto;
          for (let key in voto) {
            results[+key] += parseFloat(voto[key]) / parseFloat(numVotos);
          }
        }

        setValues(results);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });
  }
  return {
    getAreas,
    submitVote,
    votacaoStrings,
    getFormattedValue,
    onSubmit,
    getVotes,
    loadNCutDataResults,
  };
}
