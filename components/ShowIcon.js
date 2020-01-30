import React from 'react';
import {Icon, Toast} from 'native-base';
import PropTypes from 'prop-types';

const ShowIcon = (props) => {
  if (!props.value || props.value.length === 0) {
    return (
      null
    );
  } else if (props.error) {
    return (
      <Icon name='close-circle-outline' onPress={() => Toast.show({
        text: props.error.message,
        buttonText: 'Ok',
        duration: 5000,
        position: 'top',
      })} />
    );
  } else {
    return (
      <Icon name='checkmark-circle-outline' />
    );
  }
};

ShowIcon.propTypes = {
  value: PropTypes.string,
  error: PropTypes.object,
  field: PropTypes.string,
};

export default ShowIcon;
