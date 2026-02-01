/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, icons, SIZES } from '../constants';
import ByCoinsScreen from '../screens/ByCoinsScreen';
import HomeScreen from '../screens/HomeScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import TabButton from './TabButton';
const TabArr = [
  {
    route: 'Home',
    label: 'Home',
    activeIcon: icons.home,
    inActiveIcon: icons.home,
    component: HomeScreen,
  },
  {
    route: 'ByCoinsScreen',
    label: 'ByCoinsScreen',
    activeIcon: icons.coupon,
    inActiveIcon: icons.coupon,
    component: ByCoinsScreen,
  },
  {
    route: 'ProfileScreen',
    label: 'ProfileScreen',
    activeIcon: icons.profile,
    inActiveIcon: icons.profile,
    component: UserProfileScreen,
  },
];

const Tab = createBottomTabNavigator();


export default function AnimTab1() {
  return (

    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarBackground: () => (
          <View style={StyleSheet.absoluteFill}>
            <LinearGradient
              style={{
                flex: 1,
                borderRadius: 16,

              }}
              locations={[0, 1]}
              colors={[COLORS.lightRed, COLORS.lightBlue]}
              useAngle={true}
              angle={190}
            />
          </View>
        ),
        tabBarStyle: {
          height: SIZES.responsiveScreenWidth(15),
          position: 'absolute',
          bottom: 20,

          marginHorizontal: '5%',
          width: '90%',
          borderRadius: 16,
          backgroundColor: 'transparent',
          borderTopWidth: 0,
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
      }}>
      {TabArr &&
        TabArr.map((item, index) => {

          return (
            <Tab.Screen
              key={index}
              name={item.route}
              component={item.component}
              options={{
                tabBarShowLabel: false,

                tabBarButton: (props: any) => <TabButton
                  {...props}
                  item={item}
                />,
              }}
            />
          );
        })}
    </Tab.Navigator>

  );
}

