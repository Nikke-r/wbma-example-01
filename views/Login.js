/* eslint-disable max-len */
import React, {useState} from 'react';
import {AsyncStorage} from 'react-native';
import {Container, Content, Button, Text, Header, Title, Body, Root, Form, ListItem, ListListItem, Icon} from 'native-base';
import ShowIcon from '../components/ShowIcon';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import {fetchPOST, fetchGET} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const Login = (props) => {
  const [form, setForm] = useState(true);
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
      await AsyncStorage.setListItem('userToken', user.token);
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

  const toggleForm = () => {
    form ? setForm(false) : setForm(true);
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
    <Root>
      <Container>
        <Header>
          <Body>
            <Title>
              MyApp
            </Title>
          </Body>
        </Header>
        <Content>
          {form ?
          <Form>
            <Title>
              Login
            </Title>
            <ListItem iconLeft>
              <Icon name='person' />
              <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
            </ListItem>
            <ListItem last iconLeft>
              <Icon name='lock' />
              <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
            </ListItem>
            <Button full onPress={signInAsync}>
              <Text>
                Sign in!
              </Text>
            </Button>
            <Button full transparent onPress={toggleForm}>
              <Text>
                Dont have an account? Register here!
              </Text>
            </Button>
          </Form> :
            <Form>
              <Title>Register</Title>
              <ListItem iconLeft>
                <Icon name='person' />
                <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} onEndEditing={checkUser} />
                {!userExists ? <ShowIcon value={inputs.username} error={inputs.usernameError} field='username'/> : <Text note>Username already taken</Text>}
              </ListItem>
              <ListItem>
                <Icon name='mail' />
                <FormTextInput autoCapitalize='none' placeholder='Email' value={inputs.email} onChangeText={handleEmailChange} />
                <ShowIcon value={inputs.email} error={inputs.emailError} field='email' />
              </ListItem>
              <ListItem>
                <Icon name='lock' />
                <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
                <ShowIcon value={inputs.password} error={inputs.passwordError} field='password' />
              </ListItem>
              <ListItem last>
                <Icon name='lock' />
                <FormTextInput autoCapitalize='none' placeholder='Retype password' value={inputs.retypePassword} onChangeText={handleRetypePasswordChange} secureTextEntry={true} />
                <ShowIcon value={inputs.retypePassword} error={inputs.retypePasswordError} field='retypePassword' />
              </ListItem>
              <Button full onPress={registerAsync}>
                <Text>
                  Register!
                </Text>
              </Button>
              <Button full transparent onPress={toggleForm}>
                <Text>
                  Already have an account? Login!
                </Text>
              </Button>
            </Form>}
        </Content>
      </Container>
    </Root>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
