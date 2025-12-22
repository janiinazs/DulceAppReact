
import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userToken, setUserToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // --- Funciones de Autenticación ---

  const signIn = async ({ email, password }) => {
    setIsLoading(true);
    // 1. Aquí harías la llamada a tu backend (AXIOS, fetch, etc.) para el login.
    
    // --- SIMULACIÓN DE LOGIN EXITOSO ---
    if (email === "test@app.com" && password === "12345") {
      const token = 'dummy-auth-token'; // Token real devuelto por el servidor
      
      try {
        await AsyncStorage.setItem('@userToken', token);
        setUserToken(token);
      } catch (e) {
        Alert.alert("Error de Almacenamiento", "No se pudo guardar el token.");
      }
    } else {
        Alert.alert("Error de Login", "Credenciales incorrectas. Usa test@app.com y 12345.");
    }
    // ------------------------------------

    setIsLoading(false);
  };

  const signOut = async () => {
    setIsLoading(true);
    try {
      await AsyncStorage.removeItem('@userToken');
      setUserToken(null);
    } catch (e) {
      Alert.alert("Error de Almacenamiento", "No se pudo eliminar el token.");
    }
    setIsLoading(false);
  };

  const signUp = ({ username, email, password }) => {
    // 1. Aquí harías la llamada a tu backend para el registro
    // 2. Si es exitoso, podrías llamar a signIn() automáticamente.
    Alert.alert("Registro", "Funcionalidad de registro simulada. Ahora puedes iniciar sesión.");
  };

  // --- Carga inicial del Token (al abrir la app) ---
  const restoreToken = async () => {
    let token;
    try {
      token = await AsyncStorage.getItem('@userToken');
    } catch (e) {
      // Manejar error de lectura
      console.error("Fallo al leer el token:", e);
      token = null;
    }
    setUserToken(token);
    setIsLoading(false);
  };

  useEffect(() => {
    restoreToken();
  }, []);

  const authContext = useMemo(() => ({
    signIn,
    signOut,
    signUp,
    userToken,
    isLoading,
  }), [userToken, isLoading]);

  return (
    <AuthContext.Provider value={authContext}>
      {children}
    </AuthContext.Provider>
  );
};