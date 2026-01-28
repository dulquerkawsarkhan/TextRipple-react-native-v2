/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import {
    Alert,
    Linking,
    ScrollView,
    StatusBar,
    Text,
    View,
} from 'react-native';
import { COLORS, SIZES, icons } from '../../constants';

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../../components/Wrapper';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/AuthService';
import ProfileHeader from './ProfileHeader';
import ProfileValue from './ProfileValue';

const MyAccount = () => {
    const { userData, signOut } = useAuth();
    const navigation = useNavigation<any>();

    const handleSignOut = async () => {
        try {
            await signOut();
            // Navigation handled by App.tsx
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    const handleDeleteAccount = () => {
        Alert.alert(
            'Delete Account',
            'Are you sure you want to delete your account? This action cannot be undone and all your data will be lost.',
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    style: 'destructive',
                    onPress: async () => {
                        try {
                            if (userData?.uid) {
                                await AuthService.deleteUserAccount(userData.uid);
                                // Sign out is implicity handled by the auth state listener when the user is deleted
                            }
                        } catch (error: any) {
                            if (error.code === 'auth/requires-recent-login') {
                                Alert.alert(
                                    'Security Check',
                                    'To protect your account, please sign out and sign in again before deleting your account.'
                                );
                            } else {
                                Alert.alert('Error', 'Failed to delete account. Please try again.');
                            }
                            console.error('Delete account failed:', error);
                        }
                    },
                },
            ]
        );
    };

    return (
        <Wrapper>
            <View
                style={{
                    alignItems: 'center',
                }}
            >
                <StatusBar
                    animated={true}
                    barStyle={'dark-content'}
                    translucent
                    backgroundColor="transparent"
                />

                <View
                    style={{
                        marginTop: StatusBar.currentHeight,
                    }}
                />

                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={{
                        flexGrow: 1,
                    }}
                >
                    <View style={{
                        alignItems: 'center',
                    }}>

                        <ProfileHeader />

                        <LinearGradient
                            style={{
                                borderRadius: 5,
                                elevation: 1,
                                marginVertical: 3,
                                marginTop: 20,
                                width: SIZES.responsiveScreenWidth(95),
                            }}
                            locations={[0, 1]}
                            colors={[COLORS.lightRed, COLORS.lightBlue]}
                            useAngle={true}
                            angle={10}>

                            <Text style={{
                                color: COLORS.primary,
                                fontWeight: '700',
                                fontSize: SIZES.responsiveScreenFontSize(1.5),
                                marginLeft: 10,
                                marginTop: 10,
                                marginBottom: 5,
                            }}>Account</Text>

                            {/* <ProfileValue
                                icon={icons.coupon}
                                value="Cash Out"
                                onPress={() => { }}
                            /> */}

                            <ProfileValue
                                icon={icons.wallet}
                                value="My Coin"
                                value2={(userData?.totalCoins || 0).toFixed(2)}
                                icon2={icons.coupon}
                                onPress={() => { }}
                            />

                            <ProfileValue
                                icon={icons.user}
                                value="Account Info"
                                onPress={() => {
                                    navigation.navigate('MyUserProfileScreen');
                                }}
                            />

                            <ProfileValue
                                icon={icons.transaction}
                                value="Purchase History"
                                onPress={() => {
                                    navigation.navigate('PurchaseHistoryScreen');
                                }}
                            />

                            <ProfileValue
                                icon={icons.about}
                                onPress={() => {
                                    Linking.openURL('https://sites.google.com/view/textripple-privacy-policy/home');
                                }}
                                value="Privacy Policy"
                            />
                            <ProfileValue
                                icon={icons.call}
                                onPress={() => {
                                    Linking.openURL('https://sites.google.com/view/digisoftbd/home');
                                }}
                                value="Contact Us"
                            />

                            <ProfileValue
                                icon={icons.logout}
                                onPress={handleSignOut}
                                value="Logout"
                            />

                            <ProfileValue
                                icon={icons.edit}
                                value="Delete Account"
                                onPress={handleDeleteAccount}
                            />
                            <View style={{
                                marginBottom: 10,
                            }} />
                        </LinearGradient>
                    </View>


                    <View style={{
                        marginBottom: SIZES.responsiveScreenWidth(30),
                    }} />
                </ScrollView>

            </View>
        </Wrapper>

    );
};

export default MyAccount;
