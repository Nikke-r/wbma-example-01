/* eslint-disable max-len */
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Image, View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';

const mediaUrl = 'http://media.mw.metropolia.fi/wbma/uploads/';

const ListItem = (props) => {
  const [modalVisible, setVisibility] = useState(false);

  const toggleVisibility = () => {
    modalVisible ? setVisibility(false) : setVisibility(true);
  };

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
      >
        <View style={style.modalStyle}>
          <Image style={{width: 350, height: 450}} source={{uri: mediaUrl + props.singleMedia.filename}}/>
          <Button onPress={toggleVisibility} title='Close'/>
        </View>
      </Modal>
      <TouchableOpacity style={style.li} onPress={toggleVisibility}>
        <Image
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
};

const style = StyleSheet.create({
  li: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'silver',
    padding: 10,
    marginBottom: 5,
    borderRadius: 15,
  },
  liImg: {
    flex: 1,
    margin: 3,
    borderRadius: 15,
  },
  liText: {
    flex: 1,
    margin: 3,
  },
  liTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  modalStyle: {
    top: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
