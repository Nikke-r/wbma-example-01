/* eslint-disable max-len */
import React from 'react';
import {ListItem, Text, Button, Right, Left, Body, Thumbnail} from 'native-base';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItems = (props) => {
  return (
    <ListItem thumbnail>
      <Left>
        <Thumbnail square source={{uri: mediaUrl + props.singleMedia.thumbnails.w160}} />
      </Left>
      <Body>
        <Text numberOfLines={1}>{props.singleMedia.title}</Text>
        <Text numberOfLines={1}>{props.singleMedia.description}</Text>
      </Body>
      <Right>
        <Button onPress={
          () => {
            props.navigation.push('Single', {
              file: props.singleMedia,
            });
          }
        }>
          <Text>View</Text>
        </Button>
      </Right>
    </ListItem>
  );
};

ListItems.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

export default ListItems;
