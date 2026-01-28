
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS, SIZES, animations } from '../../../constants';

import { useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';
import SingleImageHeader from '../../../components/SingleImageHeader';
import Wrapper from '../../../components/Wrapper';
import LoadingScreen from '../../LoadingScreen';
// import OTPTextInput from '../OTPTextInput';

const ForgotPasswordOtpVerificationScreen = () => {
  const [timer] = React.useState(120);
  const [loading] = React.useState(true);
  const navigation = useNavigation() as any;


  // let otpInput = useRef<any>(null);


  return (


    <>
      {loading ? (

        <Wrapper>
          <SingleImageHeader
            name={'Verification'}

          />


          <KeyboardAwareScrollView

            contentContainerStyle={styles.keyboardAwareContainer}
            showsVerticalScrollIndicator={false}>
            <LottieView
              source={animations.otp}
              style={styles.lottieViewContainer}
              loop={true}
              autoPlay
              cacheComposition={true}
              hardwareAccelerationAndroid
            />




            <LinearGradient
              style={styles.linearGradientOtpContainer}

              locations={[0, 1]}
              colors={[COLORS.lightRed, COLORS.lightBlue]}
              useAngle={true}
              angle={270}>



            </LinearGradient>

            <View style={styles.bottomContainer}>

              <TouchableOpacity
                style={styles.buttonWrapper}
                onPress={() => navigation.navigate('ForgotNewPasswordScreen')}

                activeOpacity={0.9}>

                <LinearGradient
                  style={styles.linearGradientButton}

                  locations={[0, 1]}
                  colors={[COLORS.lightRed, COLORS.lightBlue]}
                  useAngle={true}
                  angle={90}>

                  <Text style={styles.linearGradientButtonText}>
                    Verify
                  </Text>

                </LinearGradient>


              </TouchableOpacity>




              <TouchableOpacity
                style={styles.resendButtonWrapper}

                // onPress={() => navigation.navigate('OnBoardingCategoryScreen')}


                activeOpacity={0.9}>

                <Text style={styles.didNotReceiveText}>
                  Didn't receive code?
                  <Text style={styles.resendText}>{`  Resed (${timer}s)`}
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>


        </Wrapper>

      ) : (
        <LoadingScreen visible={true} />
      )}
    </>

  );
};

const styles = StyleSheet.create({
  keyboardAwareContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lottieViewContainer: {
    marginTop: -SIZES.responsiveScreenHeight(10),

    width: SIZES.responsiveScreenWidth(50),
    height: SIZES.responsiveScreenWidth(50),
  },
  linearGradientOtpContainer: {
    backgroundColor: COLORS.lightGray2,
    borderRadius: 5,
    marginTop: '5%',

    width: SIZES.responsiveScreenWidth(83),
    height: SIZES.responsiveScreenWidth(15),


    elevation: 0.7,

    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
  },
  buttonWrapper: {
    marginTop: '7%',
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
  resendButtonWrapper: {
    marginTop: '5%',
  },
  didNotReceiveText: {
    fontWeight: '700',
    fontSize: SIZES.responsiveScreenFontSize(1.5),
    color: COLORS.red,
    marginHorizontal: 15,
  },
  resendText: {
    fontWeight: '800',
    fontSize: SIZES.responsiveScreenFontSize(1.6),
    color: COLORS.primary,
  },
});

export default ForgotPasswordOtpVerificationScreen;
