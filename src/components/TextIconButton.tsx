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

const TextIconButton =(
    
    {containerStyle,label,labelStyle,iconStyle,icon,onPress}:any)=>{

    return(

    <TouchableOpacity 
        style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent:'center',
            backgroundColor:COLORS.primary,
            ... containerStyle 
    
    }}
    onPress={onPress}
    
    >

        <Text style ={{...FONTS.body3 ,...labelStyle}}>
            {label}

        </Text>
        <Image source={icon}
            style ={{
                marginLeft:5,
                width:SIZES.responsiveScreenWidth(3.4),
                height:SIZES.responsiveScreenWidth(3.4),
                tintColor:COLORS.black,
                ...iconStyle,
            }}
            />

    




    </TouchableOpacity>

    )



}




export default TextIconButton;









