/* eslint-disable max-len */
import React, {useState} from 'react';
import {Container, Header, Body, Text, Content, Form, Item, Button, Label, Icon, View, Title} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/LoginHooks';
import {fetchPUT, fetchGET} from '../hooks/APIHooks';
import {AsyncStorage} from 'react-native';
import ShowIcon from '../components/ShowIcon';

const EditProfile = (props) =>{
  const [userExists, setUserExists] = useState(false);
  const {
    handleUsernameChange,
    handlePasswordChange,
    handleRetypePasswordChange,
    handleFullnameChange,
    handleEmailChange,
    inputs,
  } = useSignUpForm();

  const editAsync = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      await fetchPUT('users', inputs, token);
      props.navigation.navigate('Profile');
    } catch (error) {
      console.log(error);
    }
  };

  const showProfile = () => {
    props.navigation.navigate('Profile');
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
    <Container>
      <Header>
        <Body>
          <Text>Edit profile</Text>
        </Body>
      </Header>
      <Content style={{marginTop: 20}}>
        <Title>All fields are optional</Title>
        <Form>
          <Item first iconLeft>
            <Icon name='person' />
            <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} onEndEditing={checkUser}/>
            {!userExists ? <ShowIcon value={inputs.username} error={inputs.usernameError} field='username'/> : <Text note>Username already taken</Text>}
          </Item>
          <Item iconLeft>
            <Icon name='person' />
            <FormTextInput autoCapitalize='words' placeholder='Fullname' value={inputs.fullname} onChangeText={handleFullnameChange} />
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
          </Item>
          <Item last iconLeft>
            <Icon name='lock' />
            <FormTextInput autoCapitalize='none' placeholder='Retype password' value={inputs.retypePassword} onChangeText={handleRetypePasswordChange} secureTextEntry={true} />
            <ShowIcon value={inputs.retypePassword} error={inputs.retypePasswordError} field='retypePassword' />
          </Item>
        </Form>
        <View style={{flexDirection: 'row', justifyContent: 'center', marginTop: 30}}>
          <Button style={{margin: 10}} success iconLeft onPress={editAsync}>
            <Icon name='checkmark' />
            <Text>Submit</Text>
          </Button>
          <Button style={{margin: 10}} danger onPress={showProfile} iconLeft>
            <Icon name='close' />
            <Text>Cancel</Text>
          </Button>
        </View>
      </Content>
    </Container>
  );
};

EditProfile.propTypes = {
  navigation: PropTypes.object,
};

export default EditProfile;
