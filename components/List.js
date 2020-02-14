/* eslint-disable max-len */
import React, {useContext} from 'react';
import {List as BaseList, Spinner, Container} from 'native-base';
import ListItem from './ListItem';
import {MediaContext} from '../contexts/MediaContext';
import {getAllMedia} from '../hooks/APIHooks';
import PropTypes from 'prop-types';

const List = (props) => {
  const [media, setMedia] = useContext(MediaContext);
  const [data, loading] = getAllMedia();
  setMedia(data);
  return (
    <Container>
      {loading ? <Spinner /> :
          <BaseList
            dataArray={media}
            keyExtractor={(item, index) => index.toString()}
            renderRow={(item) => <ListItem singleMedia={item} navigation={props.navigation} />}
          />
      }
    </Container>
  );
};

List.propTypes = {
  navigation: PropTypes.object,
};

export default List;
