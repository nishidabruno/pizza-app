import React, { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';
import firestore from '@react-native-firebase/firestore';

import { Home } from '@screens/Home';
import { Orders } from '@screens/Orders';
import { BottomTabMenu } from '@components/BottomTabMenu';

const { Navigator, Screen } = createBottomTabNavigator();

export function UserTabRoutes() {
  const [notifications, setNotifications] = useState('0');

  const { COLORS } = useTheme();

  useEffect(() => {
    const subscribe = firestore()
      .collection('orders')
      .where('status', '==', 'Pending')
      .onSnapshot(documentSnapshot => {
        setNotifications(String(documentSnapshot.docs.length))
      })

    return () => subscribe();
  }, []);

  return (
    <Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarActiveTintColor: COLORS.SECONDARY_900,
      tabBarInactiveTintColor: COLORS.SECONDARY_400,
      tabBarStyle: {
        height: 80,
        paddingVertical: Platform.OS == 'ios' ? 20 : 0
      }
    }}>
      <Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomTabMenu title="Home" color={color} />
          )
        }}
      />
      <Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: ({ color }) => (
            <BottomTabMenu title="Orders" color={color} notifications={notifications} />
          )
        }}
      />
    </Navigator>
  );
}
