/* eslint-disable react-native/no-inline-styles */

// import {
//     withCollapsibleContext,
// } from '@r0b0t3d/react-native-collapsible';
import Clipboard from '@react-native-clipboard/clipboard';
import React, { useState } from 'react';
import { Alert, FlatList, Share, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Wrapper from '../../components/Wrapper';
import { COLORS, SIZES } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/AuthService';
import FromInput from '../Authentication/FromInput';
import LoadingScreen from '../LoadingScreen';

const Home = () => {
    const { userData } = useAuth();
    const [loading, setLoading] = useState(false);
    const [textValue, setTextValue] = useState('');
    const [textValueError, setTextValueError] = useState('');
    const [repetitions, setRepetitions] = useState(0);
    const [repetitionsError, setRepetitionsError] = useState('');
    const [result, setResult] = useState<any[]>([]);

    const handleCopy = () => {
        if (result.length === 0) {
            Alert.alert('No Text', 'Please generate text first.');
            return;
        }
        const fullText = result.map(item => item.name).join('\n');
        Clipboard.setString(fullText);
        Alert.alert('Copied', 'Text copied to clipboard!');
    };

    const handleShare = async () => {
        if (result.length === 0) {
            Alert.alert('No Text', 'Please generate text first.');
            return;
        }
        const fullText = result.map(item => item.name).join('\n');
        try {
            await Share.share({
                message: fullText,
            });
        } catch {
            Alert.alert('Error', 'Failed to share text.');
        }
    };

    const handleReset = () => {
        setTextValue('');
        setRepetitions(0);
        setResult([]);
        setTextValueError('');
        setRepetitionsError('');
    };

    const handelRepetitions = async () => {
        setTextValueError('');
        setRepetitionsError('');
        if (!textValue) {
            setTextValueError('Please enter a valid text');
            return;
        }

        if (repetitions > 0) {
            // Coin Deduction Logic
            if (repetitions >= 150) {
                const coinsToDeduct = (repetitions * 0.06) - 6;

                if ((userData?.totalCoins || 0) < coinsToDeduct) {
                    Alert.alert(
                        'Insufficient Coins',
                        `You need ${coinsToDeduct} coins for ${repetitions} repetitions. Your balance: ${userData?.totalCoins || 0}`
                    );
                    return;
                }

                try {
                    setLoading(true);
                    if (userData?.uid) {
                        await AuthService.deductCoins(userData.uid, coinsToDeduct);
                    }
                    setLoading(false);
                } catch {
                    setLoading(false);
                    Alert.alert('Error', 'Failed to deduct coins. Please try again.');
                    return;
                }
            }

            // Generate Text
            const generatedData = Array.from({ length: repetitions }, (_, index) => ({
                id: index,
                name: textValue,
            }));
            setResult(generatedData);
        } else {
            setRepetitionsError('Please enter a valid number of repetitions');
        }
    };

    return (
        <>
            <Wrapper>
                <StatusBar
                    animated={true}
                    barStyle={'dark-content'}
                    translucent
                    backgroundColor="transparent"
                />

                {/* ============================================= */}
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginTop: StatusBar.currentHeight,

                }}>
                    <View style={{
                        backgroundColor: COLORS.white,
                        paddingHorizontal: 20,
                        paddingVertical: 10,
                        borderRadius: 20,
                        flexDirection: 'row',
                        alignItems: 'center',
                        elevation: 3,
                    }}>
                        <Text style={{
                            fontSize: SIZES.responsiveScreenFontSize(1.7),
                            fontWeight: 'bold',
                            color: COLORS.primary,
                            marginRight: 10,
                        }}>
                            Coin: {(userData?.totalCoins || 0).toFixed(2)}
                        </Text>
                    </View>
                </View>

                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>

                    <LinearGradient
                        style={{
                            width: SIZES.responsiveScreenWidth(95),
                            marginTop: 15,
                            borderRadius: 5,
                            elevation: 2,
                            marginBottom: 1,
                        }}
                        locations={[0, 1]}
                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                        useAngle={true}
                        angle={190}>
                        <View>

                            <View style={{
                                marginHorizontal: 12,
                                marginTop: 8,
                            }}>
                                <FromInput
                                    label="enter_your_text_here..."
                                    placeholder="Enter your text here..."
                                    keyboardType="default"
                                    autocomplete="off"
                                    value={textValue}
                                    onChange={(value: any) => {

                                        setTextValue(value);
                                    }}
                                    errorMsg={null}
                                    appendComponent={null}
                                />
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                marginHorizontal: 12,
                                marginTop: -5,
                                marginBottom: 2,
                            }}>

                                <FromInput
                                    label="Repetitions"
                                    placeholder="Repetitions"
                                    keyboardType="number-pad"
                                    autocomplete="off"
                                    value={repetitions ?? 0}
                                    onChange={(value: any) => {

                                        setRepetitions(value);
                                    }}
                                    errorMsg={null}
                                    appendComponent={null}
                                />
                            </View>

                            <View style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: 5,
                            }}>
                                <View>
                                    {textValueError &&
                                        <Text style={{
                                            color: COLORS.red,
                                            fontSize: SIZES.responsiveScreenFontSize(1.7),
                                            fontWeight: 'bold',
                                        }}>
                                            {textValueError}
                                        </Text>}

                                    {repetitionsError &&
                                        <Text style={{
                                            color: COLORS.red,
                                            fontSize: SIZES.responsiveScreenFontSize(1.7),
                                            fontWeight: 'bold',
                                        }}>
                                            {repetitionsError}
                                        </Text>
                                    }
                                </View>

                                <TouchableOpacity
                                    style={{
                                        marginTop: 5,
                                        marginBottom: 15,
                                    }}
                                    onPress={handelRepetitions}
                                    activeOpacity={0.9}>

                                    <LinearGradient
                                        style={styles.linearGradientButton}
                                        locations={[0, 1]}
                                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                                        useAngle={true}
                                        angle={90}>
                                        <Text style={styles.linearGradientButtonText}>
                                            Generate Text {repetitions >= 150 ? `(${(Number(repetitions) * 0.06 - 6).toFixed(0)} Coins)` : ''}
                                        </Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </LinearGradient>
                </View>

                {/* =====================Repeated text will appear here======================== */}
                <View style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 2,
                }}>

                    <LinearGradient
                        style={{
                            width: SIZES.responsiveScreenWidth(95),
                            height: SIZES.responsiveScreenHeight(52),
                            marginTop: 10,
                            borderRadius: 5,
                            elevation: 2,
                            marginBottom: 1,
                        }}
                        locations={[0, 1]}
                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                        useAngle={true}
                        angle={190}>

                        <Text style={{
                            fontSize: SIZES.responsiveScreenFontSize(1.8),
                            color: COLORS.black,
                            fontWeight: '600',
                            textAlign: 'center',
                            marginTop: 10,
                        }}>
                            Repeated text will appear here...
                        </Text>

                        <View style={{
                            borderBottomWidth: 0.5,
                            borderColor: COLORS.black,
                            marginHorizontal: 12,
                            marginTop: 5,
                        }} />
                        <View style={{
                            borderBottomWidth: 0.5,
                            borderColor: COLORS.black,
                            marginHorizontal: 25,
                            marginTop: 5,
                            marginBottom: 15,
                        }} />

                        <FlatList
                            data={result}
                            keyExtractor={(item: any) => `${item.id}`}
                            showsHorizontalScrollIndicator={false}
                            renderItem={({ item, index }: any) => (
                                <Text
                                    key={index}
                                    style={{
                                        fontSize: SIZES.responsiveScreenFontSize(1.7),
                                        fontWeight: '700',
                                        color: COLORS.black,
                                        marginBottom: 5,
                                        marginHorizontal: 10,
                                    }}>
                                    {item.name}
                                </Text>
                            )}
                        />
                    </LinearGradient>


                    {/* ============================ */}

                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginTop: 15,
                    }}>

                        <TouchableOpacity
                            style={{
                                marginHorizontal: 10,
                            }}
                            onPress={handleCopy}
                            activeOpacity={0.9}>

                            <LinearGradient
                                style={{
                                    backgroundColor: COLORS.lightGray2,
                                    borderRadius: 5,
                                    width: SIZES.responsiveScreenWidth(29),
                                    height: SIZES.responsiveScreenWidth(8.5),
                                    elevation: 1.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                locations={[0, 1]}
                                colors={[COLORS.lightRed, COLORS.lightBlue]}
                                useAngle={true}
                                angle={90}>
                                <Text style={styles.linearGradientButtonText}>
                                    Copy
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginHorizontal: 10,
                            }}
                            onPress={handleShare}
                            activeOpacity={0.9}>
                            <LinearGradient
                                style={{
                                    backgroundColor: COLORS.lightGray2,
                                    borderRadius: 5,
                                    width: SIZES.responsiveScreenWidth(29),
                                    height: SIZES.responsiveScreenWidth(8.5),
                                    elevation: 1.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                locations={[0, 1]}
                                colors={[COLORS.lightRed, COLORS.lightBlue]}
                                useAngle={true}
                                angle={90}>
                                <Text style={styles.linearGradientButtonText}>
                                    Share
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={{
                                marginHorizontal: 10,
                            }}
                            onPress={handleReset}
                            activeOpacity={0.9}>
                            <LinearGradient
                                style={{
                                    backgroundColor: COLORS.lightGray2,
                                    borderRadius: 5,
                                    width: SIZES.responsiveScreenWidth(29),
                                    height: SIZES.responsiveScreenWidth(8.5),
                                    elevation: 1.5,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                locations={[0, 1]}
                                colors={[COLORS.lightRed, COLORS.lightBlue]}
                                useAngle={true}
                                angle={90}>
                                <Text style={styles.linearGradientButtonText}>
                                    Reset
                                </Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>

                </View>

            </Wrapper>

            <LoadingScreen visible={loading} />

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
});

export default Home;
