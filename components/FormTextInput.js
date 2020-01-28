import React from 'react';
import {Input} from 'native-base';


const FormTextInput = (props) => {
  const {...otherProps} = props;
  return (
    <Input
      {...otherProps}
    />
  );
};

export default FormTextInput;
