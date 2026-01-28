/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react-native/no-inline-styles */
import { Text, View } from 'react-native';
import { COLORS, SIZES } from '../constants';
import AppStatusBar from './AppStatusBar';

const SingleImageHeader = ({ name }: any) => {


    return (

        <>
            <AppStatusBar />
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    marginTop: 1,
                    alignItems: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'center',
                    width: SIZES.responsiveScreenWidth(97),

                }}
            >
                {/* <TouchableOpacity

                activeOpacity={0.9}
                    onPress={() => navigation.goBack()}

                    style={{
                        width: SIZES.responsiveScreenWidth(11),
                        height:SIZES.responsiveScreenWidth(11),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    <Image
                        source={icons.back}
                        style={{
                            width: SIZES.responsiveScreenWidth(5),
                            height:SIZES.responsiveScreenWidth(5),
                            tintColor: COLORS.black,
                        }} />

                </TouchableOpacity> */}

                <Text style={{
                    fontSize: SIZES.responsiveScreenFontSize(1.8),
                    fontWeight: '800',
                    color: COLORS.primary,
                }}>
                    {name}
                </Text>




            </View>

        </>

    );

};

export default SingleImageHeader;
