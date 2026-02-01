import { Platform } from 'react-native';
import {
    endConnection,
    fetchProducts,
    finishTransaction,
    initConnection, // Changed from getProducts
    Product,
    Purchase,
    PurchaseError,
    purchaseErrorListener,
    purchaseUpdatedListener,
    requestPurchase,
} from 'react-native-iap';
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
        'coins_330', // Added as fallback
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
        'coins_330', // Added as fallback
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
    products: Product[] = [];
    purchaseUpdateSubscription: any = null;
    purchaseErrorSubscription: any = null;
    connectionInitialized: boolean = false;

    async init() {
        try {
            if (this.connectionInitialized) {
                console.log('IAP: Connection already initialized');
                return;
            }

            console.log('IAP: Initializing connection...');
            const result = await initConnection();
            this.connectionInitialized = result;
            console.log('IAP: Connection initialized', result);

            if (Platform.OS === 'android') {
                 // Android specific init if needed future
            }

            if (itemSkus && itemSkus.length > 0) {
                console.log('IAP: Fetching products for SKUs:', itemSkus);
                // @ts-ignore
                this.products = await fetchProducts({ skus: itemSkus });
                console.log('IAP: Products fetched:', this.products.length);
            } else {
                console.warn('IAP Init: No SKUs defined for this platform');
            }
        } catch (err) {
            console.warn('IAP Init Error:', err);
             // Propagate error or handle it, but allow app to continue
        }
    }

    async getProducts(): Promise<Product[]> {
        if (itemSkus) {
             try {
                // Always try to fetch if empty, or refresh
                if (this.products.length === 0) {
                     console.log('IAP: Retrying fetch products...');
                    // @ts-ignore
                    this.products = await fetchProducts({ skus: itemSkus });
                    console.log('IAP: Products fetched (retry):', this.products.length);
                
                    console.log('IAP: Products fetched:', this.products);
                    console.log('IAP: -------------:', this.products);
                }
            } catch (err) {
                console.warn('IAP Get Products Error:', err);
                console.log('IAP--- Get Products Error:', err);
                return [];
            }
        }
        return this.products;
    }

    private onPurchaseSuccess?: (sku: string) => void;
    private userId?: string;

    async requestPurchase(sku: string) {
        try {
            if (!this.connectionInitialized) {
                 await this.init();
            }
            console.log('IAP: Requesting purchase for SKU:', sku);
            
            // Check if product exists in fetched products
            const productExists = this.products.some(p => p.id === sku);

            if (!productExists) {
                console.warn('IAP: Product not found in fetched products. Skipping store request.');
                if (__DEV__) {
                     throw new Error('sku was not found (simulated for Dev)');
                }
            }

            // Unified API for v12+
            // @ts-ignore
            await requestPurchase({ sku });
        } catch (err: any) {
            // Enhanced error handling for Dev Mode simulation
            const isDevModeError = __DEV__ || (err.message && (err.message.includes('sku was not found') || err.message.includes('Billing is unavailable') || err.message.includes('Missing purchase request configuration')));
            
            if (isDevModeError) {
                console.log('DEV MODE: Simulating purchase for', sku);
                const coins = parseInt(sku.replace('coins_', '').replace('_v2', ''), 10);
                
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

        if (this.purchaseUpdateSubscription) {
             this.purchaseUpdateSubscription.remove();
        }

        this.purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase: Purchase) => {


            try {
                // Acknowledge the purchase thoroughly
                await finishTransaction({ purchase, isConsumable: true });

                // Parse coins from SKU
                 let coins = parseInt(purchase.productId.replace('coins_', '').replace('_v2', ''), 10);


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
                    console.warn('IAP: Could not parse coins from SKU', purchase.productId);
                }

            } catch (ackErr) {
                console.warn('IAP Update/Ack Error:', ackErr);
            }
        });

        if (this.purchaseErrorSubscription) {
             this.purchaseErrorSubscription.remove();
        }

        this.purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
            console.warn('IAP Purchase Error Listener:', error);
            // Don't alert here, just log. UI handling should be in request path if possible.
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
             if (this.connectionInitialized) {
                 await endConnection();
                 this.connectionInitialized = false;
             }
        } catch(err) {
             console.warn('IAP End Connection Error', err);
        }
    }
}

export const IAPService = new IAPServiceClass();
