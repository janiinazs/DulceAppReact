
import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { AuthContext } from '../context/AppContext';
import { Chip, Searchbar } from 'react-native-paper';
import ProductCard from '../components/ProductCard';
import { MaterialCommunityIcons } from '@expo/vector-icons';


const InicioScreen = () => {
    const { /* signOut */ } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');

    // Datos simulados para promociones
    const promotions = [
        { id: 1, name: 'Torta de Chocolate', price: '5.00', img: require('../../assets/icon.png') },
        { id: 2, name: 'Caja de Galletas', price: '15.00', img: require('../../assets/icon.png') },
    ];

    // Datos simulados para categorías
    const categories = ['TORTAS', 'POSTRES', 'BOCADITOS', 'BEBIDAS', 'GALLETAS'];

    const categoryIcons = {
      'TORTAS': 'cake',
      'POSTRES': 'ice-cream',
      'BOCADITOS': 'food',
      'BEBIDAS': 'cup',
      'GALLETAS': 'cookie',
    };

    return (
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 120 }}>
        <View style={styles.header}>
          <Text style={styles.appTitle}>DulceApp</Text>
          <Text style={styles.welcomeText}>¡Bienvenido/a!</Text>
          <Text style={styles.subtitle}>Descubre nuestros sabores</Text>
          <Searchbar
            placeholder="Buscar productos..."
            onChangeText={(q) => setSearchQuery(q)}
            value={searchQuery}
            style={styles.search}
          />
        </View>

            {/* SECCIÓN PROMOCIONES */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="tag" size={20} color="#A57F6D" />
                <Text style={styles.sectionTitle}>Promociones</Text>
              </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
                    {promotions.map((item) => (
                        <View key={item.id} style={{ marginRight: 12 }}>
                            <ProductCard id={item.id} name={item.name} price={item.price} imageSource={item.img} />
                        </View>
                    ))}
                </ScrollView>
            </View>

            {/* SECCIÓN CATEGORÍAS */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="shape" size={20} color="#A57F6D" />
                <Text style={styles.sectionTitle}>Categorías</Text>
              </View>
              <View style={styles.categoriesRow}>
                {categories.map((cat, index) => (
                  <Chip key={index} icon={categoryIcons[cat]} style={styles.chip} textStyle={styles.chipText} onPress={() => {}}>
                    {cat}
                  </Chip>
                ))}
              </View>
            </View>

            {/* SECCIÓN PRODUCTOS DESTACADOS */}
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <MaterialCommunityIcons name="star" size={20} color="#A57F6D" />
                <Text style={styles.sectionTitle}>Productos Destacados</Text>
              </View>
                <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.promoScroll}>
                    {promotions.map((item) => (
                        <View key={`f-${item.id}`} style={{ marginRight: 12 }}>
                            <ProductCard id={item.id} name={item.name} price={item.price} imageSource={item.img} />
                        </View>
                    ))}
                </ScrollView>
            </View>

            <View style={{ height: 40 }} />
        </ScrollView>
    );
};

// ProductCard styles moved to `src/components/ProductCard.jsx`

// --- Estilos de InicioScreen ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F4F0', // Fondo claro
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 8,
  },
  appTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#A57F6D',
    marginBottom: 6,
  },
  welcomeText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#333',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginBottom: 12,
  },
  search: {
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    elevation: 1,
  },
  section: {
    marginTop: 18,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  promoScroll: {
    marginBottom: 6,
    paddingLeft: 2,
  },
  categoriesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  chip: {
    marginRight: 8,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderColor: '#F0E6E1',
    borderWidth: 1,
  },
  chipText: {
    color: '#A57F6D',
    fontWeight: '700',
  },
});

export default InicioScreen;