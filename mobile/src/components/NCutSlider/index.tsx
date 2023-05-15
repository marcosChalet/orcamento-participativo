import React, {Dispatch, SetStateAction, useState} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';

import AppText from 'components/ui/AppText';

type NCutSliderType = {
  id: number;
  area: string;
  valorInicial: number;
  valorMaximo: number;
  valorMinimo: number;
  setValores: Dispatch<SetStateAction<{[key: number]: number}>>;
};

function getFormattedValue(value: number) {
  let finalCost = String(value.toFixed(2)).replace('.', ',');
  finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
  return finalCost;
}

export default function NCutSlider(props: NCutSliderType) {
  const [value, setValue] = useState(props.valorInicial);

  return (
    <View style={styles.container}>
      <AppText style={styles.sliderLabel}>{props.area}</AppText>
      <View style={styles.minMaxContainer}>
        <AppText style={styles.minMaxFont}>
          R$ {getFormattedValue(props.valorMinimo)}
        </AppText>
        <AppText style={styles.minMaxFont}>
          R$ {getFormattedValue(props.valorMaximo)}
        </AppText>
      </View>
      <Slider
        value={value}
        // eslint-disable-next-line @typescript-eslint/no-shadow
        onValueChange={value => {
          setValue(value[0]);
          props.setValores(prevState => ({
            ...prevState,
            [props.id]: value[0],
          }));
        }}
        step={100}
        minimumValue={props.valorMinimo}
        maximumValue={props.valorMaximo}
      />
      <View style={styles.valueContainer}>
        <AppText style={styles.sliderValor}>Valor escolhido: R$ </AppText>
        <TextInput
          // eslint-disable-next-line @typescript-eslint/no-shadow
          onChangeText={value => {
            if (!Number.isNaN(+value)) {
              setValue(+value);
              props.setValores(prevState => ({
                ...prevState,
                [props.id]: +value,
              }));
            } else {
              setValue(0);
              props.setValores(prevState => ({
                ...prevState,
                [props.id]: 0,
              }));
            }
          }}
          value={String(value)}
          autoCapitalize="none"
          keyboardType="numeric"
          style={styles.input}
        />
      </View>
    </View>
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
    width: '100%',
    marginBottom: 10,
    marginUp: 10,
  },
  sliderLabel: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  sliderValor: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  minMaxContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 0,
    marginTop: 5,
  },
  minMaxFont: {
    fontSize: 9,
    marginBottom: 0,
  },
  valueContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#848484',
    height: 36,
    fontSize: 14,
    paddingStart: 8,
    color: '#444',
  },
});
