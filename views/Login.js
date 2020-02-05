/* eslint-disable max-len */
import React, {useState} from 'react';
import {Container, Content, Button, Text, Header, Title, Body} from 'native-base';
import PropTypes from 'prop-types';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const Login = (props) => {
  const [form, setForm] = useState(true);

  const toggleForm = () => {
    form ? setForm(false) : setForm(true);
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
      {form ?
          <Content>
            <LoginForm navigation={props.navigation} />
            <Button full transparent onPress={toggleForm}>
              <Text>
                Dont have an account? Register here!
              </Text>
            </Button>
          </Content> :
          <Content>
            <RegisterForm navigation={props.navigation} />
            <Button full transparent onPress={toggleForm}>
              <Text>
                Already have an account? Login!
              </Text>
            </Button>
          </Content>}
    </Container>
  );
};

Login.propTypes = {
  navigation: PropTypes.object,
};

export default Login;
