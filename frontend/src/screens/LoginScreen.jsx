
import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../context/AppContext';
import { Ionicons } from '@expo/vector-icons';

// Soporte para logo personalizado en assets/logo-dulceapp.png
let logoSrc = null;
try {
  // Si el archivo existe, será incluido en el bundle
  logoSrc = require('../../assets/logo-dulceapp.png');
} catch (e) {
  // archivo no existente todavía; se usará el icono vectorial como fallback
}

const LoginScreen = () => {
  const [email, setEmail] = useState('test@app.com');
  const [password, setPassword] = useState('12345');
  const navigation = useNavigation();
  const { signIn } = useContext(AuthContext); // Función de login del contexto

  const handleLogin = () => {
    signIn({ email, password });
  };

  return (
    <ImageBackground source={require('../../assets/icon.png')} style={styles.bg} imageStyle={styles.bgImage}>
      <View style={styles.overlay} />
      <View style={styles.centerCard}>
        <View style={styles.logoContainer} accessible accessibilityLabel="Logo DulceApp">
          {logoSrc ? (
            <Image source={logoSrc} style={styles.logo} />
          ) : (
            <Ionicons name="cake" size={44} color="#A57F6D" />
          )}
        </View>        <Text style={styles.appName}>DULCEAPP</Text>        <Text style={styles.title}>¡Hola! Entra y descubre un mundo de sabores</Text>

        <View style={styles.form}>
          <View style={styles.inputWrap}>
            <Ionicons name="mail-outline" size={18} color="#A57F6D" style={styles.inputIcon} />
            <TextInput
              placeholder="Correo Electrónico"
              value={email}
              onChangeText={setEmail}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputWrap}>
            <Ionicons name="lock-closed-outline" size={18} color="#A57F6D" style={styles.inputIcon} />
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={setPassword}
              style={styles.input}
              secureTextEntry
            />
          </View>

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>INICIAR SESIÓN</Text>
          </TouchableOpacity>

          <View style={styles.linksRow}>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={styles.smallLink}>¿No tienes cuenta? ¡Registrate!</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity onPress={() => {/* invitado */}}>
            <Text style={styles.guest}>Entrar como invitado</Text>
          </TouchableOpacity>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialBtn} onPress={() => {}}>
              <Ionicons name="logo-google" size={20} color="#DB4437" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialBtn} onPress={() => {}}>
              <Ionicons name="logo-facebook" size={20} color="#3b5998" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

// --- Estilos de LoginScreen ---
const styles = StyleSheet.create({
  bg: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: '#F9F4F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bgImage: {
    resizeMode: 'cover',
    opacity: 0.18,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(249,244,240,0.7)'
  },
  centerCard: {
    width: '90%',
    maxWidth: 420,
    backgroundColor: '#FFF5F1',
    borderRadius: 18,
    padding: 28,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
  },
  logoContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
  },
  logo: {
    width: 56,
    height: 56,
    resizeMode: 'contain'
  },
  appName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#A57F6D',
    letterSpacing: 2,
    marginBottom: 6,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#4a2f23',
    textAlign: 'center',
    marginBottom: 18,
  },
  form: {
    width: '100%'
  },
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 28,
    paddingHorizontal: 16,
    marginBottom: 12,
    height: 50,
    borderWidth: 2,
    borderColor: '#E6D7CF'
  },
  inputIcon: {
    marginRight: 8
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#4a4a4a'
  },
  primaryButton: {
    marginTop: 6,
    backgroundColor: '#A57F6D',
    paddingVertical: 12,
    borderRadius: 26,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800'
  },
  linksRow: {
    alignItems: 'center',
    marginVertical: 6
  },
  smallLink: {
    color: '#7a4f3d'
  },
  guest: {
    color: '#74605a',
    textAlign: 'center',
    marginTop: 8,
    textDecorationLine: 'underline'
  },
  socialRow: {
    marginTop: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12
  },
  socialBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  }
});

export default LoginScreen;