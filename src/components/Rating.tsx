import Animated,{useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {COLORS, FONTS, SIZES, constants, dummyData, icons} from '../constants';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import React from 'react';

const Rating =({
    rating,
    iconStyle,
    activeColor =COLORS.orange,
    inactiveColor = COLORS.lightOrange3



}:any)=>{

    return(

    <View 
        style={{
            flexDirection: 'row',
    }}
    >

        <Image 
        source={icons.star}
        style ={{
            tintColor: rating >= 1 ? activeColor : inactiveColor,
            ...styles.rateIcon,
            ...iconStyle
        }}
        />
    
      
        <Image 
        source={icons.star}
        style ={{
            tintColor: rating >= 2 ? activeColor : inactiveColor,
            ...styles.rateIcon,
            ...iconStyle
        }}
        />
    
      
        <Image 
        source={icons.star}
        style ={{
            tintColor: rating >= 3 ? activeColor : inactiveColor,
            ...styles.rateIcon,
            ...iconStyle
        }}
        />
    
      
        <Image 
        source={icons.star}
        style ={{
            tintColor: rating >= 4 ? activeColor : inactiveColor,
            ...styles.rateIcon,
            ...iconStyle
        }}
        />
    
            
        <Image 
        source={icons.star}
        style ={{
            tintColor: rating >= 5 ? activeColor : inactiveColor,
            ...styles.rateIcon,
            ...iconStyle
        }}
        />
    
      



    </View>

    )

}


const styles = StyleSheet.create({
    rateIcon: {
        height:15,
        width:15
    }
})

export default Rating;









