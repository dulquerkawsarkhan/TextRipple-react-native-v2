import {COLORS, FONTS, SIZES, constants, dummyData, icons, images} from '../constants';
import {
    Text,
    TextInput,
    View,
} from 'react-native';

import React from 'react';

const FromInput = ({

containerStyle, 
label,
placeholder,
inputStyle, 
prependComponent,
appendComponent,
onChange,
secureTextEntry,
keyboardType = "default",
autoCompleteType = "off",
autoCapitalize = "none",
errorMsg = "",
value='',
maxLength

}:any) => {
    return (
        <View style ={{...containerStyle}}>

            {/* Label & Error msg */}
            <View style ={{

                flexDirection: 'row',
                justifyContent:'space-between'
            }}>
                <Text style ={{color:COLORS.gray,...FONTS.body4}}>
                    {label}
                </Text>

                <Text style ={{color:COLORS.red,...FONTS.body4}}>
                    {errorMsg}
                </Text>


            </View>

            {/* Text Input */}

            <View style ={{
                flexDirection:'row',
                height:55,
                paddingHorizontal:SIZES.padding,
                marginTop:SIZES.base,
                borderRadius:SIZES.radius,
                backgroundColor:COLORS.lightGray2

            }}>
                {prependComponent}

                <TextInput 
                    style = {{

                        flex: 1,
                        ...inputStyle
                    }} 
                    value ={value}
                    placeholder={placeholder}
                    placeholderTextColor ={COLORS.gray2}
                    secureTextEntry ={secureTextEntry}
                    keyboardType = {keyboardType}
                    autoCompleteType = {autoCompleteType}
                    autoCapitalize = {autoCapitalize}
                    maxLength = {maxLength}
                    onChangeText = {(text) => onChange(text)}

                />
                {appendComponent}

            </View>

        </View>
    )
}

export default FromInput;