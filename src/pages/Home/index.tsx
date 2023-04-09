import React from 'react';
import {ScrollView, View} from 'react-native';
import StyleSheet from 'react-native-media-query';

import AppText from 'components/ui/AppText';
import Proposta from '../../components/ui/Proposta';

export default function Welcome() {
    return (
        <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
            <AppText style={styles.title}>
            Oi, Samuel!
            </AppText>
            <AppText style={styles.subTitle}>
            Que bom te ver por aqui!
            </AppText>
            <AppText style={styles.description}>
            Esta é a área em que você poderá ver as
            propostas e votações que estão abertas.
            </AppText>
            <Proposta
                title="Proposta para ter picanha no R.U."
                description='Vote se você quer que o R.U. ofereça picanha nas refeições.'
                tags={['teste', 'ufca', 'react-native']}
                cost={13000}
                author='Pró-Reitoria de Assistência Estudantil (PRAE)'
                finalDate={new Date('2023-04-10')}
            />
            <Proposta
                title="Distribuição orçamentária entre as áreas da UFCA"
                description='Ajude a decidir os orçamentos de cada área da universidade, garantindo uma gestão mais democrática e participativa.'
                tags={['Votação Local Iterativa']}
                cost={2000000000}
                author='Pró-Reitoria de Assistência Estudantil (PRAE)'
                finalDate={new Date('2023-04-30')}
            />
        </View>
        </ScrollView>
    );
}

const {styles} = StyleSheet.create({
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
},
title: {
    fontSize: 25,
    fontFamily: 'Alegreya-ExtraBoldItalic',
    width: 270,
    paddingLeft: 2,
    marginTop: 7,
},
subTitle: {
    fontSize: 20,
    fontFamily: 'Alegreya-Bold',
    width: 270,
    paddingLeft: 2,
},
description: {
    fontSize: 16,
    lineHeight: 16,
    paddingLeft: 2,
    paddingTop: 15,
    marginBottom: 24,
    '@media (min-width:400px)': {
    paddingBottom: 10,
    fontSize: 18,
    },
},
});