import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { applyMiddleware, createStore } from 'redux';

import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Provider } from 'react-redux';
import { thunk } from 'redux-thunk';
import UserBottomNavigator from './src/navigation/UserBottomNavigator';
import ForgotNewPasswordScreen from './src/screens/Authentication/ForgotNewPasswordScreen';
import ForgotPasswordOtpVerificationScreen from './src/screens/Authentication/ForgotPasswordOtpVerificationScreen';
import ForgotPasswordScreen from './src/screens/Authentication/ForgotPasswordScreen';
import SignUpScreen from './src/screens/Authentication/SignUpScreen';
import SigninScreen from './src/screens/Authentication/SigninScreen';
import MyUserProfileScreen from './src/screens/MyUserProfileScreen';
import PurchaseHistoryScreen from './src/screens/PurchaseHistoryScreen';
import rootReducer from './src/stores/rootReducer';


const Stack = createStackNavigator();

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);



const AppStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
      detachPreviousScreen: false,
    }}
  >
    <Stack.Screen
      name="UserHomeScreen"
      component={UserBottomNavigator}
      options={{ headerShown: false }}
    />

    <Stack.Screen
      name="MyUserProfileScreen"
      component={MyUserProfileScreen}
    />
    <Stack.Screen
      name="PurchaseHistoryScreen"
      component={PurchaseHistoryScreen}
    />
  </Stack.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
      ...TransitionPresets.SlideFromRightIOS,
      detachPreviousScreen: false,
    }}
    initialRouteName="SigninScreen"
  >
    <Stack.Screen
      name="SigninScreen"
      component={SigninScreen}
    />
    <Stack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
    />
    <Stack.Screen
      name="ForgotPasswordScreen"
      component={ForgotPasswordScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ForgotPasswordOtpVerificationScreen"
      component={ForgotPasswordOtpVerificationScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="ForgotNewPasswordScreen"
      component={ForgotNewPasswordScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

import { AuthProvider, useAuth } from './src/context/AuthContext';
import LoadingScreen from './src/screens/LoadingScreen';

const AppContent = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen visible={false} />;
  }

  return (
    <NavigationContainer>
      {user ? <AppStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <AuthProvider>
          <AppContent />
        </AuthProvider>
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;
