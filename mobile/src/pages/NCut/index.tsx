/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import {useRoute} from '@react-navigation/native';

import UserContext from '../../context/GlobalContext';
import NCutSlider from 'components/NCutSlider';
import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';
import useNCut from '../../hooks/useNCut';

type NCutType = {
  navigation: NavigationProp<any, any>;
};

type slideType = {
  id: number;
  key: string;
  area: string;
  valorInicial: number;
  valorMaximo: number;
  setValores: Dispatch<SetStateAction<{[key: number]: number}>>;
  valorMinimo: number;
};

function valorColor(soma: number, valorMaximo: number) {
  return {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: soma > valorMaximo ? 'red' : 'black',
  };
}

export default function NCut({navigation}: NCutType) {
  const [valores, setValores] = useState<{[key: number]: number}>({});
  const [sliders, setSliders] = useState<slideType[]>([]);
  const [valorAlocado, setValorAlocado] = useState(0);
  const [valorMaximo, setValorMaximo] = useState(0);
  const [areas, setAreas] = useState<string[]>([]);
  const {userId} = useContext(UserContext);
  const {getAreas, getFormattedValue, onSubmit} = useNCut();

  const route: any = useRoute();
  let id = parseInt(route.params.id, 10);

  useEffect(() => {
    let soma = 0;
    for (const key in valores) {
      soma += valores[key];
    }
    setValorAlocado(soma);
  }, [valores]);

  useEffect(() => {
    getAreas(id)
      .then(data => {
        let slidersLoad: Array<slideType> = [];
        let areasAtt: {[key: string]: string} = data.attributes.areas;
        let valor = data.attributes.valor;
        setValorAlocado(valor);
        setValorMaximo(valor);

        let valoresIniciais: {[key: number]: number} = {};
        let areasStrings = [];

        let size = Object.keys(areasAtt).length;
        for (const k in areasAtt) {
          valoresIniciais[parseInt(k, 10)] = Math.floor(valor / size);
          areasStrings.push(areasAtt[k]);
          slidersLoad.push({
            id: parseInt(k, 10),
            key: k,
            area: areasAtt[k],
            valorInicial: Math.floor(valor / size),
            valorMaximo: valor,
            setValores: setValores,
            valorMinimo: 0,
          });
        }
        setSliders(slidersLoad);
        setValores(valoresIniciais);
        setAreas(areasStrings);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.scrollViewWrapper}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <AppText style={styles.title}>Votação N-CUT</AppText>
          <AppText style={styles.description}>
            Utilize os seletores abaixo ou as caixas de texto para especificar
            os valores que você deseja que sejam alocados para cada área.
          </AppText>
          {sliders.map(slider => (
            <NCutSlider
              key={slider.key}
              id={slider.id}
              area={slider.area}
              valorInicial={slider.valorInicial}
              setValores={slider.setValores}
              valorMaximo={slider.valorMaximo}
              valorMinimo={slider.valorMinimo}
            />
          ))}
        </View>
        <Button
          style={styles.buttonStyle}
          clickFn={() =>
            onSubmit(
              id,
              userId,
              areas,
              valorAlocado,
              valorMaximo,
              valores,
              navigation,
            )
          }>
          <AppText style={styles.buttonText}>Enviar Voto</AppText>
        </Button>
      </ScrollView>
      <View style={styles.navbar}>
        <AppText style={valorColor(valorAlocado, valorMaximo)}>
          Valor Alocado: R$ {getFormattedValue(valorAlocado)}
        </AppText>
        <AppText style={styles.smallDescription}>
          Você possui R$ {getFormattedValue(valorMaximo - valorAlocado)} para
          alocar.
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
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    maxWidth: '90%',
    marginBottom: 10,
  },
  smallDescription: {
    textAlign: 'center',
    maxWidth: '90%',
    marginBottom: 10,
    fontSize: 11,
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
  navbar: {
    width: '100%',
    height: 75,
    backgroundColor: '#FFF',
    borderTopWidth: 1,
    borderColor: '#999999',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingTop: 7,
  },
});
