import React, {useContext} from 'react';

import {useRoute} from '@react-navigation/native';

import {Alert, ImageBackground, ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Markdown from '@ronradtke/react-native-markdown-display';

import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';

import strapi from '../../config/strapi';
import UserContext from '../../context/GlobalContext';
import NCutResults from '../../components/NCutResults';
import YesNoResults from '../../components/YesNoResults';
import KnapsackResults from '../../components/KnapsackResults';

type PropostaType = {
  navigation: NavigationProp<any, any>;
};

async function checkNCUT(propostaId: number, userId: number) {
  // checa se o usuário já votou nesta proposta
  return strapi
    .find('n-cuts', {
      filters: {
        usuario: {
          id: {
            $eq: userId,
          },
        },
        proposta: {
          id: {
            $eq: propostaId,
          },
        },
      },
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

async function checkYesNo(propostaId: number, userId: number) {
  return strapi
    .find('yes-nos', {
      filters: {
        usuario: {
          id: {
            $eq: userId,
          },
        },
        proposta: {
          id: {
            $eq: propostaId,
          },
        },
      },
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

async function checkKnapsack(propostaId: number, userId: number) {
  return strapi
    .find('knapsacks', {
      filters: {
        usuario: {
          id: {
            $eq: userId,
          },
        },
        proposta: {
          id: {
            $eq: propostaId,
          },
        },
      },
    })
    .then((data: any) => {
      return data.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export default function Proposta({navigation}: PropostaType) {
  const {userId} = useContext(UserContext);

  const route: any = useRoute();

  let id = route.params.id;
  let cost = route.params.cost;

  function onClick() {
    // verificar aqui o tipo e redirecionar para a página de votação correspondente
    if (route.params.tipo === 'N-CUT') {
      // navegar para a página de votação do N-CUT
      checkNCUT(id, userId)
        .then(data => {
          if (data.length > 0) {
            Alert.alert(
              'Usuário já votou!',
              'Você já votou nesta proposta. Cada usuário só tem direito a um voto!',
            );
          } else {
            navigation.navigate('Votação N-CUT', {
              id: id,
            });
          }
        })
        .catch(() => {
          Alert.alert(
            'Algum erro aconteceu!',
            'Não conseguimos verificar se você já votou ou não nesta proposta. Por favor, tente novamente. Se o erro persistir, entre em contato com os responsáveis pelo app!',
          );
        });
    } else if (route.params.tipo === 'Approval-1') {
      // navegar para a página de votação do Approval-1
      navigation.navigate('Votação Aprova-Um', {
        id: id,
      });
    } else if (route.params.tipo === 'Knapsack') {
      // navegar para a página de votação do Knapsack
      checkKnapsack(id, userId)
        .then(data => {
          if (data.length > 0) {
            Alert.alert(
              'Usuário já votou!',
              'Você já votou nesta proposta. Cada usuário só tem direito a um voto!',
            );
          } else {
            navigation.navigate('Votação Mochileiro', {
              id: id,
              cost: cost,
            });
          }
        })
        .catch(() => {
          Alert.alert(
            'Algum erro aconteceu!',
            'Não conseguimos verificar se você já votou ou não nesta proposta. Por favor, tente novamente. Se o erro persistir, entre em contato com os responsáveis pelo app!',
          );
        });
    } else if (route.params.tipo === 'YES-NO') {
      // navegar para a página de votação do YES-NO
      checkYesNo(id, userId)
        .then(data => {
          if (data.length > 0) {
            Alert.alert(
              'Usuário já votou!',
              'Você já votou nesta proposta. Cada usuário só tem direito a um voto!',
            );
          } else {
            navigation.navigate('Votação Sim-Não', {
              id: id,
            });
          }
        })
        .catch(() => {
          Alert.alert(
            'Algum erro aconteceu!',
            'Não conseguimos verificar se você já votou ou não nesta proposta. Por favor, tente novamente. Se o erro persistir, entre em contato com os responsáveis pelo app!',
          );
        });
    }
  }

  return (
    <ScrollView style={styles.scrollView}>
      <View style={styles.container}>
        <AppText style={styles.title}>{route.params.titulo}</AppText>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={styles.mainImageStyle}
          source={{uri: route.params.imageUrl}}
          resizeMode="cover"
        />
        <View style={styles.results}>
          <AppText style={styles.resultsText}>RESULTADOS</AppText>
          <View style={styles.resultsView} />
          {route.params.tipo === 'N-CUT' && <NCutResults propostaId={id} />}
          {route.params.tipo === 'YES-NO' && <YesNoResults propostaId={id} />}
          {route.params.tipo === 'Knapsack' && (
            <KnapsackResults propostaId={id} />
          )}
        </View>

        <Markdown style={style}>{route.params.texto}</Markdown>

        <Button style={styles.buttonStyle} clickFn={onClick}>
          <AppText style={styles.buttonText}>Votar</AppText>
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    '@media (min-width:400px)': {
      padding: 34,
      justifyContent: 'center',
    },
  },
  buttonStyle: {
    backgroundColor: '#75b747',
    marginTop: 20,
    marginBottom: 8,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 27,
    fontFamily: 'Alegreya-BoldItalic',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 350 / 150,
    width: '100%',
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: '#fcfcfc',
  },
  mainImageStyle: {
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Alegreya-ExtraBoldItalic',
    paddingLeft: 2,
    marginTop: 7,
  },
  results: {
    flex: 1,
    padding: 10,
    marginTop: 10,
    borderRadius: 10,
    borderColor: '#532B1D',
    borderWidth: 1,
  },
  resultsText: {
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
  },
  resultsView: {
    borderBottomColor: '#CAC8C7',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 10,
    marginTop: 10,
  },
});

const style = {
  body: {
    fontSize: 15,
    color: 'black',
    padding: 15,
  },
};
