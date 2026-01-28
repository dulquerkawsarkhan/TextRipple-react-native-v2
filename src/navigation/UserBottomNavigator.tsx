/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react-native/no-inline-styles */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { COLORS, icons } from '../constants';
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
        tabBarBackground: () => {
          return (
            <View style={{ flex: 1 }}>
              <LinearGradient
                style={{

                  width: '100%',
                  height: 60,
                  borderRadius: 16,
                  overflow: 'hidden',

                }}
                locations={[0.2, 1]}
                colors={[COLORS.lightRed, COLORS.lightBlue]}
                useAngle={true}
                angle={190} />



            </View>
          );
        },
        tabBarStyle: {
          height: 55,
          position: 'absolute',
          bottom: 20,
          right: 16,
          left: 16,
          borderRadius: 16,
          alignItems: 'center',
          justifyContent: 'center',
          paddingBottom: 0,
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

