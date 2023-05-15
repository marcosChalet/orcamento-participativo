import {Alert} from 'react-native';
import strapi from '../config/strapi';
import {NavigationProp} from '@react-navigation/native';

export default function useTipoProposta() {
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

  function onClick(
    id: number,
    userId: number,
    cost: number,
    route: any,
    navigation: NavigationProp<any, any>,
  ) {
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

  return {onClick};
}
