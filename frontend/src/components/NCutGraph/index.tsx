import React, { useEffect, useState } from 'react';

import {StyleSheet, View} from 'react-native';
import AppText from 'components/ui/AppText';

type NCutGraphType = {
    areas:string[];
    type:"YES-NO" | "N-CUT";
    values:{[key:number]:number};
};

function getFormattedValue(value: number) {
    let finalCost = String(value.toFixed(2)).replace('.', ',');
    finalCost = finalCost.replace(/\d{1,3}(?=(\d{3})+(?!\d))/g, '$&.');
    return finalCost;
}

export default function NCutGraph(props:NCutGraphType) {
    const [items, setItem] = useState<any[]>([]);

    useEffect(() => {
        let max = -1;
        let sum = 0;
        let results:any[] = [];
        if (props.type == "N-CUT") {
            for (let i = 0; i < props.areas.length; i++) {
                if (props.values[i] > max) {
                    max = props.values[i];
                    sum += props.values[i];
                }
            }
        } else if (props.type == "YES-NO") {
            for (const key in props.values) {
                if (props.values[key] > max) {
                    max = props.values[key];
                    sum += 1;
                }
            }
        }

        if (props.type == "N-CUT") {
            for (let i = 0; i < props.areas.length; i++) {

                    results.push(
                        <View key={i} style={styles.container}>
                            <AppText style={styles.areaText}>{props.areas[i].toUpperCase()}</AppText>
                            <View style={styles.container}>
                                <View style={{
                                    height: 25,
                                    width: `${100*props.values[i]/max}%`,
                                    backgroundColor: '#532B1D',
                                    borderRadius: 5,
                                    flex: 1,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <AppText style={styles.valueText}>R$ {getFormattedValue(props.values[i])}</AppText>
                                </View>
                            </View>
                        </View>
                    )
                }
             } else if (props.type == "YES-NO") {
                let i = 0;
                for (const key in props.values) {
                    results.push(
                        <View key={key} style={styles.container}>
                            <AppText style={styles.areaText}>{props.areas[i].toUpperCase()}</AppText>
                            <View style={styles.container}>
                                <View style={{
                                    height: 25,
                                    width: `${100*props.values[key]/max}%`,
                                    backgroundColor: '#532B1D',
                                    borderRadius: 5,
                                    flex: 1,
                                    alignContent: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <AppText style={styles.valueText}>{props.values[key]}</AppText>
                                </View>
                            </View>
                        </View>
                    )
                    i += 1;
                }
            }

        results.push(
            <View
                style={{
                borderBottomColor: '#CAC8C7',
                borderBottomWidth: StyleSheet.hairlineWidth,
                marginBottom: 10,
                marginTop: 10,
                }}
            />
        )


        if (props.type == "N-CUT") {
            results.push(
                <AppText style={styles.totalText}>TOTAL: R$ {getFormattedValue(sum)}</AppText>
            )
        } else if (props.type == "YES-NO") {
            results.push(
                <AppText style={styles.totalText}>VOTOS: {sum}</AppText>
            )
        }

        setItem(results);
    }, []);

    return (
        <View style={styles.container}>
            {items}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
    },
    areaText: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 10,
    },
    totalText: {
        fontWeight: 'bold',
        fontSize: 12,
        marginTop: 10,
        textAlign: 'center',
    },
    valueText: {
        fontSize: 10,
        color: 'white',
        marginLeft: 5,
    }
})