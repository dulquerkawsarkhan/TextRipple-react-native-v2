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

const FormInputCheck =({value,error}:any)=>{
    return(

    <View 
   
        style={{
            justifyContent: 'center'

      
    
    }}

    
    >
        <Image 
            source={value=="" || (value !='' && error =='') ? icons.correct : icons.cancel}
            style ={{
                width:20,
                height:20,
                
            }}/>


    

    </View>

    )



}

export default FormInputCheck;









