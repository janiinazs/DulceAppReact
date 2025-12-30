import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import OwnerDashboard from '../screens/OwnerDashboard';
import OwnerProfile from '../screens/OwnerProfile';

const Stack = createStackNavigator();

const OwnerNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="OwnerDashboard" component={OwnerDashboard} />
      <Stack.Screen name="OwnerProfile" component={OwnerProfile} />
    </Stack.Navigator>
  );
};

export default OwnerNavigator;
