import React from 'react';
import {StyleSheet, TextInput} from 'react-native';
import PropTypes from 'prop-types';


const FormTextInput = (props) => {
  const {style, ...otherProps} = props;
  return (
    <TextInput
      style={[styles.textInput, style]}
      {...otherProps}
    />
  );
};

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    margin: 5,
    width: 150,
  },
});

FormTextInput.propTypes = {
  style: PropTypes.object,
};

export default FormTextInput;
