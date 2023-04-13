import React from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import StyleSheet from 'react-native-media-query';

import AppText from 'components/ui/AppText';
import Proposta from '../../components/Proposta';

import HomeIcon from 'assets/imgs/home-icon.svg';
import HeartIcon from 'assets/imgs/heart-icon.svg';
import ChatIcon from 'assets/imgs/chat-icon.svg';
import PeopleIcon from 'assets/imgs/people-icon.svg';

export default function Welcome() {
  return (
    <View style={styles.scrollViewWrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <AppText style={styles.title}>Oi, Samuel!</AppText>
          <AppText style={styles.subTitle}>Que bom te ver por aqui!</AppText>
          <AppText style={styles.description}>
            Esta é a área em que você poderá ver as propostas e votações que
            estão abertas.
          </AppText>
          <Proposta
            title="Proposta para ter picanha no R.U."
            description="Vote se você quer que o R.U. ofereça picanha nas refeições."
            tags={['teste', 'ufca', 'react-native']}
            cost={13000}
            author="Pró-Reitoria de Assistência Estudantil (PRAE)"
            finalDate={new Date('2023-04-10')}
          />
          <Proposta
            title="Distribuição orçamentária entre as áreas da UFCA"
            description="Ajude a decidir os orçamentos de cada área da universidade, garantindo uma gestão mais democrática e participativa."
            tags={['Votação Local Iterativa']}
            cost={2000000000}
            author="Pró-Reitoria de Assistência Estudantil (PRAE)"
            finalDate={new Date('2023-04-30')}
          />
        </View>
      </ScrollView>
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.barContent}>
          <HomeIcon width={30} height={26} />
          <Text style={styles.iconText}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barContent}>
          <HeartIcon width={30} height={26} />
          <Text style={styles.iconText}>Favoritos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barContent}>
          <ChatIcon width={30} height={26} />
          <Text style={styles.iconText}>Propor um projeto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.barContent}>
          <PeopleIcon width={30} height={26} />
          <Text style={styles.iconText}>Propostas da comunidade</Text>
        </TouchableOpacity>
      </View>
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
  navbar: {
    width: '100%',
    height: 65,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#999999',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 7,
  },
  barContent: {
    height: '100%',
    width: 75,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 9,
    color: '#434343',
    paddingTop: 2,
  },
});
