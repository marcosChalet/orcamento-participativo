/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {ScrollView, View, StyleSheet} from 'react-native';
import {NavigationProp, useRoute} from '@react-navigation/native';
import Subproposta from 'components/Subproposta';

import SubpropostaType from 'src/core/subproposta.interface';
import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';
import useKnapsack from '../..//hooks/useKnapsack';

type KnapsackType = {
  navigation: NavigationProp<any, any>;
};

export default function Knapsack({navigation}: KnapsackType) {
  const [cand, setCand] = useState<SubpropostaType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [soma, setSoma] = useState<number>(0);
  const {
    getFormattedValue,
    internBarStyle,
    loadProposta,
    sumSelectedProjects,
    onSubmit,
  } = useKnapsack();

  const [selectedProjects, setSelectedProjects] = useState<{
    [key: number]: boolean;
  }>({});

  const [projectValues, setProjectValues] = useState<{[key: number]: number}>(
    {},
  );

  const route: any = useRoute();
  let id = parseInt(route.params.id, 10);
  let cost = parseInt(route.params.cost, 10);

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
          <Button
            style={styles.buttonStyle}
            clickFn={() =>
              onSubmit(id, soma, cost, selectedProjects, navigation)
            }>
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
