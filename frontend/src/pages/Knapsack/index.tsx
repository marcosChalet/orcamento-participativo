import React, { useContext, useEffect, useState } from 'react';

import Button from 'components/ui/Button';
import strapi from '../../config/strapi';
import UserContext from '../../context/GlobalContext';

import AppText from 'components/ui/AppText';
import { NavigationProp, useRoute } from '@react-navigation/native';
import Subproposta from 'components/Subproposta';

import {REACT_APP_HOST, REACT_APP_PORT} from '@env';
import {ScrollView, TouchableOpacity, View, Text, Alert, StyleSheet} from 'react-native';
const hostname = REACT_APP_HOST;

async function submitVote(
  userId: number,
  proposta: number,
  voto: number[],
) {
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

async function getSubpropostas(proposta:number) {
  return strapi
    .find('propostas', {
      filters: {
        id: {
          $eq: proposta
        }
      },
      populate: ['subpropostas.titulo', 'subpropostas.capa', 'subpropostas.descricao',
                  'subpropostas.valor', 'subpropostas.usuario.nome'],
    })
    .then((data:any) => {
      return data.data;
    })
    .catch(error => {
      console.log("Teste 2", error);
      return -1;
    })
}

type KnapsackType = {
  navigation: NavigationProp<any, any>;
};

function getFormattedValue(value: number) {
  let finalCost = String(value.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
  return finalCost;
}

function internBarStyle(maxValue:number, alocado:number) {
  if (alocado <= maxValue) {
    return {
      width: `${100.0*alocado/maxValue}%`,
      borderRadius: 5,
      height: 25,
      backgroundColor: 'rgb(117, 183, 71)',
    }
  } else {
    return {
      width: `100%`,
      borderRadius: 5,
      height: 25,
      backgroundColor: 'rgb(240, 141, 96)',
    }
  }
}

export default function Knapsack({navigation}:KnapsackType) {
  const [cand, setCand] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [selectedProjects, setSelectedProjects] = useState<{[key:number]:boolean}>({});
  const [projectValues, setProjectValues] = useState<{[key:number]:number}>({});
  const [soma, setSoma] = useState<number>(0);

  const {userId, logarUsuario} = useContext(UserContext);

  const route: any = useRoute();

  let id = parseInt(route.params.id);
  let cost = parseInt(route.params.cost);

  function onSubmit() {
    if (soma <= cost) {
      let votos:number[] = []
      for (const key in selectedProjects) {
        if (selectedProjects[key]) {
          votos.push(parseInt(key));
        }
      }
      Alert.alert(
        'Enviar voto?',
        'Você deseja enviar seus votos?',
        [{text:'Não', style:'cancel'},
        {
          text: 'Sim',
          onPress: () => {
            submitVote(userId, id, votos)
              .then(data => {
                console.log(data);
                if (data != undefined) {
                  Alert.alert(
                    'Seu voto foi registrado!',
                    'Obrigado por participar desta votação.',
                    [{text: 'OK', onPress: () => navigation.goBack()}],
                  )
                } else {
                  Alert.alert(
                    'Não conseguimos registrar o seu voto!',
                    'Algum error aconteceu. Tente novamente, ou entre em contato com os responsáveis pelo app!'
                  )
                }
              })
              .catch(error => {
                Alert.alert(
                  'Não conseguimos registrar o seu voto!',
                  'Algum error aconteceu. Tente novamente, ou entre em contato com os responsáveis pelo app!'
                )
                console.log(error);
              });
          }
        }]
      )
    } else {
      Alert.alert(
        'O orçamento é insuficiente!',
        'Você selecionou muitos projetos e a soma dos custo excedeu o orçamento total. Por favor, remova algum(ns) projeto(s) e tente novamente.'
      )
    }
  }

  function changeState(subprojetoId:number) {
    setSelectedProjects(prevState => ({
      ...prevState,
      [subprojetoId]:!prevState[subprojetoId]
    }))
  }

  useEffect(() => {
    let sum = 0;
    for (const key in selectedProjects) {
      if (selectedProjects[key]) {
        sum += projectValues[key];
      }
    }
    setSoma(sum);
  }, [selectedProjects])

  useEffect(() => {
    getSubpropostas(id)
      .then(data => {
        setIsLoading(true);

        let candidatos = [];
        let valores:{[key:number]:number} = {};
        let selecionados:{[key:number]:boolean} = {};

        let subpropostas = data[0].attributes.subpropostas.data;
        //console.log(subpropostas)
        for (let i = 0; i < subpropostas.length; i++) {
          //console.log(subpropostas[i]);
          let subId:number = parseInt(subpropostas[i].id);
          let title:string = subpropostas[i].attributes.titulo;
          let description:string = subpropostas[i].attributes.descricao;
          let cost:number = subpropostas[i].attributes.valor;
          let urlSuffix:string = subpropostas[i].attributes.capa.data.attributes.url;
          let url:string = `http://${hostname}:${REACT_APP_PORT}${urlSuffix}`;
          let autor:string = subpropostas[i].attributes.usuario.data.attributes.nome;

          valores[subId] = cost;
          selecionados[subId] = false;
          //let url:string = `http://${hostname}:${REACT_APP_PORT}` + subpropostas[i].attributes.capa.data.attributes.url;
          candidatos.push(
            <Subproposta
              id={subId}
              title={title}
              description={description}
              cost={cost}
              imageUrl={url}
              author={autor}
              changeState={changeState}
              nav={navigation}
            />
          )
        }

        setCand(candidatos);
        setIsLoading(false);
        setProjectValues(valores);
        setSelectedProjects(selecionados);
      })
      .catch(error => {
        console.log(error);
      })
  }, [])

  return (
    <View style={styles.scrollViewWrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
        <AppText style={styles.title}>Escolha os projetos que você prefere</AppText>
          {isLoading && <AppText>Carregando...</AppText>}
          {!isLoading && cand}
          <Button style={styles.buttonStyle} clickFn={onSubmit}>
            <AppText style={styles.buttonText}>Enviar Voto</AppText>
          </Button>
        </View>
      </ScrollView>

      <View style={styles.navbar}>
        <AppText style={{fontWeight:'bold', fontSize: 18,}}>
          Valor Alocado: R$ {getFormattedValue(soma)}
        </AppText>
        <View style={styles.bar}>
          <View style={internBarStyle(cost, soma)}></View>
        </View>
        <AppText style={styles.description}>
          Você possui R$ {getFormattedValue(cost - soma)} para alocar.
        </AppText>
      </View>
    </View>
  )
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
});
