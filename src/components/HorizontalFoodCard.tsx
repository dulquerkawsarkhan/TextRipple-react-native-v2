import {
    Image,
    Text,
    View
} from 'react-native';
import { COLORS, SIZES, icons } from '../constants';

import React from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import ScalePress from './ScalePress';

const HorizontalFoodCard = ({ item, onPress }: any) => {




    return (

        <ScalePress

            onPress={onPress}

        >
            <LinearGradient
                style={{
                    borderRadius: 10,
                    width: SIZES.responsiveScreenWidth(97),
                    elevation: 1,
                    marginBottom: 5,
                    marginTop: 5
                }}

                locations={[0, 1,]}
                colors={[COLORS.lightRed, COLORS.lightBlue,]}
                useAngle={true}
                angle={190}>





                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                    }}>
                        <FastImage

                            style={{
                                width: SIZES.responsiveScreenWidth(19),
                                height: SIZES.responsiveScreenWidth(20),
                                borderRadius: 8
                            }}
                            source={item.image}
                            resizeMode={'cover'}
                        // resizeMode={'stretch'}

                        />
                        <View style={{
                            marginLeft: 8
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',


                            }}>



                                <Text style={{
                                    fontSize: SIZES.responsiveScreenFontSize(1.5),
                                    fontWeight: '800',
                                    color: COLORS.black,
                                    marginTop: 0
                                }}>
                                    {`${item?.name?.length > 29 ? `${item?.name?.slice(0, 29)}...` : item?.name}`}
                                </Text>




                            </View>

                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 6
                            }}>

                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',

                                }}>

                                    <Image
                                        source={icons.delivery}
                                        style={{
                                            width: SIZES.responsiveScreenWidth(3.3),
                                            height: SIZES.responsiveScreenWidth(3.3),

                                            tintColor: COLORS.primary


                                        }}

                                    />


                                    <Text style={{
                                        fontSize: SIZES.responsiveScreenFontSize(1.1),
                                        fontWeight: '700',
                                        color: COLORS.black,
                                        marginLeft: 3
                                    }}>
                                        {item?.delivery_status}
                                    </Text>

                                </View>


                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 7

                                }}>

                                    <Image
                                        source={icons.clock}
                                        style={{
                                            width: SIZES.responsiveScreenWidth(3.3),
                                            height: SIZES.responsiveScreenWidth(3.3),

                                            tintColor: COLORS.primary

                                        }}

                                    />


                                    <Text style={{
                                        fontSize: SIZES.responsiveScreenFontSize(1.1),
                                        fontWeight: '700',
                                        color: COLORS.black,
                                        marginLeft: 2
                                    }}>
                                        54
                                    </Text>

                                </View>
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                marginTop: 3,
                                alignItems: 'center'
                            }}>
                                <Image
                                    source={icons.star}
                                    style={{
                                        width: SIZES.responsiveScreenWidth(2.4),
                                        height: SIZES.responsiveScreenWidth(2.4),


                                        tintColor: COLORS.primary,



                                    }}
                                />
                                <Text style={{
                                    fontSize: SIZES.responsiveScreenFontSize(1.3),
                                    fontWeight: '900',
                                    color: COLORS.black,
                                    marginLeft: 3

                                }}>
                                    4.5
                                </Text>
                                <Text style={{
                                    fontSize: SIZES.responsiveScreenFontSize(0.9),

                                    fontWeight: '900',
                                    color: COLORS.gray


                                }}>
                                    (23+)
                                </Text>
                            </View>





                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginTop: 3,


                            }}>

                                <Image
                                    source={icons.dollar}
                                    style={{
                                        width: SIZES.responsiveScreenFontSize(1.4),
                                        height: SIZES.responsiveScreenFontSize(1.4),
                                        tintColor: COLORS.red2
                                    }}

                                />


                                <Text style={{
                                    fontSize: SIZES.responsiveScreenFontSize(1.4),
                                    fontWeight: '800',
                                    color: COLORS.red2,
                                    marginLeft: -2
                                }}>
                                    200.0
                                </Text>

                            </View>

                        </View>

                    </View>

                    <View style={{
                        alignItems: 'flex-end',
                        justifyContent: 'space-around',
                        marginRight: 8


                    }}>



                        <View style={{

                            backgroundColor: COLORS.lightBlue,
                            borderRadius: 5,
                            width: SIZES.responsiveScreenWidth(6),
                            height: SIZES.responsiveScreenWidth(6),
                            alignItems: 'center',
                            justifyContent: 'center',
                            elevation: 2

                        }}>
                            <Image
                                source={icons.love}
                                style={{
                                    width: SIZES.responsiveScreenWidth(3.8),
                                    height: SIZES.responsiveScreenWidth(3.8),
                                    tintColor: COLORS.primary
                                }}
                            />
                        </View>

                        <View style={{

                            backgroundColor: COLORS.lightBlue,
                            borderRadius: 2,
                            width: SIZES.responsiveScreenWidth(6.5),
                            height: SIZES.responsiveScreenWidth(6.5),
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexDirection: 'row',
                            marginTop: 15,
                            elevation: 2
                        }}>
                            <Image
                                source={icons.cart}
                                style={{
                                    width: SIZES.responsiveScreenWidth(4),
                                    height: SIZES.responsiveScreenWidth(4),
                                    tintColor: COLORS.primary
                                }}
                            />

                            {/* <Text style={{
                                fontSize: 12,
                                fontWeight: '700',
                                color: COLORS.white,
                                marginLeft: 5
                            }}>Add to Cart</Text> */}
                        </View>

                    </View>
                </View>




            </LinearGradient>

        </ScalePress>



    )



}

export default HorizontalFoodCard;








