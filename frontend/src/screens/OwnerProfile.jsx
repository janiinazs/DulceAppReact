import React, { useContext } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Avatar, Card, List, Divider, Button } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Importamos el contexto para usar la función logout
import { AuthContext } from '../context/AppContext'; 

const OwnerProfile = () => {
  const { signOut } = useContext(AuthContext);

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres salir?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Salir", 
          onPress: () => signOut(), // Esta función te redirige al Login automáticamente
          style: "destructive" 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        
        {/* CABECERA (Header) */}
        <View style={styles.header}>
          <Avatar.Image 
            size={100} 
            source={{ uri: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png' }} 
            style={styles.avatar}
          />
          <Text style={styles.bakeryName}>DULCE APP BAKERY</Text>
          <Text style={styles.ownerName}>Dueño: Janina Pastelería</Text>
          <View style={styles.verifiedBadge}>
            <MaterialCommunityIcons name="check-decagram" size={18} color="#A57F6D" />
            <Text style={styles.verifiedText}>Dueño Verificado</Text>
          </View>
        </View>

        {/* CUERPO (Gestión de Pastelería) */}
        <Card style={styles.cardInfo}>
          <Card.Content>
            <Text style={styles.sectionTitle}>Gestión de Pastelería</Text>
            
            <List.Item
              title="Actualizar Información"
              description="Nombre, logo y dirección"
              left={props => <List.Icon {...props} icon="store-edit" color="#A57F6D" />}
              onPress={() => console.log("Ir a Editar")}
            />
            <Divider />
            
            <List.Item
              title="Mis Recetas"
              description="Gestionar catálogo de productos"
              left={props => <List.Icon {...props} icon="cake" color="#A57F6D" />}
              onPress={() => console.log("Ir a Recetas")}
            />
            <Divider />

            <List.Item
              title="Configuración"
              description="Seguridad y notificaciones"
              left={props => <List.Icon {...props} icon="cog-outline" color="#A57F6D" />}
              onPress={() => console.log("Ir a Configuración")}
            />
          </Card.Content>
        </Card>

        {/* BOTONES DE ACCIÓN (Aquí está lo que buscabas) */}
        <View style={styles.footer}>
          <Button 
            mode="contained" 
            style={styles.editButton}
            buttonColor="#A57F6D"
            onPress={() => console.log("Editar Perfil")}
          >
            Editar Perfil
          </Button>

          {/* BOTÓN DE CERRAR SESIÓN */}
          <TouchableOpacity 
            style={styles.logoutBtn} 
            onPress={handleLogout}
          >
            <MaterialCommunityIcons name="logout" size={22} color="#D9534F" />
            <Text style={styles.logoutText}>Cerrar Sesión</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#F9F4F0',
  },
  container: {
    paddingBottom: 30,
  },
  header: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#FFFFFF',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    elevation: 4,
  },
  avatar: {
    backgroundColor: '#F2E8DF',
    marginBottom: 10,
  },
  bakeryName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#6F3F2B',
  },
  ownerName: {
    fontSize: 14,
    color: '#A57F6D',
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: '#FFF4E6',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  verifiedText: {
    fontSize: 12,
    color: '#A57F6D',
    marginLeft: 5,
    fontWeight: 'bold',
  },
  cardInfo: {
    margin: 20,
    borderRadius: 15,
    backgroundColor: '#FFFFFF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6F3F2B',
    marginBottom: 10,
    marginLeft: 15,
  },
  footer: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  editButton: {
    width: '100%',
    borderRadius: 10,
    marginBottom: 20,
  },
  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  logoutText: {
    color: '#D9534F',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});

export default OwnerProfile;