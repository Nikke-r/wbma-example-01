/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Content, Card, CardItem, Icon, Left, Body, Text, Button} from 'native-base';
import AsyncImage from '../components/AsyncImage';
import {fetchGET} from '../hooks/APIHooks';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = (props) => {
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState();
  const userToState = async () => {
    const userFromStorage = await AsyncStorage.getItem('user');
    setUser(JSON.parse(userFromStorage));
    const token = await AsyncStorage.getItem('userToken');
    const avatarByTag = await fetchGET('tags', 'avatar_' + user.user_id, token);
    setAvatar(avatarByTag);
  };

  useEffect(() => {
    userToState();
  }, []);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  return (
    <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Left>
              <Icon name='person' />
              <Body>
                <Text>Username: {user.username}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <AsyncImage style={{width: 350, height: 350, margin: 10}} source={{uri: mediaUrl + avatar[0].filename}} alt='No avatar found' />
          </CardItem>
          <CardItem>
            <Left>
              <Body>
                <Text>Fullname: {user.full_name}</Text>
                <Text>Email: {user.email}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem footer bordered>
            <Body>
              <Button full danger onPress={signOutAsync}>
                <Text>Logout</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
