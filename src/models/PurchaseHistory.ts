export interface PurchaseHistory {
    id: string;
    userId: string;
    coins: number;
    sku: string;
    transactionId: string;
    timestamp: number;
    description: string; // e.g., "Purchased 100 Coins"
}
