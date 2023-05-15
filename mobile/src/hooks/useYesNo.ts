import {Alert} from 'react-native';
import strapi from '../config/strapi';
import {NavigationProp} from '@react-navigation/native';

export default function useYesNo() {
  async function submitVote(userId: number, proposta: number, voto: string) {
    return strapi
      .create('yes-nos', {
        proposta: {
          connect: [proposta],
        },
        usuario: {
          connect: [userId],
        },
        voto: voto,
      })
      .then((data: any) => {
        return data.data;
      })
      .catch(error => {
        console.log(error);
      });
  }

  function onSubmit(
    id: number,
    userId: number,
    voto: boolean,
    navigation: NavigationProp<any, any>,
  ) {
    let valorVoto = '';
    if (voto) {
      valorVoto = 'sim';
    } else {
      valorVoto = 'não';
    }
    Alert.alert('Confira a sua votação', `Voto: ${valorVoto}`, [
      {text: 'Cancelar', style: 'cancel'},
      {
        text: 'Enviar voto',
        onPress: () => {
          submitVote(userId, id, valorVoto)
            .then(data => {
              if (data !== undefined) {
                if (Object.keys(data).length > 0) {
                  Alert.alert(
                    'Seu voto foi registrado!',
                    'Obrigado por participar desta votação.',
                    [{text: 'OK', onPress: () => navigation.goBack()}],
                  );
                }
              } else {
                Alert.alert(
                  'Algo deu errado!',
                  'Infelizmente, não conseguimos registrar o seu voto no nosso banco de dados. Por favor, tente novamente! Se mesmo assim você não conseguir, entre em contato com os responsáveis pelo app.',
                );
              }
            })
            .catch(() => {
              Alert.alert(
                'Algo deu errado!',
                'Infelizmente, não conseguimos registrar o seu voto no nosso banco de dados. Por favor, tente novamente! Se mesmo assim você não conseguir, entre em contato com os responsáveis pelo app.',
              );
            });
        },
      },
    ]);
  }

  return {onSubmit};
}
