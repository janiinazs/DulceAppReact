
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const navigation = useNavigation();
  const { signUp } = useContext(AuthContext);

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert("Error", "Las contraseñas no coinciden.");
      return;
    }
    // Llama a la función de registro (esto simulará el registro)
    signUp({ username, email, password });
    // Después de un registro exitoso, normalmente rediriges al login
    navigation.navigate('Login'); 
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
      <View style={styles.container}>
        {/* Icono de Torta (Birthday Cake) */}
        <Ionicons name="cake" size={80} color="#A57F6D" style={styles.icon} />
        
        {/* Campo Nombre de usuario */}
        <TextInput
          style={styles.input}
          placeholder="Nombre de usuario"
          value={username}
          onChangeText={setUsername}
        />

        {/* Campo Correo electronico */}
        <TextInput
          style={styles.input}
          placeholder="Correo electronico"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        {/* Campo Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {/* Campo Confirmar Contraseña */}
        <TextInput
          style={styles.input}
          placeholder="Confirmar Contraseña"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
        />
        
        {/* Campo Palabra Clave */}
        <TextInput
          style={styles.input}
          placeholder="Palabra Clave (para recuperación de contr...)"
          value={keyword}
          onChangeText={setKeyword}
        />

        {/* Botón Registrarse */}
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>Regístrate</Text>
        </TouchableOpacity>

        {/* Link a Login */}
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>¿Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

// --- Estilos de RegisterScreen ---
const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#F9F4F0',
    justifyContent: 'center',
  },
  container: {
    padding: 30,
    alignItems: 'center',
  },
  icon: {
    marginBottom: 40,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    width: '100%',
    height: 50,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  registerButton: {
    width: '100%',
    backgroundColor: '#FFB69B', // Color salmón
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  registerButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#A57F6D',
    marginTop: 10,
    fontSize: 14,
  }
});

export default RegisterScreen;