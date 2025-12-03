import { createContext, useState, useContext, useEffect } from "react";

const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

// Helper: Ambil ID User
const getCurrentUserId = () => {
  const storedUser = localStorage.getItem("user");
  if (!storedUser) return null;

  const parsedUser = JSON.parse(storedUser);

  // === PERBAIKAN DI SINI ===
  if (parsedUser.email && parsedUser.email.includes("guest")) {
    return null;
  }

  return parsedUser.id;
};

export const WishlistProvider = ({ children }) => {
  // PERUBAHAN: Load data berdasarkan User ID
  const [wishlistItems, setWishlistItems] = useState(() => {
    const userId = getCurrentUserId();

    // Jika Guest, wishlist kosong
    if (!userId) return [];

    // Jika User, ambil wishlist_USERID
    const saved = localStorage.getItem(`wishlistItems_${userId}`);
    return saved ? JSON.parse(saved) : [];
  });

  // Simpan data berdasarkan User ID
  useEffect(() => {
    const userId = getCurrentUserId();
    if (userId) {
      localStorage.setItem(
        `wishlistItems_${userId}`,
        JSON.stringify(wishlistItems)
      );
    }
  }, [wishlistItems]);

  const refreshWishlist = () => {
    const userId = getCurrentUserId();
    if (userId) {
      const saved = localStorage.getItem(`wishlistItems_${userId}`);
      setWishlistItems(saved ? JSON.parse(saved) : []);
    } else {
      setWishlistItems([]); // Kosongkan jika guest
    }
  };

  const addToWishlist = (product) => {
    const userId = getCurrentUserId();
    if (!userId) return; // Guest tidak bisa menambah

    if (!wishlistItems.find((item) => item.id === product.id)) {
      setWishlistItems([...wishlistItems, product]);
    }
  };

  const removeFromWishlist = (id) => {
    setWishlistItems(wishlistItems.filter((item) => item.id !== id));
  };

  const isInWishlist = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        refreshWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};
