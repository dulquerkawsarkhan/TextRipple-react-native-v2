/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
    Image,
    Text,
    View,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES, icons } from '../../constants';

const ProfileHeader = () => {
    const { userData } = useAuth();
    const displayName = userData?.name || 'User';

    return (
        <LinearGradient
            style={{
                backgroundColor: COLORS.primary,
                borderBottomLeftRadius: 14,
                borderBottomRightRadius: 14,
                height: 140,
                alignItems: 'center',
                elevation: 2,
                width: SIZES.responsiveScreenWidth(100),
            }}
            locations={[0, 1]}
            colors={[COLORS.lightRed, COLORS.lightBlue]}
            useAngle={true}
            angle={190}>
            <View
                style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginTop: 10,
                }}
            >
                <LinearGradient
                    style={{
                        width: SIZES.responsiveScreenWidth(20.3),
                        height: SIZES.responsiveScreenWidth(20),
                        alignItems: 'center',
                        justifyContent: 'center',
                        elevation: 3,
                        borderRadius: 8,
                    }}
                    locations={[0, 1]}
                    colors={[COLORS.lightRed, COLORS.lightBlue]}
                    useAngle={true}
                    angle={185}>
                    <Image
                        source={icons.profile}
                        style={{
                            width: SIZES.responsiveScreenWidth(14),
                            height: SIZES.responsiveScreenWidth(14),
                            borderRadius: 7,
                            tintColor: COLORS.primary,
                        }}
                    />
                </LinearGradient>
                <View
                    style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'row',
                        marginTop: 5,
                        marginLeft: 13,
                    }}
                >
                    <Text
                        style={{
                            fontSize: SIZES.responsiveScreenFontSize(1.7),
                            fontWeight: '800',
                            color: COLORS.primary,
                        }}
                    >
                        {displayName}
                    </Text>

                    <Image
                        source={icons.check_circle}
                        style={{
                            marginLeft: 5,
                            marginTop: 3,
                            width: SIZES.responsiveScreenWidth(3),
                            height: SIZES.responsiveScreenWidth(3),
                            tintColor: COLORS.blue2,
                        }}
                    />
                </View>
            </View>
        </LinearGradient>
    );
};

import { useAuth } from '../../context/AuthContext';
export default ProfileHeader;
