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

import React, { useState } from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import SingleImageHeader from '../../components/SingleImageHeader';
import Wrapper from '../../components/Wrapper';
import { AuthService } from '../../services/AuthService';
import LoadingScreen from '../LoadingScreen';
import ContinueWithOtherButton from './ContinueWithOtherButton';
import FromInput from './FromInput';

const SigninScreen = () => {

    // const navigation = useNavigation() as any;

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [emailError] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    // const [saveMe, setSaveMe] = React.useState(false);
    const [isLoading, setLoading] = useState(false);


    const handleSignIn = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password');
            return;
        }

        try {
            setLoading(true);
            await AuthService.signInWithEmail(email, password);
            setLoading(false);
            // Navigate to Home
            // Navigation handled by App.tsx (AuthContext)
        } catch (error: any) {
            setLoading(false);
            let errorMessage = 'Sign In failed';
            if (error.code === 'auth/user-not-found') {
                errorMessage = 'No user found with this email';
            } else if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password';
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Invalid email address';
            }
            Alert.alert('Login Error', errorMessage);
            console.error(error);
        }
    };


    return (
        <>
            <Wrapper>
                <SingleImageHeader
                    name={'Sign in'}

                />


                <View
                    style={styles.mainContainer}
                >










                    <KeyboardAwareScrollView
                        contentContainerStyle={styles.keyboardAwareContainer}

                    >

                        <View
                            style={styles.inputContainer}
                        >





                            <View style={{

                                alignItems: 'center',
                                marginTop: SIZES.responsiveScreenHeight(1),
                            }}>




                                <View style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>

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
                                                        width: SIZES.responsiveScreenWidth(4.5),
                                                        height: SIZES.responsiveScreenWidth(4.5),
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


                                </View>





                                {/* <View
                                    style={styles.customSwitchContainer}>
                                    <CustomSwitch
                                        value={saveMe}
                                        onChange={(value: any) => {
                                            setSaveMe(value);


                                        }}
                                    />


                                    <TouchableOpacity
                                        onPress={() => navigation.navigate('ForgotPasswordScreen')}

                                        style={{
                                            alignItems: 'center',
                                            // justifyContent: 'center',
                                        }}
                                    >

                                        <Text style={{
                                            color: COLORS.gray,
                                            fontWeight: '700',
                                            fontSize: SIZES.responsiveScreenFontSize(1.5),
                                        }}>
                                            Forgot Password

                                        </Text>
                                    </TouchableOpacity>
                                </View>
 */}


                                <TouchableOpacity
                                    style={{
                                        marginTop: '8%',
                                    }}
                                    onPress={handleSignIn}
                                    activeOpacity={0.9}>
                                    <LinearGradient
                                        style={styles.linearGradientButton}

                                        locations={[0, 1]}
                                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                                        useAngle={true}
                                        angle={90}>

                                        <Text style={styles.linearGradientButtonText}>
                                            Sign in
                                        </Text>

                                    </LinearGradient>


                                </TouchableOpacity>







                            </View>



                            <ContinueWithOtherButton
                                isUser={true}

                                isLoading={isLoading}
                                setLoading={setLoading}

                            />

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
        marginTop: '5%',
        width: SIZES.responsiveScreenWidth(45),
        height: SIZES.responsiveScreenWidth(45),
    },
    keyboardAwareContainer: {
        flexGrow: 1,
        justifyContent: 'center',

    },
    inputContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,

    },
    customSwitchContainer: {

        width: SIZES.responsiveScreenWidth(90),
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'space-between',


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




export default SigninScreen;
