
import 'react-native-gesture-handler';
import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

import { AuthProvider, AuthContext } from './src/context/AppContext';
import AuthNavigator from './src/navigation/AuthNavigator'; // Login, Register
import DashboardTabs from './src/navigation/DashboardTabs'; // Inicio, Perfil
import { PaperProvider } from 'react-native-paper'; // Si estás usando Paper
import PaperTheme from './src/theme/PaperTheme';
import { CartProvider } from './src/context/CartContext';
import { FavoritesProvider } from './src/context/FavoritesContext';

// El componente que gestiona el flujo de navegación
const RootNavigator = () => {
  const { userToken, isLoading } = useContext(AuthContext);

  if (isLoading) {
    // Muestra una pantalla de carga mientras se verifica el token
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#A57F6D" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <DashboardTabs /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <PaperProvider theme={PaperTheme}>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <RootNavigator />
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F4F0', // El fondo claro de tu app
  },
});