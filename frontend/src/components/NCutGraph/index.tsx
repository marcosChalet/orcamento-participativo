import React, { useEffect, useState } from 'react';

import {StyleSheet, View} from 'react-native';
import AppText from 'components/ui/AppText';

type NCutGraphType = {
    areas:string[];
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
        for (let i = 0; i < props.areas.length; i++) {
            if (props.values[i] > max) {
                max = props.values[i];
                sum += props.values[i];
            }
        }

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

        results.push(
            <AppText style={styles.totalText}>TOTAL: R$ {getFormattedValue(sum)}</AppText>
        )

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