import React, {useContext} from 'react';

import {useRoute} from '@react-navigation/native';

import {ImageBackground, ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';
import Markdown from '@ronradtke/react-native-markdown-display';

import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';

import UserContext from '../../context/GlobalContext';
import NCutResults from '../../components/NCutResults';
import YesNoResults from '../../components/YesNoResults';
import KnapsackResults from '../../components/KnapsackResults';
import HorizontalRule from 'components/ui/HorizontalRule';
import useTipoProposta from '../../hooks/useTipoProposta';

type PropostaType = {
  navigation: NavigationProp<any, any>;
};

export default function Proposta({navigation}: PropostaType) {
  const {userId} = useContext(UserContext);
  const {onClick} = useTipoProposta();
  const route: any = useRoute();

  let id = route.params.id;
  let cost = route.params.cost;

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
          <HorizontalRule style={styles.dividingSpace} />
          {route.params.tipo === 'N-CUT' && <NCutResults propostaId={id} />}
          {route.params.tipo === 'YES-NO' && <YesNoResults propostaId={id} />}
          {route.params.tipo === 'Knapsack' && (
            <KnapsackResults propostaId={id} />
          )}
        </View>

        <Markdown style={style}>{route.params.texto}</Markdown>

        <Button
          style={styles.buttonStyle}
          clickFn={() => onClick(id, userId, cost, route, navigation)}>
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
  dividingSpace: {
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
