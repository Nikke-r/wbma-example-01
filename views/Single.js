/* eslint-disable max-len */
import React, {useEffect, useState} from 'react';
import {AsyncStorage} from 'react-native';
import AsyncImage from '../components/AsyncImage';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';
import PropTypes from 'prop-types';
import {Container, Content, Card, CardItem, Text, Icon, Body, Button, Left} from 'native-base';
import {fetchGET, fetchPOST, fetchDEL} from '../hooks/APIHooks';
import {Video} from 'expo-av';

const Single = (props) => {
  const {navigation} = props;
  const file = navigation.getParam('file');
  const [username, setUsername] = useState();
  const [liked, setLiked] = useState();
  const [likeCount, setLikeCount] = useState();

  const getUsername = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetchGET('users', file.user_id, token);
      console.log(response);
      setUsername(response.username);
    } catch (error) {
      console.log(error.message);
    }
  };

  const like = async () => {
    try {
      const data = {
        file_id: file.file_id,
      };
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetchPOST('favourites', data, token);
      console.log('Like', response);
      await getLikes();
    } catch (error) {
      console.log(error.message);
    }
  };

  const dislike = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = {
        id: file.file_id,
      };

      const response = await fetchDEL('favourites/file/' + file.file_id, data, token);
      console.log('dislike', response);
      await getLikes();
    } catch (error) {
      console.log(error.message);
    }
  };

  const getLikes = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetchGET('favourites/file', file.file_id, token);
      const currentUser = await fetchGET('users/user', '', token);
      if (response.length === 0) {
        setLiked(false);
      }
      for (let i = 0; i < response.length; i++) {
        if (currentUser.user_id === response[i].user_id) {
          console.log('Getlike true');
          setLiked(true);
        } else {
          console.log('getlike false');
          setLiked(false);
        }
      }
      setLikeCount(response.length);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsername();
    getLikes();
  }, []);

  return (
    <Container>
      <Content>
        <Card>
          <CardItem cardBody>
            {file.media_type === 'image' ? <AsyncImage source={{uri: mediaUrl + file.filename}} style={{width: 350, height: 350, margin: 10}} /> : null}
            {file.media_type === 'video' ? <Video source={{uri: mediaUrl + file.filename}} style={{width: 350, height: 350, margin: 10}} shouldPlay /> : null}
          </CardItem>
          <CardItem>
            {!liked ? <Button success onPress={like}>
              <Text>Like</Text>
            </Button> :
            <Button danger onPress={dislike}>
              <Text>Dislike</Text>
            </Button>}
            <Left>
              {likeCount ? <Text>Likes: {likeCount}</Text> : <Text>Likes: 0</Text>}
            </Left>
          </CardItem>
          <CardItem>
            <Icon name='image'/>
            <Body>
              <Text>{file.title}</Text>
              <Text>{file.desc}</Text>
              <Text>By {username}</Text>
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
