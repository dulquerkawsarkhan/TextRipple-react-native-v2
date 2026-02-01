/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, SIZES, icons } from '../../constants';



import { AuthService } from '../../services/AuthService';

const ContinueWithOtherButton = ({
    isUser,
    isLoading,
    setLoading,
}: any) => {


    const navigation = useNavigation<any>();

    // const [isLoading, setLoading] = useState(false);


    // Somewhere in your code
    const handelSignInWithGoogle = async () => {
        try {
            setLoading(true);
            await AuthService.signInWithGoogle();
            // Navigation is handled by App.tsx via AuthContext state change
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };



    const handelLoginWithFacebook = () => {

    };







    return (




        <>


            <View style={styles.mainContainer}>
                <View
                    style={styles.dividerLine}
                />
                <Text style={styles.dividerLineText}>
                    or continue with
                </Text>

                <View
                    style={styles.dividerLine}
                />

            </View>


            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    onPress={handelSignInWithGoogle}
                    activeOpacity={0.9}>
                    <LinearGradient
                        style={styles.linearGradientAuthButton}
                        locations={[0, 1]}
                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                        useAngle={true}
                        angle={45}>
                        <Image
                            source={icons.google}
                            style={{
                                width: SIZES.responsiveScreenWidth(6),
                                height: SIZES.responsiveScreenWidth(6),
                            }}
                        />
                    </LinearGradient>
                </TouchableOpacity>



                <TouchableOpacity
                    style={{
                        marginLeft: 20,
                    }}
                    onPress={handelLoginWithFacebook}
                    activeOpacity={0.9}>
                    <LinearGradient
                        style={styles.linearGradientAuthButton}
                        locations={[0, 1]}
                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                        useAngle={true}
                        angle={20}>


                        <Image
                            source={icons.fb}
                            style={{
                                width: SIZES.responsiveScreenWidth(6.5),
                                height: SIZES.responsiveScreenWidth(6.5),
                                borderRadius: 2,
                                tintColor: '#106BFF',

                            }}


                        />
                    </LinearGradient>
                </TouchableOpacity>



            </View>

            {isUser ?
                <TouchableOpacity
                    style={{
                        marginTop: '6%',
                    }}
                    onPress={() => {

                        navigation.navigate('SignUpScreen');
                    }}
                    activeOpacity={0.9}>
                    <Text style={
                        styles.linearGradientAuthButtonText
                    }>
                        Create new account?
                        <Text style={styles.linearGradientAuthButtonText2}> Signup
                        </Text>
                    </Text>
                </TouchableOpacity>

                :
                <TouchableOpacity
                    style={{
                        marginTop: '6%',
                    }}
                    onPress={() => {

                        navigation.navigate('SigninScreen');
                    }}
                    activeOpacity={0.9}>
                    <Text style={styles.linearGradientAuthButtonText}>
                        Already a member?
                        <Text style={styles.linearGradientAuthButtonText2}> Signin
                        </Text>
                    </Text>
                </TouchableOpacity>


            }

        </>
    );
};





const styles = StyleSheet.create({
    mainContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '7%',
    },

    dividerLine: {
        height: 1.5,
        backgroundColor: COLORS.primary,
        width: SIZES.responsiveScreenWidth(20),
        marginTop: 4.2,
        borderRadius: 5,
        elevation: 0.6,
    },
    dividerLineText: {
        fontWeight: '700',
        fontSize: SIZES.responsiveScreenFontSize(1.5),
        color: COLORS.primary,
        marginHorizontal: 15,
    },
    buttonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: '5%',
    },


    linearGradientAuthButton: {
        backgroundColor: COLORS.lightGray2,
        borderRadius: 5,
        width: SIZES.responsiveScreenWidth(13),
        height: SIZES.responsiveScreenWidth(13),
        elevation: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    linearGradientAuthButtonText: {
        fontWeight: '700',
        fontSize: SIZES.responsiveScreenFontSize(1.5),
        color: COLORS.primary,
        marginHorizontal: 15,

    },
    linearGradientAuthButtonText2: {
        fontWeight: '700',
        fontSize: SIZES.responsiveScreenFontSize(1.5),
        color: COLORS.blue2,

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












export default ContinueWithOtherButton;
