/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants';

const TabButton = (props: any) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState?.selected ?? false;

  const scale = useSharedValue(1);
  const rotation = useSharedValue(0);

  useEffect(() => {
    if (focused) {
      scale.value = withSpring(1.2, { damping: 10, stiffness: 100 });
      rotation.value = withSpring(360, { damping: 10, stiffness: 100 });
    } else {
      scale.value = withSpring(1, { damping: 10, stiffness: 100 });
      rotation.value = withSpring(0, { damping: 10, stiffness: 100 });
    }
  }, [focused, scale, rotation]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { scale: scale.value },
        { rotate: `${rotation.value}deg` },
      ],
    };
  });

  return (
    <TouchableOpacity
      onPress={() => {
        onPress();
      }}
      activeOpacity={1}
      style={styles.container}>
      <Animated.View
        style={[styles.container, animatedStyle]}
      >
        <Image
          source={focused ? item.activeIcon : item.inActiveIcon}
          style={{
            width: SIZES.responsiveScreenWidth(5.6),
            height: SIZES.responsiveScreenWidth(5.6),
            tintColor: focused ? COLORS.primary : COLORS.gray,
          }}
        />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default TabButton;
