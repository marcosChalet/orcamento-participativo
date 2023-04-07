import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Welcome from './src/pages/Welcome';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <Welcome />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
