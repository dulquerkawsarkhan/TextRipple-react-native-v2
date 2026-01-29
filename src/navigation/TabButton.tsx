import { useNavigationState } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS, SIZES } from '../constants';

const TabButton = (props: any) => {
  const { item, onPress } = props;

  // Use navigation state to determine focus if props don't provide it reliably
  const currentRouteName = useNavigationState(state => state?.routes[state.index]?.name);
  const focused = currentRouteName === item.route;

  const progress = useSharedValue(0);
  useEffect(() => {
    if (focused) {
      progress.value = withTiming(1, { duration: 500 });
    } else {
      progress.value = withTiming(0, { duration: 200 });
    }
  }, [focused, progress]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [1, 1.2]);
    const rotate = interpolate(progress.value, [0, 1], [0, 360]);

    return {
      transform: [
        { scale },
        { rotate: `${rotate}deg` },
      ],
    };
  });

  const animatedBubbleStyle = useAnimatedStyle(() => {
    const scale = interpolate(progress.value, [0, 1], [0, 1]);
    const opacity = interpolate(progress.value, [0, 1], [0, 1]);

    return {
      transform: [{ scale }],
      opacity,
    };
  });

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={styles.container}>
      <View style={styles.btnContainer}>
        <Animated.View
          style={[styles.bubble, animatedBubbleStyle]}
        />
        <Animated.View style={animatedIconStyle}>
          <Image
            source={focused ? item.activeIcon : item.inActiveIcon}
            style={{
              width: SIZES.responsiveScreenWidth(6),
              height: SIZES.responsiveScreenWidth(6),
              tintColor: focused ? COLORS.primary : COLORS.gray,
            }}
          />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnContainer: {
    marginTop: SIZES.responsiveScreenHeight(1.5),
    width: SIZES.responsiveScreenWidth(9),
    height: SIZES.responsiveScreenWidth(9),
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 25,
  },
});

export default TabButton;
