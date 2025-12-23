import React, { useRef } from 'react';
import { Animated, StyleSheet } from 'react-native';
import { Card, Button, IconButton, Title, Paragraph } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

const ProductCard = ({ id, name, price, imageSource, width = 160 }) => {
  const { addItem } = useCart();
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleAdd = (product) => {
    Animated.sequence([
      Animated.timing(scaleAnim, { toValue: 1.06, duration: 100, useNativeDriver: true }),
      Animated.timing(scaleAnim, { toValue: 1, duration: 100, useNativeDriver: true }),
    ]).start();
    addItem(product);
  };

  return (
    <Card style={[styles.card, { width }]} mode="elevated">
      <Card.Cover source={imageSource || require('../../assets/icon.png')} style={styles.image} />

      <IconButton
        icon={fav ? 'heart' : 'heart-outline'}
        size={20}
        onPress={() => toggleFavorite({ id, name, price, image: imageSource })}
        style={styles.favButton}
        iconColor={fav ? '#E63946' : '#A57F6D'}
      />

      <Card.Content>
        <Title style={styles.name} numberOfLines={2}>{name}</Title>
        <Paragraph style={styles.price}>$ {price}</Paragraph>
      </Card.Content>

      <Card.Actions style={styles.cardActions}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <IconButton icon="cart" size={20} onPress={() => handleAdd({ id, name, price })} iconColor="#A57F6D" />
        </Animated.View>
        <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
          <Button
            mode="contained"
            onPress={() => handleAdd({ id, name, price })}
            buttonColor="#A57F6D"
            contentStyle={styles.addBtnContent}
            style={styles.addBtn}
          >
            Añadir
          </Button>
        </Animated.View>
      </Card.Actions>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 14,
    overflow: 'hidden',
    elevation: 3,
    backgroundColor: '#fff',
  },
  image: {
    height: 140,
  },
  favButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    zIndex: 5,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  cardActions: {
    justifyContent: 'center',
    padding: 8,
    gap: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 4,
    color: '#333',
  },
  price: {
    fontSize: 14,
    color: '#A57F6D',
    fontWeight: '700',
  },
  addBtn: {
    borderRadius: 20,
    elevation: 0,
  },
  addBtnContent: {
    paddingVertical: 6,
    paddingHorizontal: 14,
  },
});

export default ProductCard;
