import React, { useState } from 'react';

import {StyleSheet, View} from 'react-native';
import {Slider} from '@miblanchard/react-native-slider';
import AppText from 'components/ui/AppText';

export default function NCut() {
    const [value, setValue] = useState(0.2);

    return (
        <View style={styles.container}>
            <AppText>N-Cut</AppText>
            <Slider
                value={value}
                onValueChange={(value) => {
                    setValue(value[0]);
                }}
                step={1}
                minimumValue={0}
                maximumValue={100}
            />
            <AppText>{value}</AppText>
        </View>
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
})