/* eslint-disable max-len */
import React from 'react';
import {StyleSheet, View, Text, Button, AsyncStorage} from 'react-native';
import PropTypes from 'prop-types';
import FormTextInput from '../components/FormTextInput';
import useSignUpForm from '../hooks/LoginHooks';
import {login, register} from '../hooks/APIHooks';

const Login = (props) => { // props is needed for navigation
  const {handleUsernameChange, handleEmailChange, handlePasswordChange, inputs} = useSignUpForm();

  const signInAsync = async () => {
    try {
      const user = await login(inputs.username, inputs.password);
      await AsyncStorage.setItem('userToken', user.token);
      await AsyncStorage.setItem('username', user.user.username);
      await AsyncStorage.setItem('email', user.user.email);
      props.navigation.navigate('App');
    } catch (error) {
      console.log('Login error: ' + error.message);
    }
  };

  const registerAsync = async () => {
    try {
      await register(inputs.username, inputs.email, inputs.password);
      const loginUser = await login(inputs.username, inputs.password);
      await AsyncStorage.setItem('userToken', loginUser.token);
      props.navigation.navigate('App');
    } catch (error) {
      console.log('Register error: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Login</Text>
        <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
        <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
        <Button title="Sign in!" onPress={
          () => {
            signInAsync();
          }
        } />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.formTitle}>Register</Text>
        <FormTextInput autoCapitalize='none' placeholder='Username' value={inputs.username} onChangeText={handleUsernameChange} />
        <FormTextInput autoCapitalize='none' placeholder='Email' value={inputs.email} onChangeText={handleEmailChange} />
        <FormTextInput autoCapitalize='none' placeholder='Password' value={inputs.password} onChangeText={handlePasswordChange} secureTextEntry={true} />
        <Button title='Register' onPress={
          () => {
            registerAsync();
          }} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
  formContainer: {
    flex: 1,
    alignItems: 'center',
  },
  formTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
