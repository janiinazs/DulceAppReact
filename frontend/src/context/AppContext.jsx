


import React, { createContext, useState, useEffect, useMemo } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { Alert } from 'react-native';



export const AuthContext = createContext();



export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useState(null);

    const [userRole, setUserRole] = useState(null);

    const [lastUserRole, setLastUserRole] = useState(null);

    const [isLoading, setIsLoading] = useState(true);

  

  

  

    // --- Funciones de Autenticación ---

  

  

  

    const signIn = async ({ email, password, role }) => {

  

      setIsLoading(true);

  

      let token = null;

  

  

  

      // --- SIMULACIÓN DE LOGIN ---

  

      if (role === 'customer' && email === "test@app.com" && password === "12345") {

  

        token = 'dummy-customer-token';

  

      } else if (role === 'owner' && email === "owner@app.com" && password === "owner123") {

  

        token = 'dummy-owner-token';

  

      }

  

  

  

      if (token) {

  

        try {

  

          await AsyncStorage.setItem('@userToken', token);

  

          await AsyncStorage.setItem('@userRole', role);

  

          setUserToken(token);

  

          setUserRole(role);

          setLastUserRole(role);

  

        } catch (e) {

  

          Alert.alert("Error de Almacenamiento", "No se pudo guardar la sesión.");

  

        }

  

      } else {

  

        Alert.alert("Error de Login", "Credenciales incorrectas.");

  

      }

  

      // ------------------------------------

  

  

  

      setIsLoading(false);

  

    };

  

  

  

    const signOut = async () => {

  

      setIsLoading(true);

      try {

        setLastUserRole(userRole);

        await AsyncStorage.removeItem('@userToken');

  

        await AsyncStorage.removeItem('@userRole');

  

        setUserToken(null);

  

        setUserRole(null);

  

      } catch (e) {

  

        Alert.alert("Error de Almacenamiento", "No se pudo eliminar la sesión.");

  

      }

  

      setIsLoading(false);

  

    };



  const signUp = ({ username, email, password }) => {

    // 1. Aquí harías la llamada a tu backend para el registro

    // 2. Si es exitoso, podrías llamar a signIn() automáticamente.

    Alert.alert("Registro", "Funcionalidad de registro simulada. Ahora puedes iniciar sesión.");

  };



  // --- Carga inicial de la Sesión (al abrir la app) ---

  const restoreUserSession = async () => {

    let token, role;

    try {

      token = await AsyncStorage.getItem('@userToken');

      role = await AsyncStorage.getItem('@userRole');

    } catch (e) {

      // Manejar error de lectura

      console.error("Fallo al leer la sesión:", e);

      token = null;

      role = null;

    }

    setUserToken(token);

    setUserRole(role);

    setIsLoading(false);

  };



  useEffect(() => {

    restoreUserSession();

  }, []);



  const authContext = useMemo(() => ({

    signIn,

    signOut,

    signUp,

    userToken,

    userRole,
    lastUserRole,
    isLoading,

  }), [userToken, userRole, isLoading, lastUserRole]);



  return (

    <AuthContext.Provider value={authContext}>

      {children}

    </AuthContext.Provider>

  );

};
