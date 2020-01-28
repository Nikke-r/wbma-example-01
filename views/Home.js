import React from 'react';
import {Container, Content} from 'native-base';
import List from '../components/List';
import PropTypes from 'prop-types';

const Home = (props) => {
  const {navigation} = props;

  return (
    <Container>
      <Content>
        <List navigation={navigation}/>
      </Content>
    </Container>
  );
};

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
