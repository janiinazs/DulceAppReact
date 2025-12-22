import React, { createContext, useContext, useState, useMemo } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) {
        return prev.map((p) => (p.id === product.id ? { ...p, qty: p.qty + 1 } : p));
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const increaseQty = (id) => {
    setItems((prev) => prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p)));
  };

  const decreaseQty = (id) => {
    setItems((prev) => {
      return prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0);
    });
  };

  const clear = () => setItems([]);

  const itemCount = useMemo(() => items.reduce((s, p) => s + p.qty, 0), [items]);
  const total = useMemo(() => items.reduce((s, p) => s + parseFloat(p.price) * p.qty, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, clear, itemCount, total, increaseQty, decreaseQty }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartContext;
