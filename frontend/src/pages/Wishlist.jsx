import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useWishlist } from "../Context/WishlistContext";

export default function Wishlist() {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-poppins transition-colors duration-300">
      <Navbar />

      <div className="pt-32 pb-24 max-w-7xl mx-auto px-6">
        <h1 className="text-3xl md:text-4xl font-black text-gray-900 mb-2">MY WISHLIST</h1>
        <p className="text-gray-500 mb-10">Save your favorite kicks for later.</p>

        {wishlistItems.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
              💔
            </div>
            <p className="text-xl font-bold text-gray-400">Your wishlist is empty</p>
            <button onClick={() => navigate('/sneakers')} className="mt-4 text-[#FF5500] font-bold hover:underline">
              Explore Sneakers
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all relative group cursor-pointer"
                onClick={() => navigate(`/product/sneakers/${item.id}`)}
              >
                {/* Tombol Hapus */}
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Mencegah masuk ke detail saat klik hapus
                    removeFromWishlist(item.id);
                  }}
                  className="absolute top-3 right-3 z-10 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:bg-red-100 hover:text-red-500 transition-colors"
                >
                  ✕
                </button>

                <div className="relative h-[160px] bg-gray-50 rounded-2xl flex items-center justify-center mb-4 overflow-hidden">
                  <img src={item.image} className="w-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500" alt={item.name} />
                </div>

                <h3 className="font-bold text-gray-900 text-sm line-clamp-1">{item.name}</h3>
                <p className="text-[#FF5500] font-bold text-sm mt-1">Rp {(item.price / 1000).toLocaleString()}K</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}