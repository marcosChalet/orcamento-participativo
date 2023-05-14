/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useEffect} from 'react';
import {ScrollView, View, Alert} from 'react-native';
import StyleSheet from 'react-native-media-query';
import {NavigationProp} from '@react-navigation/native';

import AppText from 'components/ui/AppText';
import Proposta from '../../components/Proposta';
import BottomNavbar from 'components/BottomNavbar';
import PropostaInterface from 'src/core/proposta.interface';
import useProposta from '../../hooks/useProposta';

type WelcomeType = {
  navigation: NavigationProp<any, any>;
};

type OmitNavProposta = Omit<PropostaInterface, 'nav'>;

export default function Welcome({navigation}: WelcomeType) {
  const [propostas, setPropostas] = useState<OmitNavProposta[]>([]);
  const loadProposta = useProposta();

  useEffect(() => {
    navigation.addListener('beforeRemove', e => {
      e.preventDefault();

      Alert.alert(
        'Sair do App?',
        'Você deseja mesmo sair do app? Você irá deslogar.',
        [
          {text: 'Não sair', style: 'cancel', onPress: () => {}},
          {
            text: 'Sair do App',
            style: 'destructive',
            onPress: () => navigation.dispatch(e.data.action),
          },
        ],
      );
    });
  }, [navigation]);

  useEffect(() => {
    loadProposta(setPropostas);
  }, []);

  return (
    <View style={styles.scrollViewWrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <AppText style={styles.title}>Boas vindas!</AppText>
          <AppText style={styles.subTitle}>Que bom te ver por aqui!</AppText>
          <AppText style={styles.description}>
            Esta é a área em que você poderá ver as propostas e votações que
            estão abertas.
          </AppText>
          {propostas.map(proposta => (
            <Proposta
              key={proposta.id}
              title={proposta.title}
              description={proposta.description}
              tags={proposta.tags}
              cost={proposta.cost}
              author={proposta.author}
              finalDate={new Date(proposta.finalDate)}
              imageUrl={proposta.imageUrl}
              id={proposta.id}
              textBody={proposta.textBody}
              type={proposta.type}
              nav={navigation}
            />
          ))}
        </View>
      </ScrollView>
      <BottomNavbar />
    </View>
  );
}

const {styles} = StyleSheet.create({
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
    fontSize: 25,
    fontFamily: 'Alegreya-ExtraBoldItalic',
    width: 270,
    paddingLeft: 2,
    marginTop: 7,
  },
  subTitle: {
    fontSize: 20,
    fontFamily: 'Alegreya-Bold',
    width: 270,
    paddingLeft: 2,
  },
  description: {
    fontFamily: 'System font',
    fontSize: 16,
    lineHeight: 16,
    paddingLeft: 2,
    paddingTop: 15,
    marginBottom: 24,
    '@media (min-width:400px)': {
      paddingBottom: 10,
      fontSize: 18,
    },
  },
});
