/* eslint-disable max-len */
import React from 'react';
import {TouchableOpacity, View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import AsyncImage from './AsyncImage';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  return (
    <View>
      <TouchableOpacity
        style={style.li}
        onPress={
          () => {
            props.navigation.push('Single', {
              img: props.singleMedia,
            });
          }
        }>
        <AsyncImage
          style={style.liImg}
          source={{uri: mediaUrl + props.singleMedia.thumbnails.w160}}
        />
        <View style={style.liText}>
          <Text style={style.liTitle}>{props.singleMedia.title}</Text>
          <Text>{props.singleMedia.description}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

ListItem.propTypes = {
  singleMedia: PropTypes.object,
  navigation: PropTypes.object,
};

const style = StyleSheet.create({
  li: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  liImg: {
    borderRadius: 100,
    height: 100,
    width: 100,
    margin: 10,
  },
  liText: {
    flex: 1,
    marginBottom: 10,
  },
  liTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    top: 10,
    marginBottom: 10,
  },
});

export default ListItem;
