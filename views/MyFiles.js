/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Container, List, Text, ListItem, Left, Thumbnail, Body, Right, Button, Icon, Spinner} from 'native-base';
import {fetchGET, fetchDEL} from '../hooks/APIHooks';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import {Alert} from 'react-native';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const MyFiles = (props) => {
  const [files, setFiles] = useState();

  const getFiles = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetchGET('media/user', '', token);
      setFiles(response);
    } catch (error) {
      console.log('getFiles error: ', error.message);
    }
  };

  const deleteFile = (fileID) => {
    Alert.alert(
        'Deleting a file!',
        'Are you sure you want to delete the file?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel')},
          {text: 'Delete', onPress: async () => {await fetchDEL(fileID); getFiles();}},
        ],
        {cancelable: true},
    );
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Container>
      {files ? <List
        dataArray={files}
        keyExtractor={(item, id) => id.toString()}
        renderRow={(item) => {
          return (
            <ListItem thumbnail>
              <Left>
                <Thumbnail square source={{uri: mediaUrl + item.filename}} />
              </Left>
              <Body>
                <Text>{item.title}</Text>
                <Text>{item.description}</Text>
              </Body>
              <Right style={{flexDirection: 'row'}}>
                <Button small transparent onPress={() => props.navigation.push('Single', {file: item})}>
                  <Text>
                    View
                  </Text>
                </Button>
                <Button small transparent icon onPress={() => props.navigation.push('EditFile', {file: item})}>
                  <Icon name='cog' />
                </Button>
                <Button small transparent icon onPress={() => deleteFile(item.file_id)}>
                  <Icon name='close-circle-outline' />
                </Button>
              </Right>
            </ListItem>
          );
        }}
      /> :
      <Spinner />}
    </Container>
  );
};

MyFiles.propTypes = {
  navigation: PropTypes.object,
};

export default MyFiles;
