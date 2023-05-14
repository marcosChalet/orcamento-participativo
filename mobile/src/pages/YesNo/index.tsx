import React, {useContext, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import SwitchWithIcons from 'react-native-switch-with-icons';
import {NavigationProp, useRoute} from '@react-navigation/native';

import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';
import UserContext from '../../context/GlobalContext';
import useYesNo from '../../hooks/useYesNo';

function yesStyle(value: boolean) {
  if (value) {
    return {
      fontWeight: 'bold',
      color: 'rgb(117, 183, 71)',
    };
  } else {
    return {
      fontWeight: 'normal',
      color: 'rgb(170, 170, 170)',
    };
  }
}

function noStyle(value: boolean) {
  if (!value) {
    return {
      fontWeight: 'bold',
      color: 'rgb(240, 141, 96)',
    };
  } else {
    return {
      fontWeight: 'normal',
      color: 'rgb(170, 170, 170)',
    };
  }
}

type YesNoType = {
  navigation: NavigationProp<any, any>;
};

export default function YesNo({navigation}: YesNoType) {
  const [voto, setVoto] = useState<boolean>(true);
  const {userId} = useContext(UserContext);
  const {onSubmit} = useYesNo();
  const route: any = useRoute();
  let id = parseInt(route.params.id, 10);

  return (
    <View style={styles.container}>
      <AppText style={styles.title}>Você concorda com esta proposta?</AppText>
      <View style={styles.row}>
        <AppText style={noStyle(voto)}>NÃO</AppText>
        <SwitchWithIcons
          value={voto}
          onValueChange={value => {
            setVoto(value);
          }}
          style={styles.switch}
          icon={{
            true: require('../../../assets/imgs/thumbsUp.png'),
            false: require('../../../assets/imgs/thumbsDown.png'),
          }}
          thumbColor={{
            true: 'rgb(117, 183, 71)',
            false: 'rgb(240, 141, 96)',
          }}
          iconColor={{
            true: 'rgb(255, 255, 255)',
            false: 'rgb(255, 255, 255)',
          }}
          trackColor={{
            true: 'rgb(214, 232, 202)',
            false: 'rgb(237, 208, 194)',
          }}
        />
        <AppText style={yesStyle(voto)}>SIM</AppText>
      </View>
      <Button
        style={styles.buttonStyle}
        clickFn={() => onSubmit(id, userId, voto, navigation)}>
        <AppText style={styles.buttonText}>Enviar Voto</AppText>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#FFF',
  },
  container: {
    flex: 1,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    '@media (min-width:400px)': {
      padding: 34,
      justifyContent: 'center',
      alignItems: 'center',
      height: '100%',
    },
  },
  switch: {
    height: 70,
    width: 160,
  },
  row: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
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
});
