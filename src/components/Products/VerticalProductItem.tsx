import { useNavigation } from "@react-navigation/native"
import { Image, Text, View } from "react-native"
import FastImage from "react-native-fast-image"
import LinearGradient from "react-native-linear-gradient"
import { COLORS, SIZES, icons, images } from "../../constants"
import ScalePress from "../ScalePress"


const data = [
    {
        id: 1,
        profile_name: 'Kawsar Khan',
        profile_image: images.profile,
        delivery_status: 'Free Delivery',
        delivery_time: '10-15',
        name: 'Penne pasta in tomato sauce with chicken and tomatoes on a wooden table',
        image: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?t=st=1727299306~exp=1727302906~hmac=cf04c4b185584c4f3a4779bc57590cfe789f45ad80d64aae552433c729b4d18e&w=2000',
    },
    {
        id: 2,
        profile_name: 'Kawsar Khan',
        profile_image: images.profile,
        delivery_status: 'Free Delivery',
        delivery_time: '10-15',
        name: 'Hot spicy stew eggplant, sweet pepper, olives and capers with basil leaves',
        image: 'https://img.freepik.com/free-photo/hot-spicy-stew-eggplant-sweet-pepper-olives-capers-with-basil-leaves-top-view_2829-6430.jpg?t=st=1727303387~exp=1727306987~hmac=7805ac560df897065e84d473e0ee128a910f288db06569b8edf331193656f999&w=2000',
    },
    {
        id: 3,
        profile_name: 'Kawsar Khan',
        profile_image: images.profile,
        delivery_status: 'Free Delivery',
        delivery_time: '10-15',
        name: 'Hot spicy stew eggplant, sweet pepper, olives and capers with basil leaves',
        image: 'https://img.freepik.com/free-photo/baked-vegetables-white-plate-eggplant-zucchini-tomatoes-paprika-onions-top-view_2829-17239.jpg?t=st=1727304096~exp=1727307696~hmac=60a4a4300e1e61aac4db57f1537c4047eead205fa2c844deeff0f965bf7050cc&w=2000',
    },

    {
        id: 4,
        profile_name: 'Kawsar Khan',
        profile_image: images.profile,
        delivery_status: 'Free Delivery',
        delivery_time: '10-15',
        name: 'Penne pasta in tomato sauce with chicken and tomatoes on a wooden table',
        image: 'https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19744.jpg?t=st=1727299306~exp=1727302906~hmac=cf04c4b185584c4f3a4779bc57590cfe789f45ad80d64aae552433c729b4d18e&w=2000',
    },

]

const VerticalProductItem = ({ item }: any) => {

    const navigation =useNavigation<any>()

    return (

        <ScalePress
        onPress={()=>navigation.navigate('FoodDetailsScreen')}

        >

            <LinearGradient
                style={{
                    borderRadius: 10,
                    marginTop: 8,
                    width: SIZES.responsiveScreenWidth(47),
                    elevation: 1,
                    marginHorizontal: 5,
                    marginBottom: 1,

                }}

                locations={[0, 1,]}
                colors={[COLORS.lightRed, COLORS.lightBlue,]}
                useAngle={true}
                angle={90}>
                <View style={{
                    position: 'absolute',
                    left: 5,
                    top: 5,
                    zIndex: 99,
                    backgroundColor: COLORS.lightBlue,
                    borderRadius: 5,
                    width: SIZES.responsiveScreenWidth(11),
                    height: SIZES.responsiveScreenWidth(4.4),
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexDirection: 'row'
                }}>
                    <Image
                        source={icons.dollar}
                        style={{
                            width: SIZES.responsiveScreenWidth(2.8),
                            height: SIZES.responsiveScreenWidth(2.8),
                            tintColor: COLORS.primary
                        }}
                    />
                    <Text style={{
                        fontSize: SIZES.responsiveScreenFontSize(1.4),
                        fontWeight: '900',
                        color: COLORS.black,
                        marginLeft: -2
                    }}>
                        800
                    </Text>

                </View>
                <View style={{
                    position: 'absolute',
                    right: 5,
                    top: 5,
                    zIndex: 99,
                    backgroundColor: COLORS.lightBlue,
                    borderRadius: SIZES.responsiveScreenWidth(1),
                    width: SIZES.responsiveScreenWidth(6),
                    height: SIZES.responsiveScreenWidth(6),


                    alignItems: 'center',
                    justifyContent: 'center'
                }}>
                    <Image
                        source={icons.love}
                        style={{
                            width: SIZES.responsiveScreenWidth(4.2),
                            height: SIZES.responsiveScreenWidth(4.2),

                            tintColor: COLORS.primary
                        }}
                    />
                </View>















                <View style={{

                    // alignItems: 'center',
                    width: SIZES.responsiveScreenWidth(14),
                    height: SIZES.responsiveScreenWidth(5),

                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    position: 'absolute',
                    zIndex: 99,
                    top: '51.5%',
                    right: 3,
                    backgroundColor: COLORS.lightBlue,
                    borderRadius: SIZES.responsiveScreenWidth(1)
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
                        (23+)
                    </Text>
                </View>





                <FastImage

                    style={{
                        width: SIZES.responsiveScreenWidth(47),
                        height: SIZES.responsiveScreenWidth(30),
                        borderTopLeftRadius: 10,
                        borderTopRightRadius: 10
                    }}
                    source={{ uri: item.image }}
                    // resizeMode={'cover'}
                    resizeMode={'stretch'}

                />

                <View style={{
                    flexDirection: 'row',
                    // alignItems: 'center',
                    justifyContent: 'space-between',
                    marginTop: 8,
                    marginHorizontal: 4


                }}>
                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                    }}>
                        <Text style={{
                            fontSize: SIZES.responsiveScreenFontSize(1.5),
                            fontWeight: '700',
                            color: COLORS.black,
                            marginHorizontal: 3
                        }}>
                            {`${item.name.slice(0, 40)}...`}
                        </Text>

                    </View>
                </View>



                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginLeft: 4,
                    marginTop: 8,
                    marginBottom: 10



                }}>

                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginHorizontal: 4

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
                            fontSize: SIZES.responsiveScreenFontSize(1.2),
                            fontWeight: '700',
                            color: COLORS.primary,
                            marginLeft: 3
                        }}>
                            {item.delivery_status}
                        </Text>

                    </View>


                    <View style={{
                        flexDirection: 'row',
                        alignItems: 'center', marginLeft: 7

                    }}>

                        <Image
                            source={icons.clock}
                            style={{
                                width: SIZES.responsiveScreenWidth(3.4),
                                height: SIZES.responsiveScreenWidth(3.4),

                                tintColor: COLORS.primary


                            }}

                        />


                        <Text style={{
                            fontSize: SIZES.responsiveScreenFontSize(1.2),
                            fontWeight: '700',
                            color: COLORS.primary,
                            marginLeft: 2
                        }}>
                            {`${item.delivery_time} min`}
                        </Text>

                    </View>
                </View>


            </LinearGradient>

        </ScalePress>

    )

}

export default VerticalProductItem