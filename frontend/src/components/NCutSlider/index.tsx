import React, { Dispatch, SetStateAction, useState } from 'react';

import {StyleSheet, View} from 'react-native';

import {Slider} from '@miblanchard/react-native-slider';
import AppText from 'components/ui/AppText';

type NCutSliderType = {
    id:number,
    area:string;
    valorInicial:number;
    valorMaximo:number;
    valorMinimo:number;
    setValores:Dispatch<SetStateAction<{[key:number]:number}>>;
};

export default function NCutSlider(props: NCutSliderType) {
    const [value, setValue] = useState(props.valorInicial);

    return (
        <View style={styles.container}>
            <AppText style={styles.sliderLabel}>
                {props.area}
            </AppText>
            <Slider
                value={value}
                onValueChange={(value) => {
                    setValue(value[0]);
                    props.setValores((prevState) => ({
                        ...prevState,
                        [props.id]:value[0]
                    }));
                }}
                step={100}
                minimumValue={props.valorMinimo}
                maximumValue={props.valorMaximo}
            />
            <AppText style={styles.sliderValor}>Valor escolhido: R$ {value}</AppText>
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
    }
})