/* eslint-disable max-len */
import React, {useState, useEffect} from 'react';
import {Image} from 'react-native';
import {Text, Form, Item, Button, Content} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import uploadHooks from '../hooks/UploadHooks';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';

const Upload = (props) => {
  const [image, setImage] = useState(null);
  const {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    inputs,
  } = uploadHooks();

  const getPermissionsAsync = async () =>{
    if (Constants.platform.ios) {
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  };

  useEffect(() => {
    getPermissionsAsync();
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result);
    }
  };

  const resetForm = () => {
    setImage(null);
    inputs.description = '';
    inputs.title = '';
  };

  return (
    <Content>
      {image ? <Image source={{uri: image.uri}} style={{width: '100%', height: 350}} /> : null}
      <Form>
        <Item>
          <FormTextInput placeholder='Title' value={inputs.title} onChangeText={handleTitleChange} />
        </Item>
        <Item>
          <FormTextInput placeholder='Description' value={inputs.description} onChangeText={handleDescriptionChange} />
        </Item>
        <Button full onPress={pickImage}>
          <Text>
            Select a file
          </Text>
        </Button>
        <Button full success onPress={() => {
          handleUpload(image, props.navigation);
          resetForm();
        }}>
          <Text>
            Upload
          </Text>
        </Button>
        <Button full danger onPress={resetForm}>
          <Text>
            Reset
          </Text>
        </Button>
      </Form>
    </Content>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
