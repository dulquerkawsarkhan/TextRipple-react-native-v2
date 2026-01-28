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

const Header =({
    containerStyle,
    title,
    titleStyle,
    leftComponent,
    rightComponent,



}:any)=>{

    return(

       <View 
            style ={{
                height:45,
                flexDirection:'row',
                ...containerStyle,

        }}>
            {
                leftComponent
            }

            <View
                style ={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Text style ={{
                    ...FONTS.h3,
                    ...titleStyle
                }}>{title}</Text>

            </View>
            {
                rightComponent
            }

        </View>

   




    )



}

export default Header;









