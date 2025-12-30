import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importa tus pantallas
import OwnerDashboard from '../screens/OwnerDashboard';
import OwnerProfile from '../screens/OwnerProfile';

const Tab = createBottomTabNavigator();

const OwnerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#A57F6D', // Tu color café
        tabBarInactiveTintColor: '#C4A484',
        tabBarStyle: {
          height: 70,
          borderTopLeftRadius: 25,
          borderTopRightRadius: 25,
          backgroundColor: '#FFFFFF',
          position: 'absolute',
          elevation: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'account' : 'account-outline';
          } else if (route.name === 'Ajustes') {
            iconName = 'cog-outline';
          }

          return <MaterialCommunityIcons name={iconName} size={30} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Inicio" component={OwnerDashboard} />
      <Tab.Screen name="Perfil" component={OwnerProfile} />
    </Tab.Navigator>
  );
};

export default OwnerTabs;