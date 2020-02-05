/* eslint-disable max-len */
import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Button, Text, Title, Form, Item, Icon} from 'native-base';
import ShowIcon from '../components/ShowIcon';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import {fetchPOST, fetchGET} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const RegisterForm = (props) => {
  const [userExists, setUserExists] = useState(false);
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleRetypePasswordChange,
    handleEmailChange,
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

  const registerAsync = async () => {
    try {
      const result = await fetchPOST('users', inputs);
      console.log('register', result);
      signInAsync();
    } catch (e) {
      console.log('registerAsync error: ', e.message);
    }
  };

  const checkUser = async (event) => {
    const user = event.nativeEvent.text;
    const response = await fetchGET('users/username', user);
    if (response.available === false) {
      setUserExists(true);
    } else if (response.available === true) {
      setUserExists(false);
    }
  };

  return (
    <Form>
      <Title>Register</Title>
      <Item iconLeft>
        <Icon name='person' />
        <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} onEndEditing={checkUser} />
        {!userExists ? <ShowIcon value={inputs.username} error={inputs.usernameError} field='username'/> : <Text note>Username already taken</Text>}
      </Item>
      <Item iconLeft>
        <Icon name='mail' />
        <FormTextInput autoCapitalize='none' placeholder='Email' value={inputs.email} onChangeText={handleEmailChange} />
        <ShowIcon value={inputs.email} error={inputs.emailError} field='email' />
      </Item>
      <Item iconLeft>
        <Icon name='lock' />
        <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
        <ShowIcon value={inputs.password} error={inputs.passwordError} field='password' />
      </Item >
      <Item last iconLeft>
        <Icon name='lock' />
        <FormTextInput autoCapitalize='none' placeholder='Retype password' value={inputs.retypePassword} onChangeText={handleRetypePasswordChange} secureTextEntry={true} />
        <ShowIcon value={inputs.retypePassword} error={inputs.retypePasswordError} field='retypePassword' />
      </Item>
      <Button full onPress={registerAsync}>
        <Text>
          Register!
        </Text>
      </Button>
    </Form>
  );
};

RegisterForm.propTypes = {
  navigation: PropTypes.object,
};

export default RegisterForm;
