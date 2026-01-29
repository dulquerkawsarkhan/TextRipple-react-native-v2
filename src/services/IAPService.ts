import { Platform } from 'react-native';
import * as RNIap from 'react-native-iap';
import { AuthService } from './AuthService';

const itemSkus = Platform.select({
    ios: [
        'coins_40_v2',
        'coins_75',
        'coins_90',
        'coins_100',
        'coins_175',
        'coins_185',
        'coins_200',
        'coins_320',
        'coins_340',
        'coins_430',
        'coins_450',
        'coins_530',
        'coins_1050',
    ],
    android: [
        'coins_40_v2',
        'coins_75',
        'coins_90',
        'coins_100',
        'coins_175',
        'coins_185',
        'coins_200',
        'coins_320',
        'coins_340',
        'coins_430',
        'coins_450',
        'coins_530',
        'coins_1050',
    ],
});

export interface CoinProduct {
    sku: string;
    coins: number;
    price: string;
    currency: string;
    description: string;
    title: string;
}

class IAPServiceClass {
    products: RNIap.Product[] = [];
    purchaseUpdateSubscription: any = null;
    purchaseErrorSubscription: any = null;

    async init() {
        try {
            console.log('IAP: Initializing connection...');
            const result = await RNIap.initConnection();
            console.log('IAP: Connection initialized', result);

            if (itemSkus && itemSkus.length > 0) {
                console.log('IAP: Fetching products for SKUs:', itemSkus);
                // @ts-ignore
                this.products = await RNIap.getProducts({ skus: itemSkus });
                console.log('IAP: Products fetched:', this.products.length);
            } else {
                console.warn('IAP Init: No SKUs defined for this platform');
            }
        } catch (err) {
            console.warn('IAP Init Error:', err);
        }
    }

    async getProducts(): Promise<RNIap.Product[]> {
        if (this.products.length === 0 && itemSkus) {
             try {
                console.log('IAP: Retrying fetch products...');
                // @ts-ignore
                this.products = await RNIap.getProducts({ skus: itemSkus });
                console.log('IAP: Products fetched (retry):', this.products.length);
            } catch (err) {
                console.warn('IAP Get Products Error:', err);
                return [];
            }
        }
        return this.products;
    }

    private onPurchaseSuccess?: (sku: string) => void;
    private userId?: string;

    async requestPurchase(sku: string) {
        try {
            console.log('IAP: Requesting purchase for SKU:', sku);
            // Unified API for v12+
            // @ts-ignore
            await RNIap.requestPurchase({ sku });
        } catch (err: any) {
            if (__DEV__ && (err.message.includes('sku was not found') || err.message.includes('Billing is unavailable'))) {
                console.log('DEV MODE: Simulating purchase for', sku);
                const coins = parseInt(sku.split('_')[1], 10);
                if (this.userId && !isNaN(coins)) {
                    await AuthService.addCoins(this.userId, coins);
                    await AuthService.recordPurchase(this.userId, {
                        coins,
                        sku,
                        transactionId: 'dev_mode_' + Date.now(),
                        description: `Purchased ${coins} Coins (Dev)`,
                    });
                    if (this.onPurchaseSuccess) {
                        this.onPurchaseSuccess(sku);
                    }
                    return;
                }
            }
            console.warn('IAP Request Purchase Error:', err);
            throw err;
        }
    }

    startPurchaseListener(userId: string, onPurchaseSuccess: (sku: string) => void) {
        this.userId = userId;
        this.onPurchaseSuccess = onPurchaseSuccess;

        this.purchaseUpdateSubscription = RNIap.purchaseUpdatedListener(async (purchase: RNIap.Purchase) => {


            try {
                // Acknowledge the purchase thoroughly
                await RNIap.finishTransaction({ purchase, isConsumable: true });

                // Parse coins from SKU
                const coins = parseInt(purchase.productId.split('_')[1], 10);


                if (!isNaN(coins)) {
                        await AuthService.addCoins(userId, coins);
                        await AuthService.recordPurchase(userId, {
                            coins,
                            sku: purchase.productId,
                            transactionId: purchase.transactionId,
                            description: `Purchased ${coins} Coins`,
                        });
                        if (onPurchaseSuccess) {
                            onPurchaseSuccess(purchase.productId);
                        }

                } else {
                    console.warn('IAP: Could not parse coins from SKU');
                }

            } catch (ackErr) {
                console.warn('IAP Update/Ack Error:', ackErr);
            }
        });

        this.purchaseErrorSubscription = RNIap.purchaseErrorListener((error: RNIap.PurchaseError) => {
            console.warn('IAP Purchase Error:', error);
        });
    }

    endPurchaseListener() {
        if (this.purchaseUpdateSubscription) {
            this.purchaseUpdateSubscription.remove();
            this.purchaseUpdateSubscription = null;
        }
        if (this.purchaseErrorSubscription) {
            this.purchaseErrorSubscription.remove();
            this.purchaseErrorSubscription = null;
        }
    }

    async endConnection() {
        try {
             await RNIap.endConnection();
        } catch(err) {
             console.warn('IAP End Connection Error', err);
        }
    }
}

export const IAPService = new IAPServiceClass();
