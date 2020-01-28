/* eslint-disable max-len */
import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import {Container, Content, Form, Item, Button, Text, Header, Title, Body} from 'native-base';
import useSignUpForm from '../hooks/LoginHooks';
import {fetchPOST} from '../hooks/APIHooks';

const Login = (props) => { // props is needed for navigation
  const [error, setError] = useState('');
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleEmailChange,
    inputs,
  } = useSignUpForm();

  const signInAsync = async () => {
    try {
      const user = await fetchPOST('login', inputs);
      console.log('Login', user);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('user', JSON.stringify(user.user));
      props.navigation.navigate('App');
    } catch (e) {
      console.log('signInAsync error: ' + e.message);
      setError(e.message);
    }
  };

  const registerAsync = async () => {
    try {
      const result = await fetchPOST('users', inputs);
      console.log('register', result);
      signInAsync();
    } catch (e) {
      console.log('registerAsync error: ', e.message);
      setError(e.message);
    }
  };

  return (
    <Container>
      <Header>
        <Body>
          <Title>
            MyApp
          </Title>
        </Body>
      </Header>
      <Content>
        <Form>
          <Title>
            Login
          </Title>
          <Item>
            <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
          </Item>
          <Item last>
            <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
          </Item>
          <Button full onPress={signInAsync}>
            <Text>
              Sign in!
            </Text>
          </Button>
        </Form>
        <Form>
          <Title>Register</Title>
          <Item>
            <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
          </Item>
          <Item>
            <FormTextInput autoCapitalize='none' placeholder='Email' value={inputs.email} onChangeText={handleEmailChange} />
          </Item>
          <Item last>
            <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
          </Item>
          <Button full onPress={registerAsync}>
            <Text>
              Register!
            </Text>
          </Button>
        </Form>
      </Content>
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
