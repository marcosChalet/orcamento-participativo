import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

import Routes from './src/routes/Routes';
import {UserProvider} from './src/context/GlobalContext';

export default function App() {
  return (
    <UserProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
        <Routes />
      </SafeAreaView>
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
