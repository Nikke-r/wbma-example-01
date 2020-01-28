/* eslint-disable max-len */
import React, {useContext} from 'react';
import {List as BaseList} from 'native-base';
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
    <BaseList
      dataArray={media}
      keyExtractor={(item, index) => index.toString()}
      renderRow={(item) => <ListItem singleMedia={item} navigation={props.navigation} />}
    />
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
