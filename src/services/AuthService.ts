import auth from '@react-native-firebase/auth';
import firestore, { increment } from '@react-native-firebase/firestore';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { UserData } from '../models/User';

const USERS_COLLECTION = 'users';

// Configure Google Signin (Replace webClientId with your actual client ID from Firebase Console)
GoogleSignin.configure({
    webClientId: '748790532334-uo365p7bi7f6nt1e04svbg71ulq4h5up.apps.googleusercontent.com',
});

export const AuthService = {
    signUpWithEmail: async (name: string, email: string, password: string): Promise<UserData> => {
        try {
            // 1. Create user in Firebase Auth
            const userCredential = await auth().createUserWithEmailAndPassword(email, password);
            const { user } = userCredential;

            if (!user) {
                throw new Error('User creation failed');
            }

            // 2. Prepare User Data for Firestore
            const newUserData: UserData = {
                uid: user.uid,
                name: name,
                email: email,
                totalCoins: 0,
                totalCashOutCoins: 0,
                totalCashInCoins: 0,
                createdAt: Date.now(),
                profileImage: '',
                phoneNumber: '',
            };

            // 3. Save to Firestore
            await firestore().collection(USERS_COLLECTION).doc(user.uid).set(newUserData);

            // 4. Update Display Name in Auth (Optional but good practice)
            await user.updateProfile({ displayName: name });

            return newUserData;
        } catch (error: any) {
            console.error('Sign Up Error:', error);
            throw error;
        }
    },

    signInWithEmail: async (email: string, password: string): Promise<UserData> => {
        try {
            // 1. Sign In with Firebase Auth
            const userCredential = await auth().signInWithEmailAndPassword(email, password);
            const { user } = userCredential;

            if (!user) {
                throw new Error('Sign In failed');
            }

            // 2. Fetch User Data from Firestore
            const userDoc = await firestore().collection(USERS_COLLECTION).doc(user.uid).get();

            if (!userDoc.exists()) {
                // Handle edge case where Auth and Firestore are out of sync
                 const fallbackUser: UserData = {
                    uid: user.uid,
                    name: user.displayName || 'User',
                    email: user.email!,
                    totalCoins: 0,
                    totalCashOutCoins: 0,
                    totalCashInCoins: 0,
                    createdAt: Date.now(),
                };
                return fallbackUser;
            }

            return userDoc.data() as UserData;
        } catch (error: any) {
            console.error('Sign In Error:', error);
            throw error;
        }
    },

    signOut: async () => {
        try {
            await auth().signOut();
        } catch (error) {
            console.error('Sign Out Error:', error);
            throw error;
        }
    },

    getUserData: async (uid: string): Promise<UserData | null> => {
        try {
            const userDoc = await firestore().collection(USERS_COLLECTION).doc(uid).get();
            if (userDoc.exists()) {
                return userDoc.data() as UserData;
            }
            return null;
        } catch (error) {
            console.error('Get User Data Error:', error);
            return null;
        }
    },

    addCoins: async (uid: string, amount: number): Promise<void> => {
        try {
            const userRef = firestore().collection(USERS_COLLECTION).doc(uid);
            await userRef.update({
                totalCoins: increment(amount),
                totalCashInCoins: increment(amount),
            });
        } catch (error) {
            console.error('Add Coins Error:', error);
            throw error;
        }
    },

    deductCoins: async (uid: string, amount: number): Promise<void> => {
        try {
            const userRef = firestore().collection(USERS_COLLECTION).doc(uid);
            // Ensure amount is a number with 2 decimal places before negating
            const deductAmount = parseFloat(amount.toFixed(2));

            await userRef.update({
                totalCoins: increment(-deductAmount),
            });
        } catch (error) {
            console.error('Deduct Coins Error:', error);
            throw error;
        }
    },

    recordPurchase: async (uid: string, purchaseData: any): Promise<void> => {
        try {
            const purchaseRef = firestore()
                .collection(USERS_COLLECTION)
                .doc(uid)
                .collection('purchase_history')
                .doc(); // Auto-generate ID

            await purchaseRef.set({
                ...purchaseData,
                id: purchaseRef.id,
                userId: uid,
                timestamp: Date.now(),
            });

        } catch (error) {
            console.error('Record Purchase Error:', error);
            // Don't throw here to avoid disrupting the UI flow if logging fails
        }
    },

    signInWithGoogle: async (): Promise<UserData> => {
        try {
            // 1. Check if Play Services are available
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

            // 2. Sign in with Google
            // 2. Sign in with Google
            const response: any = await GoogleSignin.signIn();
            const idToken = response.data?.idToken || response.idToken;

            if (!idToken) {
                 throw new Error('Google Sign-In failed: No idToken found');
            }

            // 3. Create a Google credential with the token
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);

            // 4. Sign-in the user with the credential
            const userCredential = await auth().signInWithCredential(googleCredential);
            const { user } = userCredential;

            if (!user) {
                throw new Error('Google Sign-In failed: No user returned');
            }

            // 5. Check if user exists in Firestore, if not create/update
            const userDoc = await firestore().collection(USERS_COLLECTION).doc(user.uid).get();

            let userData: UserData;

            if (userDoc.exists()) {
                 userData = userDoc.data() as UserData;
            } else {
                 // Create new user data
                 userData = {
                    uid: user.uid,
                    name: user.displayName || 'Google User',
                    email: user.email || '',
                    totalCoins: 0,
                    totalCashOutCoins: 0,
                    totalCashInCoins: 0,
                    createdAt: Date.now(),
                    profileImage: user.photoURL || '',
                    phoneNumber: user.phoneNumber || '',
                };
                await firestore().collection(USERS_COLLECTION).doc(user.uid).set(userData);
            }

            return userData;
        } catch (error) {
            console.error('Google Sign-In Error:', error);
            throw error;
        }
    },

    deleteUserAccount: async (uid: string): Promise<void> => {
        try {
            const user = auth().currentUser;

            if (!user) {
                throw new Error('No authenticated user found');
            }

            // Helper function to delete a collection in batches
            const deleteQueryBatch = async (query: any) => {
                const snapshot = await query.get();

                const batchSize = snapshot.size;
                if (batchSize === 0) {
                    return;
                }

                const batch = firestore().batch();
                snapshot.docs.forEach((doc: any) => {
                    batch.delete(doc.ref);
                });
                await batch.commit();

                await deleteQueryBatch(query);
            };

            const deleteCollection = async (collectionPath: string) => {
                const collectionRef = firestore().collection(collectionPath);
                const query = collectionRef.orderBy('__name__').limit(500);

                await deleteQueryBatch(query);
            };

            // 1. Delete Purchase History Subcollection
            // Construct the path: users/{uid}/purchase_history
            const purchaseHistoryPath = `${USERS_COLLECTION}/${uid}/purchase_history`;
            await deleteCollection(purchaseHistoryPath);

            // 2. Delete User Data from Firestore
            await firestore().collection(USERS_COLLECTION).doc(uid).delete();

            // 3. Delete User from Firebase Auth
            await user.delete();

        } catch (error) {
            console.error('Delete Account Error:', error);
            throw error;
        }
    },
};
