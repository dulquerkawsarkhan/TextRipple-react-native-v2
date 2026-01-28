import { View, Text, Animated as RNAnimated } from 'react-native'
import React from 'react'
import { COLORS } from '../../../../src/constants'
import { SIZES } from '../../constants'
import Notice from './Notice'

const noticeHeight = -(SIZES.noticeHeaght + 12)


function index({ noticePostion,children }: any) {




    return (
        <View style={{
            flex: 1,
            // backgroundColor: COLORS.white
        }}>
            <RNAnimated.View style={{
                width: '100%',
                zIndex: 999,
                position: 'absolute',
                transform: [{ translateY: noticePostion }]
            }}>
                <Notice />
            </RNAnimated.View>
            <RNAnimated.View style={{

                flex: 1,
                width: '100%',
                paddingTop: noticePostion.interpolate({
                    inputRange: [noticeHeight, 0],
                    outputRange: [0, SIZES.noticeHeaght + 20]
                })
            }}>
                {children}

            </RNAnimated.View>
        </View>
    )
}

export default index