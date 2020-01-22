import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import AsyncImage from '../components/AsyncImage';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
import PropTypes from 'prop-types';

const Single = (props) => {
  const {navigation} = props;
  const filename = navigation.getParam('img', 'No picture found!').filename;
  const title = navigation.getParam('img', 'No title found!').title;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <AsyncImage style={styles.image} source={{uri: mediaUrl + filename}} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
  },
  image: {
    width: 350,
    height: 450,
  },
  text: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

Single.propTypes = {
  navigation: PropTypes.object,
};

export default Single;
