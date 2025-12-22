
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const [email, setEmail] = useState('test@app.com');
  const [password, setPassword] = useState('12345');
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext); // Función de login del contexto

  const handleLogin = () => {
    signIn({ email, password });
  };

  return (
    <View style={styles.container}>
      {/* Icono de Torta (Birthday Cake) */}
      <Ionicons name="cake" size={80} color="#A57F6D" style={styles.icon} />
      <Text style={styles.appTitle}>DulceApp</Text>

      {/* Campo Correo Electronico */}
      <View style={styles.inputContainer}>
        <Ionicons name="mail-outline" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Correo Electronico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      {/* Campo Contraseña */}
      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" size={20} color="gray" />
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      {/* Botón Entrar */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>Entrar</Text>
      </TouchableOpacity>

      {/* Links inferiores */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.linkText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
      
      <Text style={styles.linkText}>¿Olvidaste tu contraseña?</Text>

      <TouchableOpacity onPress={() => {/* Lógica para invitado */}}>
        <Text style={styles.guestText}>Continuar como invitado</Text>
      </TouchableOpacity>
    </View>
  );
};

// --- Estilos de LoginScreen ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: '#F9F4F0', // Fondo claro
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  appTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#A57F6D',
    marginBottom: 40,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  input: {
    flex: 1,
    marginLeft: 10,
    color: '#333',
  },
  loginButton: {
    width: '100%',
    backgroundColor: '#FFB69B', // Color salmón
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  loginButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#A57F6D',
    marginTop: 10,
    fontSize: 14,
  },
  guestText: {
    color: 'gray',
    marginTop: 40,
    fontSize: 14,
    fontStyle: 'italic',
  }
});

export default LoginScreen;