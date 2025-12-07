import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Footer from "../components/Footer.jsx";
import { useCart } from "../Context/CartContext.jsx";

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Helper: Format Harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Wrapper update quantity dengan sedikit delay visual (UX)
  const handleUpdateQty = (id, size, qty) => {
    setIsUpdating(true);
    updateQuantity(id, size, qty);
    setTimeout(() => setIsUpdating(false), 300);
  };

  // === TAMPILAN KOSONG (EMPTY STATE) ===
  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-poppins flex flex-col transition-colors duration-300">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center text-center px-6 pt-20 animate-fade-in">
          <div className="relative mb-8 group">
            <div className="absolute inset-0 bg-orange-200 rounded-full blur-2xl opacity-50 group-hover:opacity-70 transition-opacity"></div>
            <div className="relative w-32 h-32 bg-white rounded-full flex items-center justify-center shadow-xl border-4 border-gray-50 transform group-hover:scale-110 transition-transform duration-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-12 h-12 text-gray-300 group-hover:text-orange-500 transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
            </div>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-3 tracking-tighter">
            YOUR BAG IS EMPTY
          </h2>
          <p className="text-gray-500 mb-8 max-w-sm mx-auto leading-relaxed text-sm md:text-base">
            Looks like you haven't made your choice yet. <br /> Discover our
            latest collection now.
          </p>
          <button
            onClick={() => navigate("/sneakers")}
            className="group relative bg-black text-white px-10 py-4 rounded-full font-bold uppercase tracking-widest text-xs md:text-sm overflow-hidden shadow-lg hover:shadow-orange-500/30 transition-all hover:-translate-y-1"
          >
            <span className="relative z-10">Start Shopping</span>
            <div className="absolute inset-0 bg-[#FF5500] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ease-out"></div>
          </button>
        </div>
      </div>
    );
  }

  // === TAMPILAN UTAMA (CART FILLED) ===
  return (
    <div className="min-h-screen bg-[#F8F9FA] dark:bg-gray-900 font-poppins flex flex-col transition-colors duration-300">
      <Navbar />

      <main className="flex-grow pt-32 pb-40 md:pt-40 md:pb-24 max-w-7xl mx-auto px-4 md:px-8 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4 border-b border-gray-200 pb-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter mb-2">
              SHOPPING BAG
            </h1>
            <p className="text-gray-500 font-medium text-sm flex items-center gap-2">
              <span className="bg-black text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
                {cartItems.length} ITEMS
              </span>
              in your cart
            </p>
          </div>
          <button
            onClick={() => navigate("/sneakers")}
            className="text-xs font-bold text-gray-400 hover:text-black hover:underline underline-offset-4 transition-colors flex items-center gap-1 group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-3 h-3 group-hover:-translate-x-1 transition-transform"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
            Continue Shopping
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* === KIRI: ITEM LIST (Column 8) === */}
          <div className="lg:col-span-8 space-y-6">
            {cartItems.map((item) => {
              const itemPrice = Number(item.price) || 0;

              return (
                <div
                  key={`${item.id}-${item.size}`}
                  className="group bg-white p-4 md:p-6 rounded-[2rem] shadow-sm border border-transparent hover:border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-row gap-4 md:gap-6 items-center relative overflow-hidden"
                >
                  {/* Gambar Produk */}
                  <div className="w-24 h-24 md:w-32 md:h-32 bg-gray-50 rounded-2xl flex-shrink-0 flex items-center justify-center p-2 relative overflow-hidden">
                    <img
                      src={item.image || item.image_url}
                      alt={item.name}
                      className="w-[90%] h-[90%] object-contain mix-blend-multiply transform group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500 ease-out"
                    />
                  </div>

                  {/* Detail */}
                  <div className="flex-grow flex flex-col justify-between py-1 min-w-0">
                    <div className="flex justify-between items-start gap-4">
                      <div>
                        <h3 className="font-bold text-sm md:text-lg text-gray-900 leading-snug line-clamp-2 mb-1 group-hover:text-[#FF5500] transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs text-gray-400 font-medium">
                          Size:{" "}
                          <span className="text-gray-800 font-bold">
                            {item.size}
                          </span>
                        </p>
                      </div>

                      {/* Tombol Hapus (Desktop) */}
                      <button
                        onClick={() => removeFromCart(item.id, item.size)}
                        className="hidden md:flex text-gray-300 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>

                    {/* Control Bawah */}
                    <div className="flex justify-between items-end mt-4">
                      {/* Qty Control */}
                      <div className="flex items-center bg-gray-100/80 rounded-xl p-1 h-9 md:h-10">
                        <button
                          onClick={() =>
                            handleUpdateQty(
                              item.id,
                              item.size,
                              Math.max(1, item.quantity - 1)
                            )
                          }
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-black rounded-lg transition-all active:scale-90"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs md:text-sm font-bold tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            handleUpdateQty(
                              item.id,
                              item.size,
                              item.quantity + 1
                            )
                          }
                          className="w-8 h-full flex items-center justify-center text-gray-500 hover:bg-white hover:text-black rounded-lg transition-all active:scale-90"
                        >
                          +
                        </button>
                      </div>

                      {/* Harga */}
                      <div className="text-right">
                        <p className="text-sm md:text-lg font-black text-gray-900">
                          {formatPrice(itemPrice * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tombol Hapus (Mobile Overlay - Slide to left feel) */}
                  <button
                    onClick={() => removeFromCart(item.id, item.size)}
                    className="md:hidden absolute top-2 right-2 p-2 text-gray-300 hover:text-red-500"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M18 6 6 18" />
                      <path d="m6 6 12 12" />
                    </svg>
                  </button>
                </div>
              );
            })}
          </div>

          {/* === KANAN: ORDER SUMMARY (Sticky - Column 4) === */}
          <div className="lg:col-span-4">
            <div className="bg-white p-6 md:p-8 rounded-[2.5rem] shadow-2xl shadow-gray-200/50 border border-white sticky top-28 lg:top-32 relative overflow-hidden">
              {/* Background Dekoratif */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-orange-100 to-transparent rounded-bl-[100%] opacity-50 -z-10"></div>

              <h2 className="font-black text-xl mb-6 flex items-center gap-2">
                SUMMARY
              </h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 items-center">
                  <span>Shipping</span>
                  <span className="text-green-600 bg-green-50 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wide">
                    Free
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Tax (Included)</span>
                  <span className="text-gray-900">-</span>
                </div>
              </div>

              {/* Divider Garis Putus */}
              <div className="border-t border-dashed border-gray-200 my-6"></div>

              <div className="flex justify-between items-end mb-8">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">
                  Total
                </span>
                <span className="font-black text-3xl text-gray-900 tracking-tight">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full group relative bg-black text-white h-14 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-gray-900/20 hover:shadow-orange-500/40 transition-all active:scale-95 overflow-hidden flex items-center justify-center gap-3"
              >
                <span className="relative z-10 group-hover:text-white transition-colors">
                  Checkout
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                  />
                </svg>
                {/* Efek Hover Background */}
                <div className="absolute inset-0 bg-[#FF5500] transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out"></div>
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-gray-400 text-[10px] font-bold uppercase tracking-wider opacity-60">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
                  />
                </svg>
                Secure Checkout
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer desktop only (mobile pakai bottom nav) */}
      <div className="hidden md:block">
        <Footer />
      </div>
    </div>
  );
}
