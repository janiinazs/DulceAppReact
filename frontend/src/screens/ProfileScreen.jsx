import React, { useEffect, useState } from 'react';
import { View, StyleSheet, useWindowDimensions } from 'react-native';
import { Avatar, Title, Paragraph, Button, Card } from 'react-native-paper';
import { useFavorites } from '../context/FavoritesContext';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useContext } from 'react';
import { AuthContext } from '../context/AppContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const STORAGE_KEY = '@userProfile';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const { signOut } = useContext(AuthContext);
  const [profile, setProfile] = useState({ name: 'Usuario', email: 'usuario@ejemplo.com' });
  const { favorites } = useFavorites();

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) setProfile(JSON.parse(raw));
      } catch (e) {
        console.error('Error cargando perfil', e);
      }
    };
    const unsubscribe = navigation.addListener('focus', load);
    load();
    return unsubscribe;
  }, [navigation]);

  const { width } = useWindowDimensions();
  return (
    <View style={styles.container}>
      <Card style={[styles.card, { maxWidth: 520, alignSelf: 'center' }]}>
        <Card.Content style={styles.content}>
          {profile.image ? (
            <Avatar.Image size={92} source={{ uri: profile.image }} style={{ backgroundColor: '#A57F6D' }} />
          ) : (
            <Avatar.Text size={92} label={(profile.name || 'U').charAt(0).toUpperCase()} style={{ backgroundColor: '#A57F6D' }} />
          )}
          <View style={styles.info}>
            <Title style={styles.name}>{profile.name || 'Usuario'}</Title>
            <Paragraph style={styles.email}>{profile.email || 'usuario@ejemplo.com'}</Paragraph>
          </View>
        </Card.Content>
      </Card>

      <View style={[styles.actions, { flexDirection: width > 520 ? 'row' : 'column' }]}>
        <Button mode="contained" onPress={() => navigation.navigate('EditProfile')} buttonColor="#A57F6D" style={[styles.actionButton, width > 520 ? { marginRight: 8 } : {}]}>Editar perfil</Button>
        <Button mode="outlined" onPress={() => signOut()} style={styles.actionButton}>Cerrar sesión</Button>
      </View>

      {/* Favoritos */}
      <View style={styles.section}>
        <Title style={styles.sectionTitle}>Favoritos</Title>
        {favorites.length === 0 ? (
          <View style={styles.emptyFav}>
            <MaterialCommunityIcons name="heart-outline" size={44} color="#E63946" />
            <Paragraph style={styles.emptyText}>Aún no tenés favoritos. Toca el corazón en un producto para agregarlo.</Paragraph>
          </View>
        ) : (
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.favScroll} contentContainerStyle={{ paddingLeft: 4 }}>
            {favorites.map((p) => (
              <Card key={p.id} style={styles.favCard}>
                <Card.Cover source={typeof p.image === 'string' ? { uri: p.image } : p.image} style={styles.favImage} />
                <Card.Content>
                  <Paragraph style={styles.favName}>{p.name}</Paragraph>
                  <Paragraph style={styles.favPrice}>$ {p.price}</Paragraph>
                </Card.Content>
              </Card>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9F4F0' },
  card: { padding: 16, marginBottom: 20, borderRadius: 12, elevation: 3, backgroundColor: '#FFFFFF' },
  content: { flexDirection: 'row', alignItems: 'center' },
  info: { marginLeft: 16 },
  name: { fontWeight: '800', fontSize: 18 },
  email: { color: 'gray' },
  actions: { width: '100%', maxWidth: 520, alignSelf: 'center', marginTop: 12 },
  actionButton: { flex: 1, marginTop: 12, height: 44, justifyContent: 'center' },
  section: { width: '100%', maxWidth: 920, alignSelf: 'center', marginTop: 30 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#333', marginBottom: 12 },
  favScroll: { paddingTop: 8 },
  favCard: { width: 160, marginRight: 12, borderRadius: 12, overflow: 'hidden', elevation: 3, backgroundColor: '#fff' },
  favImage: { height: 110 },
  favName: { fontWeight: '700', marginTop: 6 },
  favPrice: { color: '#A57F6D', fontWeight: '700' },
  emptyFav: { alignItems: 'center', paddingVertical: 28 },
  emptyText: { color: 'gray', textAlign: 'center', maxWidth: 420, marginTop: 8 },
});

export default ProfileScreen;
