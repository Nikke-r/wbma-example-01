import React from 'react';
import {TouchableOpacity, Image, View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  return (
    <TouchableOpacity style={style.li}>
      <Image
        style={style.liContent}
        source={{uri: props.singleMedia.thumbnails.w160}}
      />
      <View style={style.liContent}>
        <Text style={style.liTitle}>{props.singleMedia.title}</Text>
        <Text>{props.singleMedia.description}</Text>
      </View>
    </TouchableOpacity>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
};

const style = StyleSheet.create({
  li: {
    flexDirection: 'row',
    backgroundColor: 'silver',
    padding: 10,
    marginBottom: 3,
  },
  liContent: {
    flex: 1,
    margin: 2.5,
  },
  liTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
});

export default ListItem;
