/* eslint-disable max-len */
import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import List from './components/List';
import {MediaProvider} from './contexts/MediaContext';

const App = () => {
  return (
    <MediaProvider>
      <View style={style.container}>
        <StatusBar barStyle={'dark-content'}/>
        <List />
      </View>
    </MediaProvider>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    top: 20,
  },
});

export default App;
