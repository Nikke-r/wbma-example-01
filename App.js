/* eslint-disable max-len */
import React from 'react';
import {StatusBar} from 'react-native';
import {MediaProvider} from './contexts/MediaContext';
import Navigator from './navigators/Navigator';

const App = () => {
  return (
    <MediaProvider>
      <StatusBar barStyle={'dark-content'} />
      <Navigator></Navigator>
    </MediaProvider>
  );
};

export default App;
