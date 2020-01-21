/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, Image, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';

const AsyncImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const source = props.source;

  function isLoaded() {
    setLoaded(true);
  }

  return (
    <View>
      <Image style={props.style} source={source} onLoad={isLoaded}/>
      {!loaded &&
      <View>
        <ActivityIndicator size='small' color='#a9c1d6' />
      </View>
      }
    </View>
  );
};

AsyncImage.propTypes = {
  style: PropTypes.object,
  source: PropTypes.string,
};

export default AsyncImage;
