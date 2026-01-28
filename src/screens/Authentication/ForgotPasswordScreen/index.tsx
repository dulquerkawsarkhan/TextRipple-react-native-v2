import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { COLORS, SIZES, animations, icons } from '../../../constants';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import SingleImageHeader from '../../../components/SingleImageHeader';
import Wrapper from '../../../components/Wrapper';
import FromInput from '../FromInput';

const ForgotPasswordScreen = () => {

    const navigation = useNavigation() as any;

    const [email, setEmail] = React.useState('foodies@gmail.com');
    const [emailError] = React.useState('');
    return (
        <Wrapper>
            <SingleImageHeader
                name={'Forgot Password'}

            />
            <View
                style={
                    styles.mainContainer
                }>
                <LottieView
                    source={animations.forgot_password}
                    style={styles.lottieViewContainer}
                    loop={true}
                    autoPlay
                    cacheComposition={true}
                    hardwareAccelerationAndroid
                />
                <View style={styles.inputContainer}>
                    <View style={styles.inputWrapper}>

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
                                    style={styles.iconContainer}
                                >
                                    <Image
                                        source={email === '' || (email !== '' && emailError === '') ? icons.correct : icons.correct}

                                        style={styles.icon}
                                    />

                                </View>
                            }

                        />


                    </View>
                    <TouchableOpacity
                        style={styles.buttonWrapper}
                        onPress={() => navigation.navigate('ForgotPasswordOtpVerificationScreen')}
                        activeOpacity={0.9}>
                        <LinearGradient
                            style={styles.linearGradientButton}
                            locations={[0, 1]}
                            colors={[COLORS.lightRed, COLORS.lightBlue]}
                            useAngle={true}
                            angle={90}>
                            <Text style={styles.linearGradientButtonText}>
                                Continue
                            </Text>

                        </LinearGradient>
                    </TouchableOpacity>

                </View>




            </View>
        </Wrapper>

    );
};








const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    lottieViewContainer: {
        width: SIZES.responsiveScreenWidth(50),
        height: SIZES.responsiveScreenWidth(50),
        marginTop: -SIZES.responsiveScreenHeight(15),
    },
    keyboardAwareContainer: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    inputContainer: {
        alignItems: 'center',
        marginTop: SIZES.responsiveScreenHeight(2),
    },
    inputWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        justifyContent: 'center',
        marginRight: 8,
    },
    icon: {
        width: SIZES.responsiveScreenWidth(4.5),
        height: SIZES.responsiveScreenWidth(4.5),
        tintColor: COLORS.green,
    },
    buttonWrapper: {
        marginTop: '8%',
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
});



export default ForgotPasswordScreen;
