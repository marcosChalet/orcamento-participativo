import React from 'react';

import { useRoute } from "@react-navigation/native";

import {ImageBackground, ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';
import {NavigationProp} from '@react-navigation/native';

import Markdown from '@ronradtke/react-native-markdown-display';

import AppText from 'components/ui/AppText';
import Button from 'components/ui/Button';

type PropostaType = {
    navigation: NavigationProp<any, any>;
};

export default function Proposta({navigation}: PropostaType) {
    const route:any = useRoute();

    let id = route.params["id"];

    function onClick() {
        // verificar aqui o tipo e redirecionar para a página de votação correspondente
        if (route.params["tipo"] == "N-CUT") {
            // navegar para a página de votação do N-CUT
            console.log("N-CUT")
            navigation.navigate("Votação N-CUT")
        } else if (route.params["tipo"] == "Approval-1") {
            // navegar para a página de votação do Approval-1
            console.log("Approval-1")
            navigation.navigate("Votação Aprova-Um")
        } else if (route.params["tipo"] == "Knapsack") {
            // navegar para a página de votação do Knapsack
            console.log("Knapsack")
            navigation.navigate("Votação Mochileiro")
        } else if (route.params["tipo"] == "YES-NO") {
            // navegar para a página de votação do YES-NO
            console.log("YES-NO")
            navigation.navigate("Votação Sim-Não")
        }
    }

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <AppText style={styles.title}>{route.params.titulo}</AppText>
                <ImageBackground
                    style={styles.imageContainer}
                    imageStyle={styles.mainImageStyle}
                    source={{uri:route.params.imageUrl}}
                    resizeMode="cover"
                />
                <Markdown style={style}>
                    {route.params.texto}
                </Markdown>

                <Button style={styles.buttonStyle} clickFn={onClick}>
                    <AppText style={styles.buttonText}>Votar</AppText>
                </Button>
            </View>
        </ScrollView>
    )
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
})

const style = {
    body: {
        fontSize: 15,
        color: 'black',
        padding: 15,
    }
}