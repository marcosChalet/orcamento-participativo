import React from 'react';

import { useRoute } from "@react-navigation/native";

import {ImageBackground, ScrollView, View} from 'react-native';
import {StyleSheet} from 'react-native';

import Markdown from '@ronradtke/react-native-markdown-display';

import AppText from 'components/ui/AppText';

export default function Proposta() {
    const route:any = useRoute();

    let id = route.params["id"];

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