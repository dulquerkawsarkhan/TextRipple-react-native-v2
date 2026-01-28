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

const LineDivider =({lineStyle}:any)=>{

    return(

    <View 
   
        style={{
           height: 1,
           width:"100%",
           backgroundColor:COLORS.primary,
           ...lineStyle

    
    }}

    
    >
    
      

    </View>

    )



}

export default LineDivider;









