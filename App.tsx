import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';

// import Welcome from './src/pages/Welcome';
import Login from './src/pages/Login';

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#FFF" barStyle="dark-content" />
      <Login />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
