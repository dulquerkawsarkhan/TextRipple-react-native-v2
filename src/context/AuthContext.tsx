import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import firestore, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { UserData } from '../models/User';
import { AuthService } from '../services/AuthService';

interface AuthContextData {
    user: FirebaseAuthTypes.User | null;
    userData: UserData | null;
    isLoading: boolean;
    signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
    const [userData, setUserData] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsubscribeAuth = auth().onAuthStateChanged(async (currentUser) => {
            setUser(currentUser);
            // We don't need to fetch data here; the second useEffect will react to 'user' change.
            if (!currentUser) {
                setIsLoading(false);
            }
        });

        return unsubscribeAuth;
    }, []);

    // Better pattern: Separate effect for Firestore listener
    useEffect(() => {
        let unsubscribeFirestore: (() => void) | undefined;

        if (user) {
            setIsLoading(true); // Loading while fetching data
            unsubscribeFirestore = firestore()
                .collection('users')
                .doc(user.uid)
                .onSnapshot(
                    (doc: FirebaseFirestoreTypes.DocumentSnapshot) => {
                        if (doc.exists()) {

                            setUserData(doc.data() as UserData);
                        } else {
                            setUserData(null);
                        }
                        setIsLoading(false);
                    },
                    (error: Error) => {
                        console.error('AuthContext: Failed to fetch user data on snapshot:', error);
                        setUserData(null);
                        setIsLoading(false);
                    }
                );
        } else {
            setUserData(null);
            // If we just logged out, loading is done
            // If we are starting up, the auth listener handles initial loading state
            // valid transition: user defined -> null.
        }

        return () => {
            if (unsubscribeFirestore) {
                unsubscribeFirestore();
            }
        };
    }, [user]);

    const signOut = async () => {
        try {
            await AuthService.signOut();
        } catch (error) {
            console.error('Sign Out Error:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{ user, userData, isLoading, signOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
