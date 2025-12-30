import React from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Text, Card, Button, Avatar, IconButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Para los iconos de abajo

const OwnerDashboard = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* Banner de Verificación (Basado en tu imagen de cuenta revisada) */}
        <Card style={styles.verifyBanner}>
          <View style={styles.bannerContent}>
            <MaterialCommunityIcons name="chef-hat" size={24} color="#6F3F2B" />
            <Text style={styles.bannerText}>
              ¡Tu cuenta está siendo revisada por nuestro equipo de maestros pasteleros!
            </Text>
          </View>
        </Card>

        {/* Cabecera */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Bienvenido,</Text>
            <Text style={styles.bakeryName}>Mi Pastelería 🍰</Text>
          </View>
          <Avatar.Image 
            size={55} 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/992/992747.png' }} 
            style={{ backgroundColor: '#F2E8DF' }}
          />
        </View>

        {/* Estadísticas (Basado en tu diseño de tarjetas blancas) */}
        <View style={styles.statsRow}>
          <Card style={styles.statCard}>
            <Card.Content style={styles.centerContent}>
              <Text style={styles.statLabel}>Recetas Publicadas</Text>
              <Text style={styles.statNumber}>—</Text>
            </Card.Content>
          </Card>

          <Card style={styles.statCard}>
            <Card.Content style={styles.centerContent}>
              <Text style={styles.statLabel}>Ventas Totales</Text>
              <Text style={styles.statNumber}>—</Text>
            </Card.Content>
          </Card>
        </View>

        {/* Botón de Acción Principal (Bloqueado según tu imagen) */}
        <Button 
          mode="contained" 
          icon="lock" 
          style={styles.lockedButton}
          contentStyle={styles.buttonHeight}
          onPress={() => {}}
        >
          Publicar Nueva Receta (Bloqueado)
        </Button>

        {/* Sección de Borradores */}
        <Text style={styles.sectionTitle}>Borradores</Text>
        <Card style={styles.draftCard}>
          <Card.Title
            title="Tarta de Fresa y Nata"
            subtitle="Listo para revisión"
            left={(props) => <Avatar.Icon {...props} icon="cake-variant" color="#A57F6D" style={{backgroundColor: '#F9F4F0'}} />}
            right={(props) => <IconButton {...props} icon="chevron-right" />}
          />
        </Card>

      </ScrollView>

      {/* --- BARRA DE NAVEGACIÓN INFERIOR (Lo que pediste abajo) --- */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="home-outline" size={28} color="#A57F6D" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.navItemActive}
          onPress={() => navigation.navigate('OwnerProfile')}
        >
          <MaterialCommunityIcons name="account" size={28} color="#FFFFFF" />
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navItem}>
          <MaterialCommunityIcons name="cog-outline" size={28} color="#A57F6D" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F4F0', // Fondo crema de tu app
  },
  container: {
    padding: 20,
    paddingBottom: 100, // Espacio para que la barra no tape el contenido
  },
  verifyBanner: {
    backgroundColor: '#FFDAB9',
    marginBottom: 20,
    borderRadius: 15,
    padding: 10,
  },
  bannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  bannerText: {
    flex: 1,
    fontSize: 13,
    color: '#6F3F2B',
    fontWeight: '600',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 25,
  },
  greeting: {
    fontSize: 16,
    color: '#A57F6D',
  },
  bakeryName: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#6F3F2B',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  centerContent: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6F3F2B',
    marginTop: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#A57F6D',
    textAlign: 'center',
  },
  lockedButton: {
    backgroundColor: '#A57F6D', // Color primario café
    borderRadius: 12,
    opacity: 0.7,
    marginBottom: 25,
  },
  buttonHeight: {
    height: 55,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#6F3F2B',
    marginBottom: 10,
  },
  draftCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
  },
  /* ESTILOS DE LA BARRA INFERIOR */
  bottomNav: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: 70,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 10, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  navItem: {
    padding: 10,
  },
  navItemActive: {
    backgroundColor: '#A57F6D', // Círculo café para el activo
    padding: 12,
    borderRadius: 50,
    marginTop: -30, // Efecto elevado
    borderWidth: 5,
    borderColor: '#F9F4F0',
  }
});

export default OwnerDashboard;