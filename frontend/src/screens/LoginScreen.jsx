import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = () => {
  const navigation = useNavigation();

  const goToCustomer = () => navigation.navigate('CustomerLogin');
  const goToOwner = () => navigation.navigate('OwnerLogin');
  const goToAdmin = () => navigation.navigate('AdminLogin');

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name="heart" size={36} color="#A57F6D" style={styles.logo} />

          <Text style={styles.title}>DulceApp</Text>

          <Text style={styles.subtitle}>
            ¡Bienvenido a DulceApp!{"\n"}¿Quién eres tú?
          </Text>

          <TouchableOpacity
            style={styles.primaryButton}
            onPress={goToCustomer}
          >
            <Text style={styles.primaryButtonText}>Cliente</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={goToOwner}
          >
            <Text style={styles.secondaryButtonText}>Dueño de Pastelería</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.adminRow}
            onPress={goToAdmin}
          >
            <Ionicons name="settings-outline" size={18} color="#A57F6D" />
            <Text style={styles.adminText}>  Acceso Administrador</Text>
          </TouchableOpacity>
        </View>
      </View>
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
    borderRadius: 24,
    paddingVertical: 36,
    paddingHorizontal: 26,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 8 },
        shadowOpacity: 0.12,
        shadowRadius: 12,
      },
      android: {
        elevation: 6,
      },
    }),
  },
  logo: {
    marginBottom: 8,
  },
  title: {
    fontSize: 22,
    fontWeight: '700',
    color: '#6F3F2B',
    marginBottom: 6,
  },
  subtitle: {
    textAlign: 'center',
    color: '#6F3F2B',
    fontSize: 18,
    marginBottom: 24,
    lineHeight: 26,
  },
  primaryButton: {
    backgroundColor: '#6F3F2B',
    width: '100%',
    paddingVertical: 16,
    borderRadius: 28,
    alignItems: 'center',
    marginBottom: 14,
  },
  primaryButtonText: {
    color: '#FFF8F3',
    fontSize: 18,
    fontWeight: '700',
  },
  secondaryButton: {
    backgroundColor: '#FFF9F5',
    width: '100%',
    paddingVertical: 14,
    borderRadius: 28,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#A57F6D',
    marginBottom: 18,
  },
  secondaryButtonText: {
    color: '#6F3F2B',
    fontSize: 16,
    fontWeight: '600',
  },
  adminRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
    opacity: 0.9,
  },
  adminText: {
    color: '#A57F6D',
    fontSize: 14,
  },
});

export default LoginScreen;
