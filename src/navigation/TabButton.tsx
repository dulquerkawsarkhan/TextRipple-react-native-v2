/* eslint-disable react-native/no-inline-styles */
import { useEffect, useRef } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { COLORS, SIZES } from '../constants';

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef<any>(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0.9, rotate: '0deg' },
        1: { scale: 1.2, rotate: '360deg' },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1.2, rotate: '360deg' },
        1: { scale: 1, rotate: '0deg' },
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      activeOpacity={1}
      style={styles.container}>
      <Animatable.View
        ref={viewRef}
        duration={1200}
        style={[styles.container, {
          elevation: 1,
        }]}
      >
        <Image
          source={focused ? item.activeIcon : item.inActiveIcon}
          style={{
            width: SIZES.responsiveScreenWidth(5.6),
            height: SIZES.responsiveScreenWidth(5.6),

            // borderRadius: 10,
            tintColor: focused ? COLORS.primary : COLORS.gray,
          }}
        />
      </Animatable.View>
    </TouchableOpacity>
  );
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor:COLORS.transparent
  },
});


export default TabButton;
