/* eslint-disable max-len */
import React, {useContext} from 'react';
import {FlatList} from 'react-native';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  console.log(loading);
  setMedia(data);
  return (
    <FlatList
      data={media}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={{paddingBottom: 10}}
      renderItem={({item}) => <ListItem singleMedia={item} navigation={props.navigation} />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
