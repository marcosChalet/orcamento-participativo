import React from 'react';
import {StyleSheet, View} from 'react-native';

import LogoUFCA from 'assets/imgs/ufca-logo.svg';
import PeopleIllustration from 'assets/imgs/people-illustration.svg';

import Button from 'components/ui/Button';
import AppText from 'components/ui/AppText';

export default function Welcome() {
  return (
    <View style={styles.container}>
      <LogoUFCA width={81} height={57} />
      <AppText style={styles.helloText}>
        Oi! Boas vindas ao app de Orçamento Participativo da UFCA!
      </AppText>
      <PeopleIllustration />
      <AppText style={styles.description}>
        Aqui você poderá participar ativamente das decisões tomadas na
        universidade debatendo, propondo e votando em projetos e na distribuição
        orçamentária.
      </AppText>
      <Button>
        <AppText style={styles.buttonText}>Continuar</AppText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 34,
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
    maxWidth: 283,
    width: '90%',
    paddingLeft: 2,
    marginTop: 7,
  },
  description: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 15.9,
    paddingLeft: 2,
    marginTop: 30,
    marginBottom: 24,
  },
});
