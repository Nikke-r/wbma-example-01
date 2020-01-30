/* eslint-disable max-len */
import {useState} from 'react';
import validate from 'validate.js';

const constraints = {
  email: {
    presence: true,
    email: {
      message: 'Please enter a valid email',
    },
  },
  password: {
    presence: true,
    length: {
      minimum: 5,
      message: 'Your password must be at least five (5) characters long',
    },
  },
  confirmPassword: {
    equality: 'password',
  },
  username: {
    presence: true,
    length: {
      minimum: 3,
      message: 'Your username must be at least three (3) characters long',
    },
  },
};

const useSignUpForm = () => {
  const [inputs, setInputs] = useState({});
  const handleUsernameChange = (text) => {
    const error = validate({username: text}, {username: constraints.username});
    setInputs((inputs) =>
      ({
        ...inputs,
        username: text,
        usernameError: error,
      }));
  };
  const handlePasswordChange = (text) => {
    const error = validate({password: text}, {password: constraints.password});
    setInputs((inputs) =>
      ({
        ...inputs,
        password: text,
        passwordError: error,
      }));
  };
  const handleRetypePasswordChange = (text) => {
    const error = validate({password: inputs.password, confirmPassword: text}, {confirmPassword: constraints.confirmPassword});
    setInputs((inputs) =>
      ({
        ...inputs,
        retypePassword: text,
        retypePasswordError: error,
      }));
  };
  const handleEmailChange = (text) => {
    const error = validate({email: text}, {email: constraints.email});
    setInputs((inputs) =>
      ({
        ...inputs,
        email: text,
        emailError: error,
      }));
    console.log(error);
  };
  const handleFullnameChange = (text) => {
    setInputs((inputs) =>
      ({
        ...inputs,
        full_name: text,
      }));
  };

  return {
    handleUsernameChange,
    handleEmailChange,
    handlePasswordChange,
    handleRetypePasswordChange,
    handleFullnameChange,
    inputs,
  };
};

export default useSignUpForm;
