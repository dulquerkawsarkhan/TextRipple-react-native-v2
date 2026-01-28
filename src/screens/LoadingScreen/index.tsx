import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, StyleSheet, Text, View } from 'react-native';
import { COLORS, SIZES } from '../../constants';

interface LoadingScreenProps {
    visible: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ visible }) => {
    const [show, setShow] = useState(visible);
    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (visible) {
            setShow(true); // Mount the component
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            // Fade out, then unmount
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 1000, // Slow fade out
                useNativeDriver: true,
            }).start(() => {
                setShow(false);
            });
        }
    }, [visible, fadeAnim]);

    if (!show) {
        return null;
    }

    return (
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
            <View style={styles.content}>
                <ActivityIndicator size="large" color={COLORS.primary} />
                <Text style={styles.text}>
                    Loading...
                </Text>
            </View>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        zIndex: 1000,
        height: SIZES.responsiveScreenHeight(100),
        width: SIZES.responsiveScreenWidth(100),
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    content: {
        backgroundColor: COLORS.white,
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    text: {
        marginTop: 10,
        fontSize: SIZES.responsiveScreenFontSize(1.8),
        fontWeight: '600',
        color: COLORS.primary,
    },
});

export default LoadingScreen;
