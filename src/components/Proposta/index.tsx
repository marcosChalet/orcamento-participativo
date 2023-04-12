import React from 'react';
import {ImageBackground, View} from 'react-native';
import {StyleSheet} from 'react-native';

import AppText from '../ui/AppText';
import Tag from '../Tag';

import Heart from '../../../assets/imgs/heart.svg';

type propostaType = {
  title: string;
  description: string;
  tags: Array<string>;
  cost: number;
  author: string;
  finalDate: Date;
};

export default function Proposta(props: propostaType) {
  let tags = [];

  for (let i = 0; i < props.tags.length; i++) {
    tags.push(<Tag key={props.title + i} name={props.tags[i]} />);
  }

  let now = new Date();
  let diff = props.finalDate.getTime() - now.getTime();
  let mins = diff / (1000 * 60);
  let hours = diff / (1000 * 3600);
  let days = diff / (1000 * 3600 * 24);

  let finalDiff: string;

  if (days <= 0) {
    finalDiff = '0 minutos';
  } else if (days > 1) {
    finalDiff = String(Math.floor(days)) + ' dias';
  } else if (hours > 1) {
    finalDiff = String(Math.floor(hours)) + ' horas';
  } else {
    finalDiff = String(Math.floor(mins)) + ' minutos';
  }

  let finalCost: string;
  finalCost = String(props.cost.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');

  return (
    <View style={styles.card}>
      <ImageBackground
        style={styles.imageContainer}
        imageStyle={styles.mainImageStyle}
        source={require('../../../assets/imgs/UFCA.jpg')}
        resizeMode="cover"
      />

      <View style={styles.info}>
        <AppText style={styles.title}>{props.title}</AppText>
        <AppText style={styles.description}>{props.description}</AppText>

        <View style={styles.rowContainer}>{tags}</View>

        <AppText style={styles.cost}>R$ {finalCost}</AppText>

        <View
          style={{
            borderBottomColor: '#CAC8C7',
            borderBottomWidth: StyleSheet.hairlineWidth,
            marginBottom: 10,
          }}
        />

        <View style={styles.bottomContainer}>
          <View style={styles.authorContainer}>
            <View>
              <ImageBackground
                style={styles.profileContainer}
                imageStyle={styles.profilePicture}
                source={require('../../../assets/imgs/procult.jpg')}
                resizeMode="cover"
              />
            </View>
            <AppText style={styles.miniBiggerText}>
              Pró-reitoria de Assistência Estudantil (PRAE)
            </AppText>
          </View>

          <View style={styles.timeContainer}>
            <AppText style={styles.miniText}>Restam: </AppText>
            <AppText style={styles.miniBiggerText}>{finalDiff}</AppText>
            <AppText style={styles.miniText}>para encerrar </AppText>
          </View>

          <View style={styles.heartContainer}>
            <Heart
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    shadowOffset: {width: 0, height: 4},
    shadowColor: 'black',
    shadowOpacity: 1,
    elevation: 5,
    backgroundColor: '#fcfcfc',
    marginBottom: 15,
  },
  info: {
    padding: 15,
  },
  rowContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  authorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    width: '50%',
    flexShrink: 1,
    margin: 2,
  },
  timeContainer: {
    width: '25%',
    flexShrink: 1,
    margin: 2,
    alignItems: 'center',
    textAlign: 'left',
  },
  heartContainer: {
    width: '10%',
    margin: 2,
  },
  mainImageStyle: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 350 / 150,
    width: '100%',
  },
  profileContainer: {
    flex: 1,
    height: 30,
    width: 30,
    marginTop: 10,
    marginBottom: 10,
    marginRight: 10,
  },
  profilePicture: {
    borderRadius: 100,
    height: 30,
    width: 30,
  },
  title: {
    fontFamily: 'Alegreya-BoldItalic',
    lineHeight: 24,
    fontSize: 21,
  },
  description: {
    fontSize: 13,
    marginBottom: 8,
    marginTop: 4,
  },
  cost: {
    fontFamily: 'Alegreya-BoldItalic',
    fontSize: 24,
    marginTop: 5,
    marginBottom: 10,
  },
  miniText: {
    fontSize: 8,
  },
  miniBiggerText: {
    fontSize: 10,
    fontWeight: '700',
    flexShrink: 1,
  },
});
