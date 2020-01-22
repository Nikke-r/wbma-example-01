/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const AsyncImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const source = props.source;

  const isLoaded = () => {
    setLoaded(true);
  };

  return (
    <View style={styles.container}>
      <Image style={props.style} source={source} onLoad={isLoaded}/>
      {!loaded &&
        <ActivityIndicator style={{position: 'absolute'}} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

AsyncImage.propTypes = {
  style: PropTypes.object,
  source: PropTypes.object,
};

export default AsyncImage;
