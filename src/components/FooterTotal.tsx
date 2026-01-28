import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES, constants, dummyData, icons } from '../constants';
import {
    FlatList,
    Image,
    Platform,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import LineDivider from './LineDivider'
import LinearGradient from 'react-native-linear-gradient';
import React from 'react';
import TextButton from './TextButton'

const FooterTotal = ({
    subTotal,
    shippingFee,
    total,
    onPress

}: any) => {

    return (
        <>




            <View style={{
                alignItems: 'center',
                backgroundColor: COLORS.lightGray2,
                elevation: 0.2,
                borderRadius: 10,
                marginTop: 25,
                marginBottom:80


            }}>
                {/* subtotal */}




                <View
                    style={{
                        flexDirection: 'row',
                        width: '97%',
                        justifyContent: 'space-between',
                        marginTop:4
                        

                    }}>
                    <Text
                        style={{
                            ...FONTS.h4,

                        }}
                    >
                        SubTotal

                    </Text>


                    <Text
                        style={{
                            ...FONTS.h4,
                            fontWeight: '700'

                        }}
                    >
                        ৳{subTotal.toFixed(2)}

                    </Text>



                </View>


                {/* Shipping Fee */}


                <View
                    style={{
                        flexDirection: 'row',
                        width: '97%',
                        justifyContent: 'space-between',
                        marginTop: 5,
                        marginBottom:15

                    }}

                >
                    <Text
                        style={{

                            ...FONTS.body3
                        }}
                    >
                        Shipping Fee

                    </Text>


                    <Text
                        style={{

                            ...FONTS.h4,
                            fontWeight: '700'
                        }}
                    >
                        ৳{shippingFee}

                    </Text>

                </View>
                {/* Line  */}

                <LineDivider />
                {/* Total   */}

                <View
                    style={{
                        flexDirection: 'row',
                        width: '97%',
                        justifyContent: 'space-between',
                        marginTop:5

                    }}

                >
                    <Text
                        style={{
                            color: COLORS.primary,
                            fontSize: 18,
                            fontWeight: '800'
                        }}
                    >
                        Total:

                    </Text>


                    <Text
                        style={{
                            color: COLORS.primary,
                            fontSize: 18,
                            fontWeight: '800'
                        }}
                    >
                        ৳ {total}

                    </Text>

                </View>




                {/* Button */}
                <TextButton
                    buttonContainerStyle={{
                        height: 40,
                        width: '70%',

                        marginTop: 10,
                        marginBottom: 10,
                        borderRadius: SIZES.radius,
                        backgroundColor: COLORS.primary

                    }}
                    label="Place your Order"

                    onPress={onPress}

                />


            </View>

        </>
    )



}

export default FooterTotal;









