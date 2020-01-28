/* eslint-disable max-len */
import React from 'react';
import AsyncImage from '../components/AsyncImage';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
import PropTypes from 'prop-types';
import {Container, Content, Card, CardItem, Text, Icon, Body} from 'native-base';

const Single = (props) => {
  const {navigation} = props;
  const filename = navigation.getParam('img', 'No picture found!').filename;
  const title = navigation.getParam('img', 'No title found!').title;
  const desc = navigation.getParam('img', 'No Description found!').description;
  const userId = navigation.getParam('img', 'Unknown').user_id;

  return (
    <Container>
      <Content>
        <Card>
          <CardItem cardBody>
            <AsyncImage source={{uri: mediaUrl + filename}} style={{width: 350, height: 350, margin: 10}} />
          </CardItem>
          <CardItem>
            <Icon name='image'/>
            <Body>
              <Text>{title}</Text>
              <Text>{desc}</Text>
              <Text>By {userId}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Single.propTypes = {
  navigation: PropTypes.object,
};

export default Single;
