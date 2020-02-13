/* eslint-disable max-len */
import React from 'react';
import {Container, Form, Item, Button, Text} from 'native-base';
import PropTypes from 'prop-types';
import AsyncImage from '../components/AsyncImage';
import {Video} from 'expo-av';
import FormTextInput from '../components/FormTextInput';
import uploadHooks from '../hooks/UploadHooks';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const EditFile = (props) => {
  const {
    handleTitleChange,
    handleDescriptionChange,
    handleEdit,
    inputs,
  } = uploadHooks();
  const {navigation} = props;
  const file = navigation.getParam('file');

  return (
    <Container>
      {file.media_type === 'image' ? <AsyncImage source={{uri: mediaUrl + file.filename}} style={{width: 350, height: 350, margin: 10}} /> : null}
      {file.media_type === 'video' ? <Video source={{uri: mediaUrl + file.filename}} style={{width: 350, height: 350, margin: 10}} shouldPlay /> : null}
      <Form>
        <Item>
          <FormTextInput placeholder={file.title} value={inputs.title} onChangeText={handleTitleChange} />
        </Item>
        <Item>
          <FormTextInput placeholder={file.description} value={inputs.description} onChangeText={handleDescriptionChange} />
        </Item>
        <Button success onPress={() => handleEdit(file.file_id, props.navigation)}>
          <Text>Save Changes</Text>
        </Button>
      </Form>
    </Container>
  );
};

EditFile.propTypes = {
  navigation: PropTypes.object,
};

export default EditFile;
