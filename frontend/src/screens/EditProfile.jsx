import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, useWindowDimensions, Platform } from 'react-native';
import { TextInput, Button, Avatar, Title } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';

const STORAGE_KEY = '@userProfile';

const EditProfile = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [image, setImage] = useState(null);
  const { width } = useWindowDimensions();

  useEffect(() => {
    const load = async () => {
      try {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        if (raw) {
          const data = JSON.parse(raw);
          setName(data.name || '');
          setEmail(data.email || '');
          setImage(data.image || null);
        }
      } catch (e) {
        console.error('Error loading profile', e);
      }
    };
    load();
  }, []);

  const save = async () => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ name, email, image }));
      Alert.alert('Perfil', 'Guardado correctamente');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', 'No se pudo guardar');
    }
  };

  const pickImage = async () => {
    // pedir permiso en mobile
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se necesita permiso para acceder a las fotos.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const uri = result.assets[0].uri;
      setImage(uri);
    }
  };

  const pickFromCamera = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permiso denegado', 'Se necesita permiso para usar la cámara.');
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.7,
      });

      if (!result.canceled && result.assets && result.assets.length > 0) {
        const uri = result.assets[0].uri;
        setImage(uri);
      }
    } catch (e) {
      console.error('Camera error', e);
      Alert.alert('Error', 'No se pudo acceder a la cámara.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={[styles.avatarWrap, { alignItems: width > 520 ? 'flex-start' : 'center' }]}> 
        {image ? (
          <Avatar.Image size={96} source={{ uri: image }} style={{ backgroundColor: '#A57F6D' }} />
        ) : (
          <Avatar.Text size={96} label={name ? name.charAt(0).toUpperCase() : 'U'} style={{ backgroundColor: '#A57F6D' }} />
        )}
        <View style={styles.photoButtons}>
          <Button mode="text" onPress={pickImage} style={{ marginTop: 8, marginRight: 8 }}>Cambiar foto</Button>
          {Platform.OS !== 'web' && (
            <Button mode="text" onPress={pickFromCamera} style={{ marginTop: 8 }}>Tomar foto</Button>
          )}
          {Platform.OS === 'web' && (
            <Button mode="text" onPress={pickImage} style={{ marginTop: 8 }}>Seleccionar foto</Button>
          )}
        </View>
      </View>
      <Title style={styles.title}>Editar perfil</Title>

      <TextInput label="Nombre" value={name} onChangeText={setName} style={styles.input} />
      <TextInput label="Email" value={email} onChangeText={setEmail} style={styles.input} keyboardType="email-address" />

      <Button mode="contained" onPress={save} buttonColor="#A57F6D" style={styles.button}>Guardar</Button>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.button}>Cancelar</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', padding: 20, backgroundColor: '#F9F4F0' },
  avatarWrap: { width: '100%', alignItems: 'center' },
  photoButtons: { flexDirection: 'row', alignItems: 'center', marginTop: 8 },
  title: { marginTop: 12, marginBottom: 20, fontWeight: '700' },
  input: { width: '100%', marginBottom: 12, backgroundColor: '#fff', maxWidth: 520 },
  button: { width: '100%', marginTop: 8, maxWidth: 520 },
});

export default EditProfile;
