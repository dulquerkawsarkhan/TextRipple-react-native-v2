import { Image, Text, TouchableOpacity, View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { COLORS, SIZES, icons } from "../constants"


const ReviewCart = ({ item }: any) => {

    return (


        <TouchableOpacity
            activeOpacity={0.9}>

            <LinearGradient
                style={{

                    backgroundColor: COLORS.lightGray2,
                    borderRadius: 10,
                    marginTop: 7,
                    width: SIZES.responsiveScreenWidth(95),
                    elevation: 1.5,
                    marginBottom: 1,
                }}

                locations={[0, 1]}
                colors={[COLORS.lightRed, COLORS.lightBlue,]}
                useAngle={true}
                angle={185}>


                <View style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 5,


                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginHorizontal: 8



                    }}>
                        <FastImage

                            style={{
                                width: SIZES.responsiveScreenWidth(9.5),
                                height: SIZES.responsiveScreenWidth(9.5),
                                borderRadius: SIZES.responsiveScreenWidth(1.2)

                            }}
                            source={item.image}
                            resizeMode={'cover'}

                        />
                        <View>


                            <Text style={{
                                fontSize: SIZES.responsiveScreenFontSize(1.5),
                                fontWeight: '700',
                                color: COLORS.black,
                                marginHorizontal: 5
                            }}>
                                {`${item?.name}`}
                            </Text>
                            <Text style={{
                                fontSize: SIZES.responsiveScreenFontSize(1.1),
                                fontWeight: '700',
                                color: COLORS.gray,
                                marginHorizontal: 5,
                                fontStyle: 'italic',
                                marginTop: 1
                            }}>
                                {item.date}
                            </Text>
                        </View>

                    </View>


                    <View style={{

                        // alignItems: 'center',

                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        marginRight: 8

                        // backgroundColor: COLORS.white,
                        // borderRadius: SIZES.responsiveScreenWidth(1)
                    }}>
                        <Image
                            source={icons.star}
                            style={{
                                width: SIZES.responsiveScreenWidth(2.5),
                                height: SIZES.responsiveScreenWidth(2.5),
                                tintColor: COLORS.primary

                            }}
                        />
                        <Text style={{
                            fontSize: SIZES.responsiveScreenFontSize(1.2),
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
                            {`(${item.reviews}+)`}
                        </Text>
                    </View>

                </View>

                <Text style={{
                    fontSize: SIZES.responsiveScreenFontSize(1.3),
                    fontWeight: '700',
                    color: COLORS.gray,
                    marginHorizontal: 10,
                    marginTop: 5,
                    marginBottom: 10
                }}>
                    {`${item?.comment}`}
                </Text>
            </LinearGradient>


        </TouchableOpacity>

    )

}

export default ReviewCart