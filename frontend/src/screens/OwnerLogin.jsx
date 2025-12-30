import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AppContext';

const OwnerLogin = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { signIn } = useContext(AuthContext);

  const handleLogin = () => {
    // Aquí podrías añadir lógica específica para dueños (por ejemplo verificación extra)
    signIn({ email, password, role: 'owner' });
  };

  const promptVerify = () => {
    // Navegar directamente al formulario de registro de dueño
    navigation.navigate('OwnerRegister');
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.card} accessibilityRole="form">
          <Text style={styles.logo}>DulceApp</Text>

          <Text style={styles.subtitle}>¡Bienvenido, Dueño!{"\n"}Gestiona tu dulce negocio</Text>

          <TextInput
            style={styles.input}
            placeholder="Correo Electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#8b6a5d"
          />

          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#8b6a5d"
          />

          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleLogin}
            accessibilityLabel="Iniciar sesión"
            accessibilityRole="button"
          >
            <Text style={styles.loginButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={promptVerify}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            accessibilityRole="button"
            accessibilityLabel="Verifica tu pastelería"
          >
            <Text style={styles.verifyText}>¡Verifica tu pastelería!</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#EFE6DE',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    width: '92%',
    backgroundColor: '#FFF9F5',
    borderRadius: 20,
    paddingVertical: 28,
    paddingHorizontal: 22,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: { elevation: 6 },
    }),
  },
  logo: {
    color: '#6F3F2B',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 6,
  },
  heading: {
    color: '#6F3F2B',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6F3F2B',
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 14,
    lineHeight: 20,
  },
  input: {
    width: '100%',
    height: 48,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E8D9CF',
    paddingHorizontal: 14,
    marginBottom: 12,
    color: '#6F3F2B',
  },
  loginButton: {
    backgroundColor: '#6F3F2B',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  loginButtonText: {
    color: '#FFF8F3',
    fontWeight: '700',
    fontSize: 14,
  },
  verifyText: {
    marginTop: 12,
    color: '#6F3F2B',
    fontSize: 12,
  }
});

export default OwnerLogin;
