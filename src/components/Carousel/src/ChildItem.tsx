/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, Image, StyleSheet} from 'react-native';

const ChildItemChildItem = ({
  item,
  style,
  onPress,
  index,
  imageKey,
  local,
  height,
}:any) => {

  return (
    <Pressable style={styles.container} onPress={() => onPress(index)}>
      <Image
        style={[styles.image, style, {height: height, borderRadius: 10}]}

        source={
          local ? item.image : {uri: `${item[imageKey]}`}
        }
        
      />
    </Pressable>
  );
};

export default  ChildItemChildItem

const styles = StyleSheet.create({
  container: {},
  image: {
    height: 230,
    resizeMode: 'stretch',
  },
});
