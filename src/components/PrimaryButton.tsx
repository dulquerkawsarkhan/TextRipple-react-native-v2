import {
    StyleSheet,
    Text
} from 'react-native';
import { COLORS, SIZES } from '../constants';

import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const PrimaryButton = ({
    label,
}: any) => {

    return (
        <LinearGradient
            style={styles.linearGradientButton}

            locations={[0, 1,]}
            colors={[COLORS.lightRed, COLORS.lightBlue,]}
            useAngle={true}
            angle={90}>

            <Text style={styles.linearGradientButtonText}>
               {label}
            </Text>

        </LinearGradient>

    )



}


const styles = StyleSheet.create({
 

    linearGradientButton: {
        borderRadius: SIZES.responsiveScreenWidth(2),
        width: SIZES.responsiveScreenWidth(80),
        height: SIZES.responsiveScreenWidth(8.5),
        elevation: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },

    linearGradientButtonText: {
        fontSize: SIZES.responsiveScreenFontSize(1.8),
        fontWeight: '800',
        color: COLORS.primary,
    },


}
)






export default PrimaryButton;









