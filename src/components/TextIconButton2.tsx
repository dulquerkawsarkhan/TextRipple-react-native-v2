import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity
} from 'react-native';
import { FONTS } from '../constants';

import React from 'react';

const TextIconButton2 = (

    { containerStyle, label, labelStyle, iconStyle, icon, onPress, iconPosition }: any) => {
    return (

        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                ...containerStyle

            }}
            onPress={onPress}

        >



            {iconPosition == "LEFT" &&
                <Image source={icon}
                    style={{
                        ...styles.image,
                        ...iconStyle,
                    }}
                />
            }

            <Text
                style={{
                    ...FONTS.body3,
                    ...labelStyle,
                }}
            >{label}


            </Text>

            {iconPosition == "RIGHT" &&
                <Image source={icon}
                    style={{
                        ...styles.image,
                        ...iconStyle,
                    }}
                />
            }






        </TouchableOpacity>

    )



}



const styles = StyleSheet.create({
    image: {
        marginLeft: 5,
        width: 20,
        height: 20,
        // tintColor:COLORS.black    

    }
})

export default TextIconButton2;









