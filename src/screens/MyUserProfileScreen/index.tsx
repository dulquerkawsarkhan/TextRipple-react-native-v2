/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from '../../components/AppStatusBar';
import Wrapper from '../../components/Wrapper';
import { COLORS, SIZES, icons } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import ProfileValue from '../UserProfileScreen/ProfileValue';

const MyUserProfileScreen = () => {
    const { userData } = useAuth();

    const navigation = useNavigation();

    return (
        <Wrapper>


            <AppStatusBar />
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    marginTop: 1,
                    alignItems: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'space-between',
                    width: SIZES.responsiveScreenWidth(97),

                }}
            >
                <TouchableOpacity

                    activeOpacity={0.9}
                    onPress={() => navigation.goBack()}

                    style={{
                        width: SIZES.responsiveScreenWidth(11),
                        height: SIZES.responsiveScreenWidth(11),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    <Image
                        source={icons.back}
                        style={{
                            width: SIZES.responsiveScreenWidth(5),
                            height: SIZES.responsiveScreenWidth(5),
                            tintColor: COLORS.black,
                        }} />

                </TouchableOpacity>

                <Text style={{
                    fontSize: SIZES.responsiveScreenFontSize(1.8),
                    fontWeight: '800',
                    color: COLORS.primary,
                }}>
                    {'My Profile'}
                </Text>



                <View


                    style={{
                        width: SIZES.responsiveScreenWidth(11),
                        height: SIZES.responsiveScreenWidth(11),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                />
            </View>


            <View style={styles.container}>
                <LinearGradient
                    style={styles.card}
                    locations={[0, 1]}
                    colors={[COLORS.lightRed, COLORS.lightBlue]}
                    useAngle={true}
                    angle={10}
                >
                    <Text style={styles.headerText}>Personal Details</Text>

                    <ProfileValue
                        icon={icons.user}
                        value="Name"
                        value2={userData?.name || 'N/A'}
                        onPress={() => { }}
                    />

                    <ProfileValue
                        icon={icons.email}
                        value="Email"
                        value2={userData?.email || 'N/A'}
                        onPress={() => { }}
                    />

                    <ProfileValue
                        icon={icons.wallet}
                        value="Balance"
                        value2={(userData?.totalCoins || 0).toFixed(2)}
                        onPress={() => { }}
                    />
                    {/* Added User ID for completeness/debugging, can be removed if not needed */}
                    {/* <ProfileValue
                        icon={icons.info}
                        value="User ID"
                         // @ts-ignore
                        value2={userData?.uid || 'N/A'}
                        onPress={() => { }}
                    /> */}

                </LinearGradient>
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        marginTop: 20,
    },
    card: {
        borderRadius: 5,
        elevation: 1,
        marginVertical: 3,
        width: SIZES.responsiveScreenWidth(90),
        paddingBottom: 20,
    },
    headerText: {
        color: COLORS.primary,
        fontWeight: '700',
        fontSize: SIZES.responsiveScreenFontSize(1.5),
        marginLeft: 10,
        marginTop: 10,
        marginBottom: 5,
    },
});

export default MyUserProfileScreen;
