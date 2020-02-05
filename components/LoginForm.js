/* eslint-disable max-len */
import React from 'react';
import {AsyncStorage} from 'react-native';
import {Form, Title, Item, Icon, Button, Text} from 'native-base';
import FormTextInput from './FormTextInput';
import {fetchPOST} from '../hooks/APIHooks';
import useSignUpForm from '../hooks/LoginHooks';
import PropTypes from 'prop-types';

const LoginForm = (props) => {
  const {
    handleUsernameChange,
    handlePasswordChange,
    inputs,
  } = useSignUpForm();

  const signInAsync = async () => {
    try {
      console.log(inputs);
      const user = await fetchPOST('login', inputs);
      await AsyncStorage.setItem('userToken', user.token);
      props.navigation.navigate('App');
    } catch (e) {
      console.log('signInAsync error: ' + e.message);
    }
  };

  return (
    <Form>
      <Title>
        Login
      </Title>
      <Item iconLeft>
        <Icon name='person' />
        <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
      </Item >
      <Item last iconLeft>
        <Icon name='lock' />
        <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
      </Item>
      <Button full onPress={signInAsync}>
        <Text>
          Sign in!
        </Text>
      </Button>
    </Form>
  );
};

LoginForm.propTypes = {
  navigation: PropTypes.object,
};

export default LoginForm;
