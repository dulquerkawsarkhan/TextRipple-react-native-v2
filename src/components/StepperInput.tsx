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

import IconButton from './IconButton'
import React from 'react';

const StepperInput =({

    containerStyle,
    value =1,
    onAdd,
    onMinus
    


}:any)=>{

    return(

    <View 
   
        style={{
            flexDirection: 'row',
            alignItems:'center',
            justifyContent:'space-between',
            height:60,
            width:130,
            backgroundColor:COLORS.lightGray2,
            borderRadius:SIZES.radius,
            ...containerStyle,

    }}

    
    >

        <IconButton
            containerStyle ={{
                width:45,
                alignItems: "center",
                justifyContent: "center",
            }}
            icon ={icons.minus}
            iconStyle ={{
                height:20,
                width:20,
                tintColor: value >1 ? COLORS.white : COLORS.lightGray1
            }}

            onPress ={onMinus}
        
        
        />
        <View
        style ={{
            alignItems:'center',
            justifyContent: 'center'}}>
            <Text style={{
                fontSize:16,
                color:COLORS.white,
                fontWeight:'600'
                
                }}>
                {value}


            </Text>

        </View>


            <IconButton
            containerStyle ={{
                width:50,
                alignItems: "center",
                justifyContent: "center",
            }}
            icon ={icons.plus}
            iconStyle ={{
                height:19,
                width:19,
                tintColor:  COLORS.white 
            }}

            onPress ={onAdd}
        
        
        />
    
      

    </View>

    )



}

export default StepperInput;









