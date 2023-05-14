import {NavigationProp} from '@react-navigation/native';

import strapi from '../config/strapi';
import SubpropostaType from 'src/core/subproposta.interface';
import {REACT_APP_HOST, REACT_APP_PORT} from '@env';
import {Alert} from 'react-native';
import {useContext} from 'react';
import UserContext from '../context/GlobalContext';

export default function useKnapsack() {
  const {userId} = useContext(UserContext);

  // eslint-disable-next-line @typescript-eslint/no-shadow
  async function submitVote(userId: number, proposta: number, voto: number[]) {
    return strapi
      .create('knapsacks', {
        proposta: {
          connect: [proposta],
        },
        usuario: {
          connect: [userId],
        },
        votos: {
          connect: voto,
        },
      })
      .then((data: any) => {
        return data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  async function getSubpropostas(proposta: number) {
    return strapi
      .find('propostas', {
        filters: {
          id: {
            $eq: proposta,
          },
        },
        populate: [
          'subpropostas.titulo',
          'subpropostas.capa',
          'subpropostas.descricao',
          'subpropostas.valor',
          'subpropostas.usuario.nome',
        ],
      })
      .then((data: any) => {
        return data.data;
      })
      .catch(() => {
        return -1;
      });
  }

  function loadProposta(
    id: number,
    setCand: any,
    setIsLoading: (T: boolean) => void,
    setProjectValues: (T: {[key: number]: number}) => void,
    setSelectedProjects: (T: {[key: number]: boolean}) => void,
    navigation: NavigationProp<any, any>,
    changeState: (subprojetoId: number) => void,
  ) {
    getSubpropostas(id)
      .then(data => {
        setIsLoading(true);

        let candidatos: SubpropostaType[] = [];
        let valores: {[key: number]: number} = {};
        let selecionados: {[key: number]: boolean} = {};

        let subpropostas = data[0].attributes.subpropostas.data;
        for (let i = 0; i < subpropostas.length; i++) {
          let urlSuffix: string =
            subpropostas[i].attributes.capa.data.attributes.url;
          let url: string = `http://${REACT_APP_HOST}:${REACT_APP_PORT}${urlSuffix}`;
          let autor: string =
            subpropostas[i].attributes.usuario.data.attributes.nome;

          valores[parseInt(subpropostas[i].id, 10)] =
            subpropostas[i].attributes.valor;
          selecionados[parseInt(subpropostas[i].id, 10)] = false;
          candidatos.push({
            id: parseInt(subpropostas[i].id, 10),
            title: subpropostas[i].attributes.titulo,
            description: subpropostas[i].attributes.descricao,
            cost: subpropostas[i].attributes.valor,
            imageUrl: url,
            author: autor,
            changeState: changeState,
            nav: navigation,
          });
        }
        setCand(candidatos);
        setIsLoading(false);
        setProjectValues(valores);
        setSelectedProjects(selecionados);
      })
      .catch(error => {
        console.log(error);
      });
  }

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

  type KnapsackResultsType = {
    propostaId: number;
  };

  type SortableType = {
    key: string;
    resultados: number;
  };
  function loadVotes(
    setIsLoading: (T: boolean) => void,
    setSubpropostas: (T: any[]) => void,
    setTotalAcumulado: (T: number) => void,
    props: KnapsackResultsType,
  ) {
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

          let sortable: SortableType[] = [];
          for (const key in resultados) {
            sortable.push({key: key, resultados: resultados[key]});
          }
          sortable.sort((a: SortableType, b: SortableType) => {
            return a.resultados - b.resultados;
          });
          sortable.reverse();
          let acumulado = 0;
          let resultadoFinal: any[] = [];
          for (let i = 0; i < sortable.length; i++) {
            if (valores[sortable[i].key] + acumulado <= orcamento) {
              acumulado += valores[sortable[i].key];
              resultadoFinal.push({
                key: sortable[i].key,
                resultados: sortable[i].resultados,
              });
            } else {
              break;
            }
          }
          setSubpropostas(resultadoFinal);
          setIsLoading(false);
          setTotalAcumulado(acumulado);
        } else {
          Alert.alert('Erro', 'Não conseguimos resgatar os dados da votação.');
        }
      })
      .catch(() => {
        Alert.alert('Erro', 'Não conseguimos resgatar os dados da votação.');
      });
  }

  function getFormattedValue(value: number) {
    let finalCost = String(value.toFixed(2)).replace('.', ',');
    finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
    return finalCost;
  }

  function internBarStyle(maxValue: number, alocado: number) {
    if (alocado <= maxValue) {
      return {
        width: `${(100.0 * alocado) / maxValue}%`,
        borderRadius: 5,
        height: 25,
        backgroundColor: 'rgb(117, 183, 71)',
      };
    }
    return {
      width: '100%',
      borderRadius: 5,
      height: 25,
      backgroundColor: 'rgb(240, 141, 96)',
    };
  }

  function sumSelectedProjects(
    projectValues: {[key: number]: number},
    selectedProjects: {[key: number]: boolean},
  ) {
    let sum = 0;
    for (const key in selectedProjects) {
      if (selectedProjects[key]) {
        sum += projectValues[key];
      }
    }
    return sum;
  }

  function onSubmit(
    id: number,
    soma: number,
    cost: number,
    selectedProjects: {[key: number]: boolean},
    navigation: NavigationProp<any, any>,
  ) {
    if (soma <= cost) {
      let votos: number[] = [];
      for (const key in selectedProjects) {
        if (selectedProjects[key]) {
          votos.push(parseInt(key, 10));
        }
      }
      Alert.alert('Enviar voto?', 'Você deseja enviar seus votos?', [
        {text: 'Não', style: 'cancel'},
        {
          text: 'Sim',
          onPress: () => {
            submitVote(userId, id, votos)
              .then(data => {
                console.log(data);
                if (data !== undefined) {
                  Alert.alert(
                    'Seu voto foi registrado!',
                    'Obrigado por participar desta votação.',
                    [{text: 'OK', onPress: () => navigation.goBack()}],
                  );
                } else {
                  Alert.alert(
                    'Não conseguimos registrar o seu voto!',
                    'Algum error aconteceu. Tente novamente, ou entre em contato com os responsáveis pelo app!',
                  );
                }
              })
              .catch(error => {
                Alert.alert(
                  'Não conseguimos registrar o seu voto!',
                  'Algum error aconteceu. Tente novamente, ou entre em contato com os responsáveis pelo app!',
                );
                console.log(error);
              });
          },
        },
      ]);
    } else {
      Alert.alert(
        'O orçamento é insuficiente!',
        'Você selecionou muitos projetos e a soma dos custo excedeu o orçamento total. Por favor, remova algum(ns) projeto(s) e tente novamente.',
      );
    }
  }

  return {
    loadProposta,
    getFormattedValue,
    internBarStyle,
    sumSelectedProjects,
    onSubmit,
    loadVotes,
  };
}
