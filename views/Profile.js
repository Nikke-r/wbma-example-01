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
      <Text style={styles.username}>{username}</Text>
      <Text style={styles.email}>{email}</Text>
      <View>
        <Button title='Logout' onPress={signOutAsync} />
      </View>
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
  username: {
    fontSize: 20,
    paddingTop: 20,
  },
  email: {
    paddingTop: 20,
    fontSize: 20,
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
