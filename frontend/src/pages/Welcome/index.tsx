import React from 'react';
import {ScrollView, View} from 'react-native';
import StyleSheet from 'react-native-media-query';

import LogoUFCA from 'assets/imgs/ufca-logo.svg';
import PeopleIllustration from 'assets/imgs/people-illustration.svg';

import Button from 'components/ui/Button';
import AppText from 'components/ui/AppText';

import {NavigationProp} from '@react-navigation/native';

type WelcomeType = {
  navigation: NavigationProp<any, any>;
};

export default function Welcome({navigation}: WelcomeType) {
  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <LogoUFCA width={81} height={57} />
        <AppText style={styles.helloText}>
          Oi! Boas vindas ao app de Orçamento Participativo da UFCA!
        </AppText>
        <PeopleIllustration
          width={styles.illustration.width}
          height={styles.illustration.height}
        />
        <AppText style={styles.description}>
          Aqui você poderá participar ativamente das decisões tomadas na
          universidade debatendo, propondo e votando em projetos e na
          distribuição orçamentária.
        </AppText>
        <Button clickFn={() => navigation.navigate('Login')}>
          <AppText style={styles.buttonText}>Continuar</AppText>
        </Button>
      </View>
    </ScrollView>
  );
}

const {styles} = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    padding: 15,
    '@media (min-width:400px)': {
      padding: 34,
    },
  },
  buttonText: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Alegreya-BoldItalic',
  },
  helloText: {
    fontSize: 25,
    lineHeight: 26,
    fontFamily: 'Alegreya-ExtraBoldItalic',
    width: 270,
    paddingLeft: 2,
    marginTop: 7,
  },
  description: {
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
  illustration: {
    width: '70%',
    height: 200,
    '@media (min-width:400px)': {
      width: 390,
      height: 390,
    },
  },
});
