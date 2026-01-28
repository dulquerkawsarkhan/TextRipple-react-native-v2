/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import {
    Alert,
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SIZES, icons } from '../../constants';

import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import SingleImageHeader from '../../components/SingleImageHeader';
import Wrapper from '../../components/Wrapper';
import { AuthService } from '../../services/AuthService';
import LoadingScreen from '../LoadingScreen';
import ContinueWithOtherButton from './ContinueWithOtherButton';
import FromInput from './FromInput';

const SignUpScreen = () => {

    const navigation = useNavigation() as any;

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const [isLoading, setLoading] = useState(false);


    const handelSignUpScreen = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        try {
            // setLoading(true);
            await AuthService.signUpWithEmail(name, email, password);
            // setLoading(false);
            // Navigate to Home or Profile or Setup
            // Navigation handled by App.tsx (AuthContext)
        } catch (error: any) {
            setLoading(false);
            let errorMessage = 'Registration failed';
            if (error.code === 'auth/email-already-in-use') {
                errorMessage = 'That email address is already in use!';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'That email address is invalid!';
            } else if (error.code === 'auth/weak-password') {
                errorMessage = 'Password should be at least 6 characters';
            }
            Alert.alert('Registration Error', errorMessage);
            console.error(error);
        }
    };

    return (
        <>
            <Wrapper>
                <SingleImageHeader
                    name={'Register'}

                />


                <View
                    style={styles.mainContainer}
                >

                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.keyboardAwareContainer}

                    >

                        <View style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>

                            <FromInput
                                label="Name "
                                placeholder="Enter your name"
                                keyboardType="default"
                                autocomplete="name"
                                value={name}
                                onChange={(value: any) => {
                                    setName(value);
                                }}
                                errorMsg={nameError}
                                appendComponent={null}

                            />
                            <FromInput
                                label="Email"
                                placeholder="Email"
                                keyboardType="email-address"
                                autocomplete="email"
                                value={email}
                                onChange={(value: any) => {
                                    setEmail(value);
                                }}
                                errorMsg={emailError}
                                appendComponent={
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            marginRight: 8,
                                        }}
                                    >
                                        <Image
                                            source={email === '' || (email !== '' && emailError === '') ? icons.correct : icons.correct}

                                            style={{
                                                width: 20,
                                                height: 20,
                                                tintColor: email === '' ? COLORS.gray : (email !== '' && emailError === '') ? COLORS.green : COLORS.red,
                                            }}
                                        />

                                    </View>
                                }

                            />


                            <FromInput
                                label="Password"
                                placeholder="Password"
                                secureTextEntry={!showPassword}
                                value={password}
                                onChange={(value: any) => {
                                    setPassword(value);
                                }}
                                appendComponent={
                                    <TouchableOpacity style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: SIZES.responsiveScreenWidth(9),
                                        width: SIZES.responsiveScreenWidth(9),
                                    }}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Image
                                            source={showPassword ? icons.eye_close : icons.eye}
                                            style={{
                                                width: SIZES.responsiveScreenWidth(4.2),
                                                height: SIZES.responsiveScreenWidth(4.2),
                                                tintColor: showPassword ? COLORS.primary : COLORS.gray,

                                            }}
                                        />
                                    </TouchableOpacity>
                                }

                            />
                            <FromInput
                                label="Confirm Password"
                                placeholder="Confirm Password"
                                secureTextEntry={!showPassword}
                                value={confirmPassword}
                                onChange={(value: any) => {
                                    setConfirmPassword(value);
                                }}
                                appendComponent={
                                    <TouchableOpacity style={{
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: SIZES.responsiveScreenWidth(9),
                                        width: SIZES.responsiveScreenWidth(9),
                                    }}
                                        onPress={() => setShowPassword(!showPassword)}
                                    >
                                        <Image
                                            source={showPassword ? icons.eye_close : icons.eye}
                                            style={{
                                                width: SIZES.responsiveScreenWidth(4.2),
                                                height: SIZES.responsiveScreenWidth(4.2),
                                                tintColor: showPassword ? COLORS.primary : COLORS.gray,

                                            }}
                                        />
                                    </TouchableOpacity>
                                }

                            />




                            <TouchableOpacity
                                style={{
                                    marginTop: '5%',
                                }}
                                onPress={handelSignUpScreen}
                                activeOpacity={0.9}>

                                <LinearGradient
                                    style={styles.linearGradientButton}

                                    locations={[0, 1]}
                                    colors={[COLORS.lightRed, COLORS.lightBlue]}
                                    useAngle={true}
                                    angle={90}>
                                    <Text style={styles.linearGradientButtonText}>
                                        Register
                                    </Text>

                                </LinearGradient>


                            </TouchableOpacity>


                            {/* ============ContinueWithOtherButton===================== */}
                            <ContinueWithOtherButton />

                            <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL('https://sites.google.com/view/textripple-privacy-policy/home');
                                }}
                                style={{
                                    marginTop: 20,
                                    marginBottom: 20,
                                }}
                            >
                                <Text style={{
                                    color: COLORS.primary,
                                    fontWeight: '700',
                                    fontSize: SIZES.responsiveScreenFontSize(1.6),
                                    textDecorationLine: 'underline',
                                }}>
                                    Privacy Policy
                                </Text>
                            </TouchableOpacity>

                        </View>
                    </KeyboardAwareScrollView>




                </View>






                <LoadingScreen visible={isLoading} />


            </Wrapper>
        </>

    );
};







const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieViewContainer: {
        width: SIZES.responsiveScreenWidth(41),
        height: SIZES.responsiveScreenWidth(41),
        marginTop: 5,
    },
    keyboardAwareContainer: {
        flexGrow: 1,
        justifyContent: 'center',

    },


    linearGradientButton: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: 5,
        width: SIZES.responsiveScreenWidth(80),
        height: SIZES.responsiveScreenWidth(8.5),
        elevation: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
    },

    linearGradientButtonText: {
        fontSize: SIZES.responsiveScreenFontSize(1.8),
        fontWeight: '800',
        color: COLORS.primary,
    },


}
);



export default SignUpScreen;
