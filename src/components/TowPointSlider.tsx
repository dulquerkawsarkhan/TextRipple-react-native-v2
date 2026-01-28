import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { COLORS, FONTS, SIZES, constants, dummyData, icons } from '../constants';
import {
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from 'react-native';

import MultiSlider from '@ptomasroos/react-native-multi-slider'
import React from 'react';

// import MultiSlider from 'react-native-multi-slider';


const TowPointSlider = ({ values, min, max, prefix, postfix, onValuesChange }: any) => {

    return (
        <MultiSlider
            values={values}
            sliderLength={SIZES.width * 0.88}
            min={min}
            max={max}
            step={1}
            markerOffsetY={15}
            trackStyle={{
                height: 5,
                borderRadius: 10,
                backgroundColor: COLORS.gray

            }}

            selectedStyle={{
                backgroundColor: COLORS.primary
            }}
            minMarkerOverlapDistance={3}
            customMarker={(e) => {

                return (
                    <View style={{
                    
                        alignItems: 'center',
                        justifyContent: 'center',



                    }}>

                        <View style={{
                            height: SIZES.responsiveScreenWidth(3.4),
                            width: SIZES.responsiveScreenWidth(3.4),
                            borderRadius: 3,
                            marginTop: -SIZES.responsiveScreenWidth(1.5),
                            borderColor: COLORS.white,
                            backgroundColor: COLORS.primary,
                            // marginLeft:15,
                            // marginRight:15

                        }} />

                        <Text style={{
                            marginTop: 3,
                            marginRight: 4,
                            fontWeight: '700',
                            fontSize: SIZES.responsiveScreenFontSize(1.4),
                            color: COLORS.darkGray,

                        }}>
                            {prefix}{e.currentValue}{postfix}
                        </Text>


                    </View>
                )

            }}
            onValuesChange={(values) => onValuesChange(values)}
        />



    )



}



export default TowPointSlider;









