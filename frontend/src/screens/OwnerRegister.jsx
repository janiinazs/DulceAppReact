import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../context/AppContext';

const OwnerRegister = ({ navigation }) => {
  const [ownerName, setOwnerName] = useState('');
  const [bakeryName, setBakeryName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const { signUp } = useContext(AuthContext);

  const handleOwnerRegister = () => {
    if (!ownerName || !bakeryName || !email || !password) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden.');
      return;
    }

    // Llama a signUp con role: owner y bakeryName
    signUp({ username: ownerName, email, password, bakeryName, role: 'owner' });

    Alert.alert('Registro', 'Registro de pastelería completado. Ahora puedes iniciar sesión.', [
      { text: 'OK', onPress: () => navigation.navigate('Login') },
    ]);
  };

  return (
    <SafeAreaView style={styles.screen}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={styles.container}
      >
        <View style={styles.card} accessibilityRole="form">
          <Text style={styles.logo}>DulceApp</Text>
          <Text style={styles.title}>Registro de Pastelería</Text>
          <Text style={styles.subtitle}>Crea tu cuenta y verifica tu local</Text>

          <TextInput
            style={styles.input}
            placeholder="Nombre del Dueño"
            value={ownerName}
            onChangeText={setOwnerName}
            placeholderTextColor="#8b6a5d"
          />

          <TextInput
            style={styles.input}
            placeholder="Nombre de Pastelería"
            value={bakeryName}
            onChangeText={setBakeryName}
            placeholderTextColor="#8b6a5d"
          />

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

          <TextInput
            style={styles.input}
            placeholder="Confirmar Contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            placeholderTextColor="#8b6a5d"
          />

          <TouchableOpacity
            style={styles.registerButton}
            onPress={handleOwnerRegister}
            accessibilityLabel="Registrarme"
            accessibilityRole="button"
          >
            <Text style={styles.registerButtonText}>REGISTRAR PASTELERÍA</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.linkRow} accessibilityRole="link">
            <Text style={styles.linkText}>Volver</Text>
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
    paddingVertical: 24,
    paddingHorizontal: 20,
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
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#6F3F2B',
    marginBottom: 6,
  },
  subtitle: {
    color: '#6F3F2B',
    textAlign: 'center',
    marginBottom: 18,
    fontSize: 13,
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
  registerButton: {
    backgroundColor: '#6F3F2B',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  registerButtonText: {
    color: '#FFF8F3',
    fontWeight: '700',
    fontSize: 14,
  },
  linkRow: {
    marginTop: 12,
  },
  linkText: {
    color: '#6F3F2B',
    fontSize: 13,
    textDecorationLine: 'underline',
  }
});

export default OwnerRegister;
