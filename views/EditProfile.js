/* eslint-disable max-len */
import React from 'react';
import {Container, Header, Body, Text, Content, Form, Item, Button, Label, Icon, View, Title} from 'native-base';
import FormTextInput from '../components/FormTextInput';
import PropTypes from 'prop-types';
import useSignUpForm from '../hooks/LoginHooks';
import {fetchPUT} from '../hooks/APIHooks';
import {AsyncStorage} from 'react-native';
import ShowIcon from '../components/ShowIcon';

const EditProfile = (props) =>{
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
          <Item first stackedLabel>
            <Label>Edit username</Label>
            <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
            <ShowIcon />
          </Item>
          <Item stackedLabel>
            <Label>Edit fullname</Label>
            <FormTextInput autoCapitalize='words' placeholder='Fullname' value={inputs.fullname} onChangeText={handleFullnameChange} />
          </Item>
          <Item stackedLabel>
            <Label>Edit email</Label>
            <FormTextInput autoCapitalize='none' placeholder='Email' value={inputs.email} onChangeText={handleEmailChange} />
          </Item>
          <Item stackedLabel>
            <Label>Edit Password</Label>
            <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
          </Item>
          <Item last>
            <FormTextInput autoCapitalize='none' placeholder='Retype password' value={inputs.retypePassword} onChangeText={handleRetypePasswordChange} secureTextEntry={true} />
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
