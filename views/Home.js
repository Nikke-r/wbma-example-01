import React from 'react';
import {Container} from 'native-base';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;

  return (
    <Container>
      <List navigation={navigation}/>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
