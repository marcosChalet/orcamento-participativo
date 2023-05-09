import React, {useState, useEffect} from 'react';
import {REACT_APP_HOST, REACT_APP_PORT} from '@env';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import StyleSheet from 'react-native-media-query';
import {NavigationProp} from '@react-navigation/native';

import AppText from 'components/ui/AppText';
import Proposta from '../../components/Proposta';

import HomeIcon from 'assets/imgs/home-icon.svg';
import HeartIcon from 'assets/imgs/heart-icon.svg';
import ChatIcon from 'assets/imgs/chat-icon.svg';
import PeopleIcon from 'assets/imgs/people-icon.svg';

import strapi from '../../config/strapi';

const hostname = REACT_APP_HOST;

async function getPropostas() {
  return strapi
    .find('propostas', {
      filters: {
        data_final: {
          $gte: '2023-04-12',
        },
      },
      populate: '*',
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

type WelcomeType = {
  navigation: NavigationProp<any, any>;
};

export default function Welcome({navigation}: WelcomeType) {
  const [propostas, setPropostas] = useState<any[]>([]);

  useEffect(() => {
    let p: Array<any> = [];
    getPropostas()
      .then(data => {
        for (let i = 0; i < data.length; i++) {
          let proposta = data[i].attributes;
          let t = proposta.tags;
          let tags: Array<string> = [];
          let capa =
            `http://${hostname}:${REACT_APP_PORT}` +
            proposta.capa.data.attributes.url;
          let autor = proposta.usuario.data.attributes.nome;
          let id = data[i].id;
          let texto = proposta.texto;
          let tipo = proposta.Tipo;
          for (const [key, value] of Object.entries(t)) {
            tags.push(String(value));
          }
          p.push(
            <Proposta
              key={id}
              title={proposta.titulo}
              description={proposta.descricao}
              tags={tags}
              cost={proposta.valor}
              author={autor}
              finalDate={new Date(proposta.data_final)}
              imageUrl={capa}
              id={id}
              nav={navigation}
              texto={texto}
              tipo={tipo}
            />,
          );
        }
        setPropostas(p);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

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
          {propostas}
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
