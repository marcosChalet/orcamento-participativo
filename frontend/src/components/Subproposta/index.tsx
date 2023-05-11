import React, { useState } from 'react';
import {Image, ImageBackground, TouchableOpacity, View} from 'react-native';
import {StyleSheet} from 'react-native';

import AppText from '../ui/AppText';
import Tag from '../Tag';

import Heart from '../../../assets/imgs/heart.svg';

import {NavigationProp} from '@react-navigation/native';
import Button from '../../components/ui/Button';

type SubpropostaType = {
  title: string;
  description: string;
  cost: number;
  author: string;
  imageUrl: string;
  id: number;
  changeState: (id:number) => void;
  nav: NavigationProp<any, any>;
};

export default function Subproposta(props: SubpropostaType) {

  const [selected, setSelected] = useState<boolean>(false);

  let finalCost: string;
  finalCost = String(props.cost.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');

  function onClick() {
    if (!selected) {
        setSelected(true);
    } else {
        setSelected(false);
    }
    props.changeState(props.id);
  }

  function buttonStyle(value:boolean) {
    if (value) {
        return styles.buttonRemoveStyle;
    } else {
        return styles.buttonAddStyle;
    }
  }

  function buttonText(value:boolean) {
    if (!value) {
        return "Adicionar Projeto";
    } else {
        return "Remover Projeto";
    }
  }

  return (
    <TouchableOpacity>
      <View style={styles.card}>
        <ImageBackground
          style={styles.imageContainer}
          imageStyle={styles.mainImageStyle}
          source={{uri: props.imageUrl}}
          resizeMode="cover"
        />

        <View style={styles.info}>
          <AppText style={styles.title}>{props.title}</AppText>
          <AppText style={styles.description}>{props.description}</AppText>
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
              <AppText style={styles.miniBiggerText}>{props.author}</AppText>
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
          <View
            style={{
              borderBottomColor: '#CAC8C7',
              borderBottomWidth: StyleSheet.hairlineWidth,
              marginBottom: 10,
            }}
          />
          <Button style={buttonStyle(selected)} clickFn={onClick}>
            <AppText style={styles.buttonText}>{buttonText(selected)}</AppText>
          </Button>
        </View>
      </View>
    </TouchableOpacity>
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
  buttonText: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'System font',
  },
  buttonAddStyle: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    backgroundColor: 'rgb(117, 183, 71)',
  },
  buttonRemoveStyle: {
    marginTop: 5,
    marginBottom: 5,
    width: '100%',
    backgroundColor: 'rgb(240, 141, 96)',
  },
});
