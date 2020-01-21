import React from 'react';
import {View, StyleSheet} from 'react-native';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;

  return (
    <View style={styles.container}>
      <List navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
