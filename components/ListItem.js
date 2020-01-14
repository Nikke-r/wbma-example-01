/* eslint-disable max-len */
import React, {useState} from 'react';
import {Modal, TouchableOpacity, Image, View, Text, StyleSheet, Button} from 'react-native';
import PropTypes from 'prop-types';

const ListItem = (props) => {
  const [modalVisible, setVisibility] = useState(false);

  function toggleVisibility() {
    modalVisible ? setVisibility(false) : setVisibility(true);
  }

  return (
    <View>
      <Modal
        animationType='slide'
        transparent={false}
        visible={modalVisible}
      >
        <View style={style.modalStyle}>
          <Image style={{width: 300, height: 400}} source={{uri: props.singleMedia.filename}}/>
          <Button onPress={toggleVisibility} title='Close'/>
        </View>
      </Modal>
      <TouchableOpacity style={style.li} onPress={toggleVisibility}>
        <Image
          style={style.liContent}
          source={{uri: props.singleMedia.thumbnails.w160}}
        />
        <View style={style.liContent}>
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
  modalStyle: {
    top: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
