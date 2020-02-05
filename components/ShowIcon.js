import React from 'react';
import {Icon, Text, ListItem} from 'native-base';
import PropTypes from 'prop-types';

const ShowIcon = (props) => {
  if (!props.value || props.value.length === 0) {
    return (
      null
    );
  } else if (props.error) {
    if (props.field === 'username') {
      return (
        <ListItem iconRight>
          <Text note> At least 3 characters </Text>
          <Icon name='close-circle-outline' />
        </ListItem>
      );
    } else if (props.field === 'email') {
      return (
        <ListItem iconRight>
          <Text note> Enter a valid email </Text>
          <Icon name='close-circle-outline' />
        </ListItem>
      );
    } else if (props.field === 'password') {
      return (
        <ListItem iconRight>
          <Text note> At least 5 characters </Text>
          <Icon name='close-circle-outline' />
        </ListItem>
      );
    } else if (props.field === 'retypePassword') {
      return (
        <ListItem iconRight>
          <Text note> Passwords dont match </Text>
          <Icon name='close-circle-outline' />
        </ListItem>
      );
    }
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
