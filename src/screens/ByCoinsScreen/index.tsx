import React, { useEffect, useState } from 'react';
import {
    Alert,
    FlatList,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SingleImageHeaderWithoutBack from '../../components/SingleImageHeaderWithoutBack';
import Wrapper from '../../components/Wrapper';
import { COLORS, SIZES, icons } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { AuthService } from '../../services/AuthService';
import { IAPService } from '../../services/IAPService';
import LoadingScreen from '../LoadingScreen';

const coinsSet = [
    { coin: 40, price: 0.51, sku: 'coins_40_v2' },
    { coin: 75, price: 1.00, sku: 'coins_75' },
    { coin: 90, price: 1.01, sku: 'coins_90' },
    { coin: 100, price: 1.02, sku: 'coins_100' },
    { coin: 175, price: 2.00, sku: 'coins_175' },
    { coin: 185, price: 2.01, sku: 'coins_185' },
    { coin: 200, price: 2.02, sku: 'coins_200' },
    { coin: 320, price: 3.01, sku: 'coins_320' },
    { coin: 340, price: 3.02, sku: 'coins_340' },
    { coin: 430, price: 4.00, sku: 'coins_430' },
    { coin: 450, price: 4.01, sku: 'coins_450' },
    { coin: 530, price: 5.00, sku: 'coins_530' },
    { coin: 1050, price: 10.01, sku: 'coins_1050' },
];

const ByCoinsScreen = () => {
    const { userData } = useAuth();
    const userId = userData?.uid;
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const initIAP = async () => {
            try {
                setLoading(true);
                await IAPService.init();
                const products = await IAPService.getProducts();


                if (products.length === 0) {
                    Alert.alert('IAP Debug', 'No products details fetched from Store. Please check if SKUs match Google Play Console and App is Signed correctly.');
                }
            } catch (error: any) {
                console.error('IAP Init Error:', error);
                Alert.alert('IAP Init Error', error.message || 'Unknown error');
            } finally {
                setLoading(false);
            }
        };

        initIAP();

        if (userId) {
            IAPService.startPurchaseListener(userId, (sku) => {
                console.log('Purchase successful for SKU:', sku);
                Alert.alert('Success', 'Coins added to your wallet!');
            });
        }

        return () => {
            IAPService.endPurchaseListener();
            IAPService.endConnection();
        };
    }, [userId]);

    const handleBuyCoin = async (item: any) => {
        try {
            if (userId) {
                setLoading(true);
                const sku = item.sku;
                await IAPService.requestPurchase(sku);

                await AuthService.getUserData(userId);
            }
        } catch (error: any) {
            console.log('Purchase Request Error:', error);
            Alert.alert('Purchase Failed', error.message || 'Unknown error occurred');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Wrapper>
                <View style={styles.container}>
                    <SingleImageHeaderWithoutBack
                        name={'Coins'}
                    />

                    <View style={styles.contentContainer}>
                        <FlatList
                            style={styles.flatList}
                            data={coinsSet}
                            keyExtractor={item => `${item.coin}`}
                            horizontal={false}
                            numColumns={3}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item }) => (

                                <TouchableOpacity
                                    activeOpacity={0.9}
                                    onPress={() => handleBuyCoin(item)}
                                >

                                    <LinearGradient
                                        style={styles.gradientItem}
                                        locations={[0, 1]}
                                        colors={[COLORS.lightRed, COLORS.lightBlue]}
                                        useAngle={true}
                                        angle={90}>

                                        <View style={styles.itemContent}>

                                            <Image
                                                style={styles.coinImage}
                                                source={icons.coins_1}
                                            />

                                            <View style={styles.textContainer}>
                                                <Text style={styles.priceText}>
                                                    {` $${item.price}`}
                                                </Text>
                                                <Text style={styles.coinsText}>
                                                    {`${item.coin} Coins`}
                                                </Text>
                                            </View>
                                        </View>
                                    </LinearGradient>
                                </TouchableOpacity>
                            )}

                            ListFooterComponent={<View style={styles.footer} />}
                        />
                    </View>
                </View>
            </Wrapper>
            <LoadingScreen visible={loading} />
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    flatList: {
        marginTop: 10,
    },
    gradientItem: {
        backgroundColor: COLORS.darkRed,
        borderRadius: 5,
        width: SIZES.responsiveScreenWidth(29),
        height: SIZES.responsiveScreenWidth(29),
        elevation: 1,
        marginBottom: 5,
        marginTop: 5,
        justifyContent: 'center',
        marginHorizontal: 5,
    },
    itemContent: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    coinImage: {
        width: SIZES.responsiveScreenWidth(14),
        height: SIZES.responsiveScreenWidth(14),
    },
    textContainer: {
        marginTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    priceText: {
        fontSize: SIZES.responsiveScreenFontSize(1.6),
        fontWeight: '700',
        color: COLORS.black,
        marginHorizontal: 5,
    },
    coinsText: {
        fontSize: SIZES.responsiveScreenFontSize(1.7),
        fontWeight: '700',
        color: COLORS.black,
        marginHorizontal: 5,
        marginTop: -1,
    },
    footer: {
        marginBottom: 70,
    },
});

export default ByCoinsScreen;
