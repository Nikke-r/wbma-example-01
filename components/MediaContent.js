/* eslint-disable max-len */
import React from 'react';
import {Video} from 'expo-av';
import {Image} from 'react-native';

const MediaContent = (props) => {
  if (props.file.type === 'image') {
    return (
      <Image source={{uri: props.file.uri}} style={{width: '100%', height: 350}} />
    );
  } else if (props.file.type === 'video') {
    return (
      <Video source={{uri: props.file.uri}} style={{width: '100%', height: 350}} shouldPlay />
    );
  }
};

export default MediaContent;
