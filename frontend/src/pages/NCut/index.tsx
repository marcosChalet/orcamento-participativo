import React, {useState, useEffect, useContext} from 'react';

import {HOST, PORT} from '@env';

import {ScrollView, StyleSheet, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import AppText from 'components/ui/AppText';

import NCutSlider from 'components/NCutSlider';

import {NavigationProp} from '@react-navigation/native';

import { useRoute } from "@react-navigation/native";
import strapi from '../../config/strapi';
import Button from 'components/ui/Button';
import UserContext from '../../context/GlobalContext';

const hostname = HOST;

type NCutType = {
    navigation: NavigationProp<any, any>;
};

async function getAreas(id:number) {
    return strapi.findOne('propostas', id, {
        fields: ['areas', 'valor']
    })
    .then((data: any) => {
        return data.data;
    })
    .catch(error => {
        console.log(error);
    });
}

function getFormattedValue(value:number) {
    let finalCost = String(value.toFixed(2)).replace('.', ',');
    finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
    return finalCost;
}

export default function NCut({navigation}: NCutType) {

    const [valores, setValores] = useState<{[key:number]:number}>({});
    const [sliders, setSliders] = useState<any[]>([]);
    const [valorAlocado, setValorAlocado] = useState(0);
    const [valorMaximo, setValorMaximo] = useState(0);
    const { userId, logarUsuario } = useContext(UserContext);

    const route:any = useRoute();

    let id = parseInt(route.params["id"]);

    function onSubmit() {
        console.log("Registrando voto do usuário: ", userId);
        console.log("Voto", valores);
        console.log("Id da Proposta", id);
        // registrar o voto
    }

    function valorColor(soma:number) {
        if (soma > valorMaximo) {
            return {
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'red',
            }
        } else {
            return {
                textAlign: 'center',
                fontSize: 20,
                fontWeight: 'bold',
                color: 'black',
            }
        }
    }

    useEffect(() => {
        let soma = 0;
        for (const key in valores) {
            soma += valores[key];
        }
        setValorAlocado(soma);
    }, [valores])

    useEffect(() => {
        getAreas(id)
            .then(data => {
                let sliders:Array<any> = [];
                //console.log(data);
                let areas = data.attributes.areas;
                let valor = data.attributes.valor;

                setValorAlocado(valor);
                setValorMaximo(valor);

                let valoresIniciais:{[key:number]:number} = {};

                let size = Object.keys(areas).length;
                for (const k in areas) {
                    valoresIniciais[parseInt(k)] = Math.floor(valor/size);
                    sliders.push(
                        <NCutSlider
                            id={parseInt(k)}
                            key={k}
                            area={areas[k]}
                            valorInicial={Math.floor(valor/size)}
                            valorMaximo={valor}
                            setValores={setValores}
                            valorMinimo={0}
                        />
                    );
                }
                setSliders(sliders);
                setValores(valoresIniciais);
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
                    <AppText style={styles.description}>Utilize os seletores abaixo ou as caixas de texto para especificar os valores que você deseja que sejam alocados para cada área.</AppText>
                    {sliders}
                </View>
                <Button style={styles.buttonStyle} clickFn={onSubmit}>
                    <AppText style={styles.buttonText}>Enviar Voto</AppText>
                </Button>
            </ScrollView>
            <View style={styles.navbar}>
                <AppText style={valorColor(valorAlocado)}>Valor Alocado: R$ {getFormattedValue(valorAlocado)}</AppText>
                <AppText style={styles.smallDescription}>Você possui R$ {getFormattedValue(valorMaximo - valorAlocado)} para alocar.</AppText>
            </View>
        </View>
    )
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
})