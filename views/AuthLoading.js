import React, {useEffect} from 'react';
import {ActivityIndicator, AsyncStorage, StatusBar, View} from 'react-native';
import {fetchGET} from '../hooks/APIHooks';

const bootstrapAsync = async (props) => {
  const getToken = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await fetchGET('users/user', '', userToken);
      props.navigation.navigate(response.message ? 'Auth' : 'App');
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getToken();
  }, []);
};

const AuthLoading = (props) => {
  bootstrapAsync(props);
  return (
    <View>
      <ActivityIndicator />
      <StatusBar barStyle="default" />
    </View>
  );
};

export default AuthLoading;
