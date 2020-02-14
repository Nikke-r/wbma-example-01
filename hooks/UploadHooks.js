/* eslint-disable max-len */
import {useState, useContext} from 'react';
import {AsyncStorage} from 'react-native';
const mediaUrl = 'http://media.mw.metropolia.fi/wbma/media';
import validate from 'validate.js';
import {fetchGET, fetchPUT} from '../hooks/APIHooks';
import {MediaContext} from '../contexts/MediaContext';

const constraints = {
  title: {
    presence: true,
    length: {
      maximum: 80,
      message: 'Title can be only 80 chars long',
    },
  },
  description: {
    length: {
      maximum: 80,
      message: 'Title can be only 80 chars long',
    },
  },
};

const uploadHooks = (props) => {
  const [inputs, setInputs] = useState({});
  const [media, setMedia] = useContext(MediaContext);

  const handleTitleChange = (text) => {
    const error = validate({title: text}, {title: constraints.title});
    setInputs((inputs) => ({
      ...inputs,
      title: text,
      titleError: error,
    }));
  };

  const handleDescriptionChange = (text) => {
    const error = validate({description: text}, {description: constraints.description});
    setInputs((inputs) => ({
      ...inputs,
      description: text,
      descError: error,
    }));
  };

  const handleUpload = async (image, navigation) =>{
    try {
      const filename = image.uri.split('/').pop();
      const token = await AsyncStorage.getItem('userToken');
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : `image`;
      if (type === 'image/jpg') image.type = 'image/jpeg';
      const formData = new FormData();
      formData.append('title', inputs.title);
      formData.append('description', inputs.description);
      formData.append('file', {uri: image.uri, name: filename, type});
      const options = {
        method: 'POST',
        headers: {
          'x-access-token': token,
          'content-type': 'application/form-data',
        },
        body: formData,
      };
      const response = await fetch(mediaUrl, options);
      const responseJSON = await response.json();
      console.log(responseJSON);
      if (responseJSON.file_id) {
        const json = await fetchGET('media/all');
        const result = await Promise.all(json.files.map(async (item) => {
          return await fetchGET('media', item.file_id);
        }));
        setMedia(result);
        navigation.navigate('Home');
      }
    } catch (error) {
      console.log('Upload error: ', error.message);
    }
  };

  const handleEdit = async (mediaID, navigation) => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const data = {
        title: inputs.title,
        description: inputs.description,
      };
      const response = await fetchPUT('media/' + mediaID, data, token);
      console.log(response);
      navigation.pop();
    } catch (error) {
      console.log(error.message);
    }
  };

  return {
    handleTitleChange,
    handleDescriptionChange,
    handleUpload,
    handleEdit,
    inputs,
  };
};

export default uploadHooks;
