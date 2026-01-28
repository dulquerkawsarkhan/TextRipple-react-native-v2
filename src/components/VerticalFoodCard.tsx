import {
    Image,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { COLORS, FONTS, SIZES, icons } from '../constants';

import React from 'react';

const VerticalFoodCard = ({ containerStyle, imageStyle, item, onPress }: any) => {

    return (

        <TouchableOpacity

            onPress={onPress}
            kay={item.id}
            style={{
                width: 200,
                borderRadius: SIZES.radius,
                backgroundColor: COLORS.
                    lightGray2,
                alignItems: 'center',
                padding: SIZES.radius,
                ...containerStyle

            }}>


            <View style={{ flexDirection: 'row' }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <Image
                        source={icons.calories}
                        style={{
                            width: 30, height: 30
                        }}
                    />

                    <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
                        {item.calories} Calories </Text>
                </View>

                <Image
                    source={icons.love}
                    style={{
                        width: 20,
                        height: 20,
                        tintColor: item.isFavourite ? COLORS.primary : COLORS.gray,
                        primary: COLORS.gray


                    }}
                />


            </View>

            <View style={{
                width: 150,
                height: 150,
                alignItems: 'center',
                justifyContent: 'center',

            }}>
                <Image source={item.image}
                    style={{
                        width: "100%",
                        height: "100%",
                        alignItems: 'center',
                        justifyContent: 'center',

                    }} />

            </View>

            <View style={{
                alignItems: 'center',
                marginTop: -20
            }}
            >

                <Text style={{ ...FONTS.h3, fontSize: 17 }}>
                    {item.name}
                </Text>
                <Text style={{ color: COLORS.darkGray2, ...FONTS.body5 }}>
                    {item.description}
                </Text>

                <Text style={{ marginTop: SIZES.base, ...FONTS.h2 }}> ${item.price} </Text>

            </View>


















        </TouchableOpacity>

    )



}

export default VerticalFoodCard;









