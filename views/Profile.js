/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {Container, Content, Card, CardItem, Icon, Left, Body, Text, Button, Right, ListItem} from 'native-base';
import AsyncImage from '../components/AsyncImage';
import {fetchGET} from '../hooks/APIHooks';
const mediaURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

const Profile = (props) => {
  const [user, setUser] = useState({
    userInfo: {},
    avatar: '',
  });

  const userToState = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userData = await fetchGET('users/user', '', token);
      const avatarFile = await fetchGET('tags', 'avatar_' + userData.user_id);
      setUser((user) => ({
        userInfo: userData,
        avatar: avatarFile[0].filename,
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    userToState();
  }, []);

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  const showEdit = () => {
    props.navigation.navigate('Edit');
  };

  return (
    <Container>
      <Content>
        <Card>
          <CardItem header bordered>
            <Left>
              <Icon name='person' />
              <Body>
                <Text>Username: {user.userInfo.username}</Text>
              </Body>
            </Left>
            <Right>
              <Button onPress={showEdit}>
                <Text>Edit account</Text>
              </Button>
            </Right>
          </CardItem>
          <CardItem cardBody>
            <AsyncImage style={{width: 350, height: 350, margin: 10}} source={{uri: mediaURL + user.avatar}} alt='No avatar found' />
          </CardItem>
          <ListItem iconLeft>
            <Icon name='person' />
            <Text> {user.userInfo.full_name} </Text>
          </ListItem>
          <ListItem iconLeft>
            <Icon name='mail' />
            <Text> {user.userInfo.email} </Text>
          </ListItem>
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
