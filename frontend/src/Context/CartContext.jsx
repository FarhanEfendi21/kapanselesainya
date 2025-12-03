import { createContext, useState, useContext, useEffect } from "react";

// 1. Buat Context
const CartContext = createContext();

// 2. Buat Custom Hook agar mudah dipanggil
export const useCart = () => {
  return useContext(CartContext);
};

const getCurrentUserId = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  const parsedUser = JSON.parse(storedUser);

  // === PERBAIKAN DI SINI ===
  // Jika emailnya mengandung kata 'guest', anggap user belum login (return null)
  if (parsedUser.email && parsedUser.email.includes("guest")) {
    return null;
  }

  return parsedUser.id;
};

// 3. Buat Provider (Penyedia Data)
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const userId = getCurrentUserId();

    if (!userId) return [];

    const savedCart = localStorage.getItem(`cartItems_${userId}`);
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Simpan ke LocalStorage setiap kali keranjang berubah
  useEffect(() => {
    const userId = getCurrentUserId();

    // Hanya simpan jika ada User ID (Guest tidak disimpan ke localStorage permanen)
    if (userId) {
      localStorage.setItem(`cartItems_${userId}`, JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const refreshCart = () => {
    const userId = getCurrentUserId();
    if (userId) {
      // Jika User Login, muat data dia
      const savedCart = localStorage.getItem(`cartItems_${userId}`);
      setCartItems(savedCart ? JSON.parse(savedCart) : []);
    } else {
      // Jika Guest, KOSONGKAN keranjang
      setCartItems([]);
    }
  };

  // Fungsi: Tambah ke Keranjang
  const addToCart = (product) => {
    const userId = getCurrentUserId();

    // Proteksi Ganda: Jika Guest entah bagaimana bisa akses fungsi ini, tolak.
    if (!userId) return;

    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.id === product.id && item.size === product.size
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        );
      } else {
        return [...prevItems, product];
      }
    });
  };

  // Fungsi: Hapus dari Keranjang
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size === size))
    );
  };

  // Fungsi: Update Quantity
  const updateQuantity = (id, size, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // Hitung Total Harga & Total Item
  const totalPrice = cartItems.reduce((total, item) => {
    const price = parseFloat(item.price) || 0;
    const quantity = parseFloat(item.quantity) || 0;
    return total + price * quantity;
  }, 0);

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  // Fungsi Clear Cart (Hapus data user saat ini saja)
  const clearCart = () => {
    setCartItems([]);
    const userId = getCurrentUserId();
    if (userId) {
      localStorage.removeItem(`cartItems_${userId}`);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        refreshCart,
        totalPrice,
        totalItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
