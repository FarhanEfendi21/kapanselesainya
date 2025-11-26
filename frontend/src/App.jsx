import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./Context/CartContext.jsx";
import { WishlistProvider } from "./Context/WishlistContext.jsx"; 

// Import Pages - Laluan diperbetulkan
import Splash from "./pages/Splash.jsx"; 
import Login from "./pages/Login.jsx"; 
import Home from "./pages/Home.jsx";
import Catalog from "./pages/Catalog.jsx";
import Profile from "./pages/Profile.jsx";
import Sneakers from "./pages/Sneakers.jsx";
import Apparel from "./pages/Apparel.jsx";
import ProductDetail from "./pages/ProductDetail.jsx"; 
import Layout from "./components/Layout.jsx"; 
import Sale from "./pages/Sale.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Checkout from "./pages/Checkout.jsx";

function App() {
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  // === 1. LOGIKA DETEKSI OFFLINE ===
  useEffect(() => {
    const handleOnline = () => {
      setIsOffline(false);
      console.log("Back Online!");
    };
    
    const handleOffline = () => {
      setIsOffline(true);
      console.log("Gone Offline - Switching to Guest Mode");
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // === 2. LOGIKA GUEST MODE OVERRIDE ===
  useEffect(() => {
    if (isOffline) {
      const realUser = localStorage.getItem('user');
      if (realUser) sessionStorage.setItem('backup_user', realUser);

      const guestData = JSON.stringify({ full_name: 'Guest', email: 'guest@truekicks.com' });
      localStorage.setItem('user', guestData);
      
      window.dispatchEvent(new Event('storage'));
    } else {
      const backupUser = sessionStorage.getItem('backup_user');
      if (backupUser) {
        localStorage.setItem('user', backupUser);
        window.dispatchEvent(new Event('storage'));
      }
    }
  }, [isOffline]);

  return (
    <CartProvider> 
      <WishlistProvider>
        <BrowserRouter>
          {isOffline && (
            <div className="bg-red-500 text-white text-xs font-bold text-center py-1 fixed top-0 w-full z-[100]">
              OFFLINE MODE - GUEST ACCESS
            </div>
          )}

          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/login" element={<Login />} /> 

            {/* Layout membungkus semua halaman utama */}
            <Route element={<Layout />}>
              <Route path="/home" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/sneakers" element={<Sneakers />} />
              <Route path="/apparel" element={<Apparel />} /> 
              <Route path="/sale" element={<Sale />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/product/:type/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/profile" element={<Profile />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;