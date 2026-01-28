import Animated,{useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {COLORS, FONTS, SIZES, constants, dummyData, icons} from '../constants';
import {
    FlatList,
    Image,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import React from 'react';

const IconButton =({containerStyle,iconStyle,icon,onPress}:any)=>{

    return(

    <TouchableOpacity 
    kay={icon}
        style={{
    
            ... containerStyle 
    
    }}
    onPress={onPress}
    
    >
        <Image 
            source={icon}
            style ={{
                width:30,
                height:30,
                tintColor:COLORS.white,
                ...iconStyle
            }}/>


    










    </TouchableOpacity>

    )



}

export default IconButton;









