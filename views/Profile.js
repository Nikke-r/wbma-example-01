import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, AsyncStorage, Button} from 'react-native';
import PropTypes from 'prop-types';

const Profile = (props) => {
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();

  const signOutAsync = async () => {
    await AsyncStorage.clear();
    props.navigation.navigate('Auth');
  };

  const getUserInfo = async () => {
    setUsername(await AsyncStorage.getItem('username'));
    setEmail(await AsyncStorage.getItem('email'));
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.profileTitle}>Profile</Text>
      <Text>{username}</Text>
      <Text>{email}</Text>
      <Button title='Logout' onPress={signOutAsync} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 40,
  },
  profileTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
