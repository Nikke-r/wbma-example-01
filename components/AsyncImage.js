/* eslint-disable max-len */
import React, {useState} from 'react';
import {View, Image, ActivityIndicator, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const AsyncImage = (props) => {
  const [loaded, setLoaded] = useState(false);
  const source = props.source;

  function isLoading() {
    setTimeout(() => {
      setLoaded(true);
    }, 1000);
  }

  return (
    <View style={styles.container}>
      <Image style={props.style} source={source} onLoad={isLoading}/>
      {!loaded &&
        <ActivityIndicator />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AsyncImage.propTypes = {
  style: PropTypes.object,
  source: PropTypes.object,
};

export default AsyncImage;
