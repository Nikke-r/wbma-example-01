/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

const AsyncImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const source = props.source;

  const isLoaded = () => {
    setLoaded(true);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      <Image style={props.style} source={source} onLoad={isLoaded} alt={props.alt}/>
      {!loaded &&
        <ActivityIndicator style={{position: 'absolute'}} />
      }
    </View>
  );
};

AsyncImage.propTypes = {
  style: PropTypes.object,
  source: PropTypes.object,
  alt: PropTypes.string,
};

export default AsyncImage;
