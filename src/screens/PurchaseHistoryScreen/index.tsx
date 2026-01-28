/* eslint-disable react-native/no-inline-styles */
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import AppStatusBar from '../../components/AppStatusBar';
import Wrapper from '../../components/Wrapper';
import { COLORS, SIZES, icons } from '../../constants';
import { useAuth } from '../../context/AuthContext';
import { PurchaseHistory } from '../../models/PurchaseHistory';
import LoadingScreen from '../LoadingScreen';

const PurchaseHistoryScreen = () => {
    const navigation = useNavigation();

    const { userData } = useAuth();
    const [history, setHistory] = useState<PurchaseHistory[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            if (!userData?.uid) {
                return;
            }

            try {
                const snapshot = await firestore()
                    .collection('users')
                    .doc(userData.uid)
                    .collection('purchase_history')
                    .orderBy('timestamp', 'desc')
                    .get();

                const loadedHistory: PurchaseHistory[] = snapshot.docs.map((doc: FirebaseFirestoreTypes.DocumentSnapshot) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as PurchaseHistory[];

                setHistory(loadedHistory);
            } catch (error) {
                console.error('Error fetching purchase history:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchHistory();
    }, [userData?.uid]);

    const renderItem = ({ item }: { item: PurchaseHistory }) => {
        const date = new Date(item.timestamp).toLocaleDateString();
        const time = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        return (
            <LinearGradient
                style={styles.card}
                locations={[0, 1]}
                colors={[COLORS.lightRed, COLORS.lightBlue]}
                useAngle={true}
                angle={10}
            >
                <View style={styles.cardContent}>
                    <Image source={icons.correct} style={styles.icon} />
                    <View style={styles.textContainer}>
                        <Text style={styles.description}>{item.description}</Text>
                        <Text style={styles.date}>{date} at {time}</Text>
                        {/* <Text style={styles.transactionId}>ID: {item.transactionId}</Text> */}
                    </View>
                    <View style={styles.coinContainer}>
                        <Text style={styles.coinText}>+{item.coins}</Text>
                        <Image source={icons.coins_1} style={styles.coinIcon} />
                    </View>
                </View>
            </LinearGradient>
        );
    };

    return (
        <Wrapper>


            <AppStatusBar />
            <View
                style={{
                    height: 40,
                    flexDirection: 'row',
                    marginTop: 1,
                    alignItems: 'center',
                    marginHorizontal: 6,
                    justifyContent: 'space-between',
                    width: SIZES.responsiveScreenWidth(97),

                }}
            >
                <TouchableOpacity

                    activeOpacity={0.9}
                    onPress={() => navigation.goBack()}

                    style={{
                        width: SIZES.responsiveScreenWidth(11),
                        height: SIZES.responsiveScreenWidth(11),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                >
                    <Image
                        source={icons.back}
                        style={{
                            width: SIZES.responsiveScreenWidth(5),
                            height: SIZES.responsiveScreenWidth(5),
                            tintColor: COLORS.black,
                        }} />

                </TouchableOpacity>

                <Text style={{
                    fontSize: SIZES.responsiveScreenFontSize(1.8),
                    fontWeight: '800',
                    color: COLORS.primary,
                }}>
                    {'Purchase History'}
                </Text>



                <View


                    style={{
                        width: SIZES.responsiveScreenWidth(11),
                        height: SIZES.responsiveScreenWidth(11),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}

                />
            </View>


            <View style={styles.container}>
                {loading ? (
                    <LoadingScreen visible={true} />
                ) : history.length === 0 ? (
                    <View style={styles.emptyContainer}>
                        <Text style={styles.emptyText}>No purchase history found.</Text>
                    </View>
                ) : (
                    <FlatList
                        data={history}
                        keyExtractor={(item) => item.id}
                        renderItem={renderItem}
                        contentContainerStyle={styles.listContent}
                        showsVerticalScrollIndicator={false}
                    />
                )}
            </View>
        </Wrapper>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
    },
    listContent: {
        paddingBottom: 20,
        paddingTop: 10,
        width: SIZES.responsiveScreenWidth(100),
        alignItems: 'center',
    },
    card: {
        borderRadius: 10,
        elevation: 2,
        marginVertical: 5,
        width: SIZES.responsiveScreenWidth(90),
        padding: 15,
        justifyContent: 'center',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 30,
        height: 30,
        tintColor: COLORS.primary,
        marginRight: 10,
    },
    textContainer: {
        flex: 1,
    },
    description: {
        color: COLORS.primary,
        fontWeight: '700',
        fontSize: SIZES.responsiveScreenFontSize(1.6),
    },
    date: {
        color: COLORS.gray,
        fontSize: SIZES.responsiveScreenFontSize(1.4),
        marginTop: 2,
    },
    transactionId: {
        color: COLORS.gray,
        fontSize: SIZES.responsiveScreenFontSize(1.2),
        marginTop: 2,
    },
    coinContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinText: {
        color: COLORS.primary,
        fontWeight: 'bold',
        fontSize: SIZES.responsiveScreenFontSize(1.8),
        marginRight: 5,
    },
    coinIcon: {
        width: 20,
        height: 20,
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        color: COLORS.gray,
        fontSize: 16,
    },
});

export default PurchaseHistoryScreen;
