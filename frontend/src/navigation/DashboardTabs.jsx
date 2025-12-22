
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromState } from '@react-navigation/native';
import InicioScreen from '../screens/InicioScreen';
import ProfileStack from './ProfileStack'; // Stack con Profile + Edit
import CartScreen from '../screens/CartScreen';
import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState, useRef } from 'react';
import { Animated } from 'react-native';
import { useCart } from '../context/CartContext';
import { View, Text } from 'react-native';
const Tab = createBottomTabNavigator();

const DashboardTabs = () => {

  const CustomHeaderTitle = ({ route }) => {
    // Opcional: Obtener el nombre de la ruta actual para el título del header
    const routeName = getFocusedRouteNameFromState(route.state) ?? 'Inicio';
    return routeName;
  };

  const { itemCount } = useCart();

  const badgeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (itemCount > 0) {
      Animated.sequence([
        Animated.timing(badgeAnim, { toValue: 1.25, duration: 140, useNativeDriver: true }),
        Animated.timing(badgeAnim, { toValue: 1, duration: 140, useNativeDriver: true }),
      ]).start();
    }
  }, [itemCount]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const colorDulceApp = focused ? '#A57F6D' : 'gray';
          let iconName = 'ellipse';

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Perfil') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Carrito') {
            iconName = focused ? 'cart' : 'cart-outline';
          }

          // Para la pestaña Carrito, añadimos un badge con la cuenta
          // aumentar tamaño por pestaña para mejor visibilidad
          const iconSize = route.name === 'Carrito' ? 28 : 26;

          if (route.name === 'Carrito') {
            return (
              <View style={{ width: 40, alignItems: 'center' }}>
                <Ionicons name={iconName} size={iconSize} color={colorDulceApp} />
                {itemCount > 0 && (
                  <Animated.View style={{ position: 'absolute', right: -12, top: -8, backgroundColor: '#E63946', borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2, transform: [{ scale: badgeAnim }] }}>
                    <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>{itemCount}</Text>
                  </Animated.View>
                )}
              </View>
            );
          }

          return <Ionicons name={iconName} size={iconSize} color={colorDulceApp} />;
        },
        tabBarActiveTintColor: '#A57F6D', 
        tabBarInactiveTintColor: 'gray', 
        headerShown: false, // Ocultar el header
        tabBarStyle: {
            backgroundColor: '#FFFFFF',
            height: 68,
            paddingBottom: 10,
            borderTopWidth: 0,
            elevation: 6,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        }
      })}
    >
      <Tab.Screen name="Inicio" component={InicioScreen} />
      <Tab.Screen name="Carrito" component={CartScreen} options={{ tabBarLabel: 'Mi Carrito' }} />
      <Tab.Screen name="Perfil" component={ProfileStack} />
    </Tab.Navigator>
  );
};

export default DashboardTabs;