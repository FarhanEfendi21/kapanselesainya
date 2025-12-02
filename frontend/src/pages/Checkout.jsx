import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../Context/CartContext";
import { supabase } from "../lib/supabaseClient";
import toast, { Toaster } from "react-hot-toast";

export default function Checkout() {
  const { cartItems, totalPrice, clearCart } = useCart(); // Ambil data keranjang
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    address: "",
    city: "",
    phone: "",
    postalCode: "",
  });

  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);

  // Cek User Login & Redirect jika keranjang kosong
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    if (cartItems.length === 0) {
      navigate("/cart");
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 1. Simpan Pesanan ke Supabase
      const { error } = await supabase.from("orders").insert({
        user_id: user.id, // ID dari localStorage
        full_name: formData.fullName,
        address: `${formData.address}, ${formData.city}, ${formData.postalCode}`,
        phone: formData.phone,
        total_price: totalPrice,
        items: cartItems, // Simpan array sepatu sebagai JSON
        status: "Processing",
      });

      if (error) throw error;

      // 2. Jika sukses, bersihkan keranjang & notifikasi
      clearCart(); // <-- Anda perlu menambahkan fungsi ini di CartContext nanti
      toast.success("Order Placed Successfully! 🎉");

      // 3. Redirect ke Home atau Profile setelah 2 detik
      setTimeout(() => {
        navigate("/profile");
      }, 2000);
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Failed to place order.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />
      <Toaster position="bottom-center" />

      <div className="pt-32 pb-20 max-w-6xl mx-auto px-6">
        <h1 className="text-3xl font-black text-gray-900 mb-8 uppercase">
          Checkout
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* FORMULIR PENGIRIMAN (KIRI) */}
          <div className="lg:col-span-7">
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100">
              <h2 className="font-bold text-xl mb-6 flex items-center gap-2">
                <span>📍</span> Shipping Details
              </h2>

              <form
                id="checkout-form"
                onSubmit={handlePayment}
                className="space-y-5"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Full Name
                  </label>
                  <input
                    required
                    name="fullName"
                    onChange={handleChange}
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Phone Number
                  </label>
                  <input
                    required
                    name="phone"
                    onChange={handleChange}
                    type="tel"
                    placeholder="0812..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                    Address
                  </label>
                  <textarea
                    required
                    name="address"
                    onChange={handleChange}
                    rows="3"
                    placeholder="Street name, House number..."
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      City
                    </label>
                    <input
                      required
                      name="city"
                      onChange={handleChange}
                      type="text"
                      placeholder="Jakarta"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-2">
                      Postal Code
                    </label>
                    <input
                      required
                      name="postalCode"
                      onChange={handleChange}
                      type="text"
                      placeholder="12345"
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* RINGKASAN PESANAN (KANAN) */}
          <div className="lg:col-span-5">
            <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 sticky top-32">
              <h2 className="font-bold text-xl mb-6">Order Summary</h2>

              {/* Item List Kecil */}
              <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2 custom-scrollbar">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-gray-50 rounded-lg flex items-center justify-center">
                      <img
                        src={item.image}
                        className="w-[80%] mix-blend-multiply"
                        alt=""
                      />
                    </div>
                    <div className="flex-grow">
                      <p className="text-xs font-bold text-gray-900 line-clamp-1">
                        {item.name}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-xs font-bold">
                      {((item.price * item.quantity) / 1000).toLocaleString()}K
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="font-bold">
                    Rp {(totalPrice / 1000).toLocaleString()}K
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className="text-green-600 font-bold">Free</span>
                </div>
                <div className="flex justify-between text-xl font-black mt-4 pt-4 border-t border-dashed border-gray-200">
                  <span>Total</span>
                  <span className="text-[#FF5500]">
                    Rp {(totalPrice / 1000).toLocaleString()}K
                  </span>
                </div>
              </div>

              <button
                form="checkout-form"
                type="submit"
                disabled={loading}
                className="w-full mt-8 bg-black text-white py-4 rounded-xl font-bold uppercase tracking-wider hover:bg-gray-800 transition-all active:scale-95 shadow-lg flex justify-center items-center gap-2"
              >
                {loading ? "Processing..." : "Confirm Payment"}
                {!loading && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-5 h-5"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
