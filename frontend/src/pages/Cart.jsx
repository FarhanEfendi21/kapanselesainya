import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx"; // Pastikan ekstensi .jsx
import Footer from "../components/Footer.jsx"; // Pastikan ekstensi .jsx
import { useCart } from "../Context/CartContext.jsx"; // Pastikan path context benar

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper: Format Harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  // === TAMPILAN JIKA KERANJANG KOSONG ===
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 font-poppins flex flex-col">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-20 animate-fade-in">
          <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-gray-200/50 border border-gray-100">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-gray-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-gray-900 mb-3 tracking-tight">Your Bag is Empty</h2>
          <p className="text-gray-500 mb-8 max-w-xs mx-auto leading-relaxed">Looks like you haven't found your perfect pair yet.</p>
          <button 
            onClick={() => navigate('/sneakers')}
            className="bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-sm hover:bg-[#FF5500] transition-all shadow-xl hover:shadow-orange-500/30 transform hover:-translate-y-1"
          >
            Start Shopping
          </button>
        </div>
        {/* Footer disembunyikan saat kosong agar tampilan tengah lebih fokus, atau bisa ditampilkan jika mau */}
      </div>
    );
  }

  // === TAMPILAN UTAMA KERANJANG ===
  return (
    <div className="min-h-screen bg-[#FAFAFA] font-poppins flex flex-col">
      <Navbar />

      {/* PADDING ATAS (pt-32) diperbesar agar tidak tertutup Navbar.
         PADDING BAWAH (pb-32) diperbesar untuk mengakomodasi Bottom Nav di HP.
      */}
      <main className="flex-grow pt-32 pb-40 md:pt-36 md:pb-20 max-w-7xl mx-auto px-6 md:px-12 w-full">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
                <h1 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight">MY BAG</h1>
                <p className="text-gray-500 mt-2 font-medium text-sm">
                    You have <span className="text-[#FF5500] font-bold">{cartItems.length} items</span> in your cart
                </p>
            </div>
            <button 
                onClick={() => navigate('/home')} 
                className="text-xs font-bold text-gray-400 hover:text-black underline underline-offset-4 transition-colors self-start md:self-auto"
            >
                Continue Shopping
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16">
          
          {/* === KOLOM KIRI: DAFTAR ITEM === */}
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => {
                const itemPrice = Number(item.price) || 0;
                const subtotalItem = itemPrice * item.quantity;
                
                return (
                    <div 
                        key={`${item.id}-${item.size}`} 
                        className="group bg-white p-5 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 flex flex-row gap-5 items-stretch relative overflow-hidden"
                    >
                        {/* Gambar Produk */}
                        <div className="w-28 h-28 md:w-36 md:h-36 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center overflow-hidden p-2 relative">
                          <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-50 transition-opacity"></div>
                          <img 
                            src={item.image || item.image_url} 
                            alt={item.name} 
                            className="w-full h-full object-contain mix-blend-multiply transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500" 
                          />
                        </div>

                        {/* Detail Produk */}
                        <div className="flex-grow flex flex-col justify-between py-1">
                          {/* Bagian Atas: Nama & Hapus */}
                          <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-bold text-sm md:text-lg text-gray-900 leading-tight line-clamp-2 pr-8 mb-1">
                                    {item.name}
                                </h3>
                                <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                                    <span className="bg-gray-100 px-2 py-1 rounded-md text-gray-600">Size: {item.size}</span>
                                    {/* Jika ada warna, bisa ditambah di sini */}
                                </div>
                              </div>
                              
                              {/* Tombol Hapus (Icon Sampah) */}
                              <button 
                                onClick={() => removeFromCart(item.id, item.size)}
                                className="text-gray-300 hover:text-red-500 transition-colors p-2 absolute top-4 right-4 md:static"
                                title="Remove item"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                </svg>
                              </button>
                          </div>

                          {/* Bagian Bawah: Quantity & Harga */}
                          <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 mt-3">
                            
                            {/* Quantity Control */}
                            <div className="flex items-center self-start bg-gray-50 border border-gray-200 rounded-xl p-1 h-10 w-fit">
                              <button 
                                onClick={() => updateQuantity(item.id, item.size, Math.max(1, item.quantity - 1))} 
                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-lg transition-all"
                              >
                                -
                              </button>
                              <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                              <button 
                                onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)} 
                                className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black hover:bg-white rounded-lg transition-all"
                              >
                                +
                              </button>
                            </div>
                            
                            {/* Harga Total Item */}
                            <div className="text-right">
                                <p className="text-xs text-gray-400 font-medium line-through decoration-red-300 decoration-1 md:block hidden">
                                    {formatPrice(itemPrice * 1.2 * item.quantity)} {/* Dummy Harga Coret */}
                                </p>
                                <p className="text-base md:text-xl font-black text-gray-900">
                                  {formatPrice(subtotalItem)}
                                </p>
                            </div>
                          </div>
                        </div>
                    </div>
                );
            })}
          </div>

          {/* === KOLOM KANAN: RINGKASAN ORDER === */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-xl shadow-gray-200/50 border border-gray-100 sticky top-28">
              <h2 className="font-black text-lg md:text-xl mb-6 flex items-center gap-2">
                ORDER SUMMARY
                <span className="w-2 h-2 bg-[#FF5500] rounded-full animate-pulse"></span>
              </h2>
              
              <div className="space-y-4 mb-8 pb-8 border-b border-gray-100">
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Subtotal ({cartItems.length} items)</span>
                  <span className="text-gray-900">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Shipping Cost</span>
                  <span className="text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-bold uppercase">Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-gray-500">
                  <span>Tax (Included)</span>
                  <span className="text-gray-900">-</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-8">
                <div>
                    <span className="block text-xs text-gray-400 font-bold uppercase tracking-wider">Total Pay</span>
                    <span className="font-black text-2xl md:text-3xl text-[#FF5500] mt-1 block leading-none">
                        {formatPrice(totalPrice)}
                    </span>
                </div>
              </div>

              <button 
                onClick={() => navigate('/checkout')}
                className="w-full bg-black text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-gray-900/20 hover:bg-[#FF5500] hover:shadow-orange-500/30 hover:scale-[1.02] transition-all active:scale-95 flex justify-center items-center gap-3 group"
              >
                Checkout Now
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 group-hover:translate-x-1 transition-transform">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
              
              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider opacity-70">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
                </svg>
                100% Secure Checkout
              </div>
            </div>
          </div>

        </div>
      </main>
      
      {/* Footer hanya muncul di desktop, di mobile sudah ada BottomNav */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}