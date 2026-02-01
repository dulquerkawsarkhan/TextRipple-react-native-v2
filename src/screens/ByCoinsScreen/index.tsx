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


    // State to hold valid products (initially empty, no fallback)
    const [productsData, setProductsData] = useState<any[]>([]);
    // State to show error message if fetch fails or returns empty
    const [fetchError, setFetchError] = useState<string | null>(null);

    useEffect(() => {
        const initIAP = async () => {
            try {
                // Initializing IAP
                // setLoading(true); // Optional: Blocking or non-blocking loading
                await IAPService.init();
                const fetchedProducts = await IAPService.getProducts();

                console.log('IAP: Fetched products raw:', JSON.stringify(fetchedProducts, null, 2));

                if (fetchedProducts && fetchedProducts.length > 0) {
                    console.log('IAP: Fetched products from store, updating UI');
                    // Merge fetched product info (price, currency) with local configuration (coins amount)
                    const updatedData = coinsSet.map(localItem => {
                        const storeItem = fetchedProducts.find(p => p.id === localItem.sku);

                        if (!storeItem) {
                            console.log(`IAP Match Fail: Local SKU '${localItem.sku}' not found in store products.`);
                        }

                        if (storeItem) {
                            return {
                                ...localItem,
                                price: storeItem.displayPrice || storeItem.price, // Use localized displayPrice if available, else raw price
                                currency: storeItem.currency,
                                title: storeItem.title,
                                description: storeItem.description
                            };
                        }
                        return null; // Start by returning null for unmatched items
                    }).filter(item => item !== null); // Only keep items that exist in Store

                    console.log('IAP: Matched products count:', updatedData.length);

                    if (updatedData.length > 0) {
                        setProductsData(updatedData);
                        setFetchError(null);
                    } else {
                        // This case happens if store returns products but none match our coinsSet SKUs
                        setFetchError('Products available in Store do not match App configuration.');
                    }
                } else {
                    console.log('IAP Debug: No products details fetched from Store.');
                    setFetchError(`DEBUG MODE: Google returned 0 products.\n\nPossible Causes:\n1. App signature mismtach\n2. User not a tester\n3. Play Store cache needs clearing\n\nRequested SKUs:\n${(coinsSet.map(c => c.sku)).join(', ')}`);
                }
            } catch (error: any) {
                console.error('IAP Init Error:', error);
                setFetchError(`Failed: ${error.message || JSON.stringify(error)}`);
            } finally {
                setLoading(false);
            }
        };

        const setupListener = () => {
            if (userId) {
                IAPService.startPurchaseListener(userId, (sku) => {
                    console.log('Purchase successful for SKU:', sku);
                    Alert.alert('Success', 'Coins added to your wallet!');
                });
            }
        };

        initIAP();
        setupListener();

        return () => {
            // Cleanup if needed
            IAPService.endPurchaseListener();
            // IAPService.endConnection(); // Keep connection alive for better performance and stability
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
            // Alert.alert('Purchase Failed', error.message || 'Unknown error occurred');
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
                        {fetchError ? (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>{fetchError}</Text>
                            </View>
                        ) : (
                            <FlatList
                                style={styles.flatList}
                                data={productsData}
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
                                                        {typeof item.price === 'number' ? `$${item.price}` : item.price}
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
                        )}
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
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    errorText: {
        fontSize: SIZES.responsiveScreenFontSize(2),
        color: COLORS.black,
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default ByCoinsScreen;
