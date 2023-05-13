/* eslint-disable react-hooks/exhaustive-deps */
import React, {useContext, useEffect, useState} from 'react';
import {ScrollView, View, Alert, StyleSheet} from 'react-native';
import {NavigationProp, useRoute} from '@react-navigation/native';
import Subproposta from 'components/Subproposta';
import {REACT_APP_HOST, REACT_APP_PORT} from '@env';

import SubpropostaType from 'src/core/subproposta.interface';
import UserContext from '../../context/GlobalContext';
import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';
import strapi from '../../config/strapi';

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

type KnapsackType = {
  navigation: NavigationProp<any, any>;
};

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

export default function Knapsack({navigation}: KnapsackType) {
  const [cand, setCand] = useState<SubpropostaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [soma, setSoma] = useState<number>(0);

  const [selectedProjects, setSelectedProjects] = useState<{
    [key: number]: boolean;
  }>({});

  const [projectValues, setProjectValues] = useState<{[key: number]: number}>(
    {},
  );

  const {userId} = useContext(UserContext);
  const route: any = useRoute();
  let id = parseInt(route.params.id, 10);
  let cost = parseInt(route.params.cost, 10);

  function onSubmit() {
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

  function changeState(subprojetoId: number) {
    setSelectedProjects(prevState => ({
      ...prevState,
      [subprojetoId]: !prevState[subprojetoId],
    }));
  }

  useEffect(() => {
    const sum = sumSelectedProjects(projectValues, selectedProjects);
    setSoma(sum);
  }, [selectedProjects]);

  useEffect(() => {
    loadProposta(
      id,
      setCand,
      setIsLoading,
      setProjectValues,
      setSelectedProjects,
      navigation,
      changeState,
    );
  }, []);

  return (
    <View style={styles.scrollViewWrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <AppText style={styles.title}>
            Escolha os projetos que você prefere
          </AppText>
          {isLoading && <AppText>Carregando...</AppText>}
          {!isLoading &&
            cand.map(candidato => (
              <Subproposta
                key={candidato.title + candidato.id}
                id={candidato.id}
                title={candidato.title}
                description={candidato.description}
                cost={candidato.cost}
                imageUrl={candidato.imageUrl}
                author={candidato.author}
                changeState={candidato.changeState}
                nav={candidato.nav}
              />
            ))}
          <Button style={styles.buttonStyle} clickFn={onSubmit}>
            <AppText style={styles.buttonText}>Enviar Voto</AppText>
          </Button>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <AppText style={styles.totalValueText}>
          Valor Alocado: R$ {getFormattedValue(soma)}
        </AppText>
        <View style={styles.bar}>
          <View style={internBarStyle(cost, soma)} />
        </View>
        <AppText style={styles.description}>
          Você possui R$ {getFormattedValue(cost - soma)} para alocar.
        </AppText>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollViewWrapper: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    padding: 15,
    '@media (min-width:400px)': {
      padding: 34,
      justifyContent: 'center',
    },
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    textAlign: 'center',
    fontSize: 12,
    width: '80%',
  },
  navbar: {
    width: '100%',
    height: 100,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#999999',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 7,
  },
  bar: {
    width: '90%',
    borderRadius: 5,
    height: 25,
    backgroundColor: '#dcdcdc',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 27,
    fontFamily: 'Alegreya-BoldItalic',
  },
  buttonStyle: {
    marginTop: 20,
    marginBottom: 8,
  },
  totalValueText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});
