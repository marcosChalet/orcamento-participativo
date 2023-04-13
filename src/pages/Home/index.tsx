import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, View, Text} from 'react-native';
import StyleSheet from 'react-native-media-query';

import AppText from 'components/ui/AppText';
import Proposta from '../../components/Proposta';

import HomeIcon from 'assets/imgs/home-icon.svg';
import HeartIcon from 'assets/imgs/heart-icon.svg';
import ChatIcon from 'assets/imgs/chat-icon.svg';
import PeopleIcon from 'assets/imgs/people-icon.svg';

import Strapi from "strapi-sdk-js";

const strapi = new Strapi({
  url: "http://192.168.0.6:1337", //lembrar sempre de atualizar essa linha com o IP correto
  prefix: "/api",
  store: {
    key: "strapi_jwt",
    useLocalStorage: false,
    cookieOptions: { path: "/" },
  },
  axiosOptions: {
    headers: {
      'Authorization': 'Bearer 0ff43ad4a5309535078ffc1ece03c4408b9786e1a1e5e616479999a85cc15eaa6bc0f1b47731777a9d883c74dfc53bd3c7248b7ff9de0175846462168bb4849ab0225bc59c0cc3963e62916b8f9e95bb5bbc24e9d5d987c2f20334ad20187605d8078d55592d782205499b2b42bd6260c9ebb216d52928b6986b923fece42817',
      'Content-Type': 'application/json',
    }
  },
})

async function getPropostas() {
  return strapi.find('propostas', {
    filters: {
      data_final: {
        $gte: '2023-04-12',
      },
    },
    populate: '*',
  })
  .then((data : any) => {
    return data.data;
  })
  .catch((error) => {
    console.log(error);
  });
}

export default function Welcome() {

  const [propostas, setPropostas] = useState<any[]>([]);

  useEffect(() => {
    let p:Array<any> = [];
    //console.log('useEffect');
    getPropostas()
    .then( (data) => {
      for (let i = 0; i < data.length; i++) {
        let proposta = data[i]["attributes"];
        let t = proposta["tags"];
        let tags:Array<string> = [];
        let capa = "http://192.168.0.6:1337" + proposta["capa"]["data"]["attributes"]["url"];
        let autor = proposta["usuario"]["data"]["attributes"]["nome"];
        let id = data[i]["id"];
        for (const [key, value] of Object.entries(t)) {
          tags.push(String(value));
        }
        p.push(
          <Proposta
            key={id}
            title={proposta["titulo"]}
            description={proposta["descricao"]}
            tags={tags}
            cost={proposta["valor"]}
            author={autor}
            finalDate={new Date(proposta["data_final"])}
            imageUrl={capa}
          />
        );
      }
      //console.log(data);
      setPropostas(p);
    })
    .catch( (error) => {
      console.log(error);
    })
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
