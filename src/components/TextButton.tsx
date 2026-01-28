import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES, constants, dummyData, icons } from '../constants';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import React from 'react';

const TextButton = ({
    label,
    labelStyle,
    buttonContainerStyle,
    onPress,
    disabled,
    label2 = '',
    label2Style

}: any) => {

    return (

        <TouchableOpacity
            style={{
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: COLORS.primary,
                ...buttonContainerStyle

            }}
            disabled={disabled}
            onPress={onPress}

        >

            <Text style={{
                color: COLORS.white,
                ...labelStyle,
             

            }}>
                {label}

            </Text>

            {label2 != "" &&
                <Text
                    style={{
                        flex: 1,
                        textAlign: 'right',
                        color: COLORS.white,
                        ...FONTS.h3,
                        ...label2Style
                    }}
                >
                    {label2}
                </Text>


            }



        </TouchableOpacity>

    )



}

export default TextButton;









