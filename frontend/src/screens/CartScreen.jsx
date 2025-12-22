import React from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { Card, Button, IconButton, Avatar } from 'react-native-paper';
import { useCart } from '../context/CartContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const CartScreen = () => {
  const { items, removeItem, clear, total, increaseQty, decreaseQty } = useCart();
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mi Carrito</Text>
      {items.length === 0 ? (
        <View style={styles.emptyWrap}>
          <MaterialCommunityIcons name="cart-off" size={64} color="#ccc" />
          <Text style={styles.empty}>Tu carrito está vacío.</Text>
          <Button mode="outlined" onPress={() => navigation.navigate('Inicio')} style={styles.cta}>Ir a comprar</Button>
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(i) => String(i.id)}
          contentContainerStyle={{ paddingBottom: 120 }}
          renderItem={({ item }) => (
            <Card style={styles.card}>
              <Card.Content style={styles.cardContent}>
                <View style={styles.left}>
                  {item.image ? (
                    <Avatar.Image size={64} source={typeof item.image === 'string' ? { uri: item.image } : item.image} />
                  ) : (
                    <Avatar.Icon size={64} icon="food" />
                  )}
                </View>

                <View style={styles.mid}>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.qty}>${(parseFloat(item.price) * item.qty).toFixed(2)} • {item.qty} unidades</Text>
                </View>

                <View style={styles.right}>
                  <View style={styles.qtyControls}>
                    <IconButton icon="minus" size={18} onPress={() => decreaseQty(item.id)} />
                    <Text style={styles.count}>{item.qty}</Text>
                    <IconButton icon="plus" size={18} onPress={() => increaseQty(item.id)} />
                  </View>
                  <IconButton icon="delete" onPress={() => Alert.alert('Eliminar', '¿Eliminar este producto?', [
                    { text: 'Cancelar', style: 'cancel' },
                    { text: 'Eliminar', style: 'destructive', onPress: () => removeItem(item.id) }
                  ])} />
                </View>
              </Card.Content>
            </Card>
          )}
        />
      )}

      <View style={styles.footerCard}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <View style={styles.footerActions}>
          <Button mode="outlined" onPress={() => Alert.alert('Vaciar carrito', '¿Estás seguro?', [
            { text: 'Cancelar', style: 'cancel' },
            { text: 'Vaciar', style: 'destructive', onPress: () => clear() }
          ])} style={styles.clearBtn}>Vaciar</Button>
          <Button mode="contained" onPress={() => Alert.alert('Pago', 'Funcionalidad de pago no implementada')} buttonColor="#A57F6D" style={styles.payBtn}>Pagar</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#F9F4F0' },
  title: { fontSize: 22, fontWeight: '800', color: '#333', marginBottom: 12 },
  empty: { color: 'gray', marginTop: 12 },
  emptyWrap: { alignItems: 'center', paddingVertical: 36 },
  cta: { marginTop: 12 },
  card: { marginBottom: 12, borderRadius: 12, overflow: 'hidden' },
  cardContent: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 12 },
  left: { width: 72, alignItems: 'center' },
  mid: { flex: 1, paddingHorizontal: 8 },
  right: { width: 96, alignItems: 'flex-end' },
  name: { fontWeight: '700', fontSize: 16 },
  qty: { color: '#A57F6D', marginTop: 6 },
  qtyControls: { flexDirection: 'row', alignItems: 'center', borderRadius: 8, overflow: 'hidden', backgroundColor: '#FFF' },
  count: { minWidth: 28, textAlign: 'center', fontWeight: '700' },
  footerCard: { position: 'absolute', left: 12, right: 12, bottom: 12, backgroundColor: '#fff', padding: 12, borderRadius: 12, elevation: 6, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  footerActions: { flexDirection: 'row', gap: 8 },
  clearBtn: { marginRight: 8 },
  payBtn: { minWidth: 110 },
  total: { fontSize: 18, fontWeight: '700' },
});

export default CartScreen;
