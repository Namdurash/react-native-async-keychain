import React from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {StartScreen} from './src/screens';

const App = () => {
  return (
    <SafeAreaView style={styles.wrapper}>
      <StartScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
});

export default App;
