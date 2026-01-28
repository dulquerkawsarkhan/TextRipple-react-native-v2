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

const CartQuantityButton =({containerStyle,iconStyle,onPress,quantity}:any)=>{

    return(

    <TouchableOpacity 
  
        style={{
            width:40,
            height:40,
            alignItems:'center',
            justifyContent:'center',
            borderRadius:SIZES.radius,
            backgroundColor:COLORS.lightOrange2,    
            ... containerStyle 
    
            }}
        onPress={onPress}
    
    >
        <Image 
            source={icons.cart}
            style ={{
                width:30,
                height:30,
                tintColor:COLORS.black,
                ...iconStyle
            }}/>

            <View style ={{
                position: 'absolute',
                top:5,
                right:5,
                height:15,
                width:15,
                alignItems:'center',
                justifyContent:'center',
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.primary
            }}>

                <Text

                    style ={{
                        color: COLORS.white,
                        ...FONTS.body5,
                        fontSize:10,
                        marginTop:-2
                    }}
                
                >
                    3
                </Text>
            </View>

   

    

    </TouchableOpacity>

    )



}

export default CartQuantityButton;









