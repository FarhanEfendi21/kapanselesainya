import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// 1. CUSTOM HOOK: SCROLL ANIMATION
// =========================================
const useScrollAnimation = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Trigger animasi saat 10% elemen masuk layar
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px", // Pre-load sedikit agar smooth di mobile
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) observer.disconnect();
    };
  }, []);

  return [elementRef, isVisible];
};

// =========================================
// 2. KOMPONEN PRODUCT CARD (DENGAN DELAY)
// =========================================
const ProductCard = ({ item, navigate, index }) => {
  const [ref, isVisible] = useScrollAnimation();

  // Hitung delay: item ke-1 = 0ms, item ke-2 = 100ms, dst (maksimal 500ms agar tidak terlalu lama)
  const delay = (index % 6) * 100;

  return (
    <div
      ref={ref}
      onClick={() => navigate(`/product/sale_products/${item.id}`)}
      style={{ transitionDelay: `${delay}ms` }} // <--- MAGIC: Ini yang bikin efek berurutan
      className={`
        bg-white p-4 rounded-3xl shadow-sm border border-gray-100 
        hover:shadow-lg transition-all duration-700 ease-out 
        hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between group
        transform will-change-transform
        ${isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95" // Ubah jarak sedikit agar lebih smooth di HP
        }
      `}
    >
      <div>
        <div className="relative h-[220px] bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors overflow-hidden">
          <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-gray-900 text-[10px] px-2 py-1 rounded-md font-bold border border-gray-100 z-10">
            {item.category}
          </span>
          <img
            src={item.image_url}
            className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105"
            alt={item.name}
            loading="lazy"
            onError={(e) => {
              e.target.src =
                "https://via.placeholder.com/300x300?text=No+Image";
            }}
          />
        </div>

        <h3 className="font-bold text-gray-900 text-sm line-clamp-2 min-h-[40px] group-hover:text-[#FF5500] transition-colors">
          {item.name}
        </h3>
      </div>

      <div className="flex items-center justify-between mt-4">
        <p className="text-[#FF5500] font-bold text-sm md:text-base">
          Rp {(item.price / 1000).toLocaleString()}K
        </p>
        <button
          onClick={(e) => {
            e.stopPropagation();
          }}
          className="w-9 h-9 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors shadow-md shadow-blue-900/20"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

const SaleProductCard = ({ item, navigate }) => {
  // --- LOGIKA HARGA (Sesuai Database Sale) ---
  const originalPrice = item.price;
  const currentPrice = item.discount_price || item.price;

  // Hitung persentase
  const discountPercentage = Math.round(
    ((originalPrice - currentPrice) / (originalPrice || 1)) * 100
  );

  return (
    <div
      onClick={() => navigate(`/product/sale_products/${item.id}`)}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-900 p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-lg border border-purple-500/20 hover:border-purple-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/30 cursor-pointer group h-full flex flex-col justify-between relative overflow-hidden"
    >
      {/* Neon Glow Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-transparent to-pink-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Animated Orb */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 group-hover:scale-150"></div>

      {/* Gambar & Badge */}
      <div>
        <div className="relative h-[140px] md:h-[180px] bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-xl md:rounded-2xl flex items-center justify-center mb-3 md:mb-4 group-hover:from-purple-900/20 group-hover:to-pink-900/20 transition-all duration-500 overflow-hidden border border-white/5">
          {/* Badge Persen - Neon Style */}
          {discountPercentage > 0 && (
            <span className="absolute top-2 left-2 md:top-3 md:left-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-[9px] md:text-[10px] font-black px-2 md:px-3 py-1 md:py-1.5 rounded-md md:rounded-lg z-10 shadow-lg shadow-purple-500/50 border border-purple-400/30 animate-pulse">
              -{discountPercentage}%
            </span>
          )}

          {/* Neon Glow behind image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>

          <img
            src={item.image_url}
            className="w-[85%] h-[85%] object-contain mix-blend-lighten transition-all duration-500 group-hover:scale-110 group-hover:-rotate-6 relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.3)]"
            alt={item.name}
            loading="lazy"
          />
        </div>

        <h3 className="font-bold text-gray-100 text-xs md:text-sm line-clamp-2 mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300 relative z-10 min-h-[2.5em] md:min-h-[2.8em]">
          {item.name}
        </h3>
        <p className="text-[10px] md:text-xs text-gray-500 group-hover:text-purple-400/70 transition-colors relative z-10 truncate">{item.category}</p>
      </div>

      {/* Harga - Neon Gradient */}
      <div className="mt-2 md:mt-3 relative z-10">
        {discountPercentage > 0 && (
          <p className="text-gray-600 text-[10px] md:text-xs line-through decoration-purple-500/50 decoration-2">
            Rp {(originalPrice / 1000).toLocaleString()}K
          </p>
        )}
        <div className="flex items-center justify-between mt-1">
          <p className="font-black text-base md:text-lg bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
            Rp {(currentPrice / 1000).toLocaleString()}K
          </p>
          <button className="w-8 h-8 md:w-9 md:h-9 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg md:rounded-xl flex items-center justify-center hover:from-purple-500 hover:to-pink-500 transition-all duration-300 shadow-lg shadow-purple-500/50 hover:shadow-purple-500/80 hover:scale-110 active:scale-95 border border-purple-400/30">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2.5}
              stroke="currentColor"
              className="w-3.5 h-3.5 md:w-4 md:h-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 pointer-events-none"></div>
    </div>
  );
};

export default function Sale() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16;

  // --- STATE UNTUK ANIMASI BANNER ---
  const [particles, setParticles] = useState([]);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;

        const response = await axios.get(`${API_URL}/api/sale`);

        console.log("Data Sale:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data sale:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    // Generate floating particles untuk banner
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      duration: Math.random() * 5 + 3,
      delay: Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  // --- LOGIKA PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = products.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Handle mouse move untuk parallax effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 font-poppins transition-colors duration-300">
      <Navbar />

      {/* INJEKSI CSS ANIMASI KHUSUS HALAMAN INI */}
      <style>{`
        @keyframes floatUp {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-15px) rotate(12deg); }
        }
        @keyframes floatDown {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(15px) rotate(-12deg); }
        }
        @keyframes wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        @keyframes slideIn {
          from { transform: translateX(-100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(255, 255, 255, 0.3), 0 0 40px rgba(255, 255, 255, 0.2); }
          50% { box-shadow: 0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3); }
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1); }
        }
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
        @keyframes bounce-in {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.1) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0); opacity: 0.4; }
          25% { transform: translate(10px, -20px); opacity: 0.7; }
          50% { transform: translate(-5px, -40px); opacity: 0.4; }
          75% { transform: translate(-15px, -20px); opacity: 0.7; }
        }
        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.9); opacity: 1; }
          100% { transform: scale(1.3); opacity: 0; }
        }
        
        .animate-float-up {
          animation: floatUp 3s ease-in-out infinite;
        }
        .animate-float-down {
          animation: floatDown 4s ease-in-out infinite;
        }
        .animate-wiggle {
          animation: wiggle 2s ease-in-out infinite;
        }
        .animate-slide-in {
          animation: slideIn 0.8s ease-out forwards;
        }
        .animate-slide-in-right {
          animation: slideInRight 0.8s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.6s ease-out forwards;
        }
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        .animate-sparkle {
          animation: sparkle 1.5s ease-in-out infinite;
        }
        .animate-shimmer {
          animation: shimmer 3s linear infinite;
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-float-particle {
          animation: float-particle 4s ease-in-out infinite;
        }
        .animate-rotate-slow {
          animation: rotate-slow 20s linear infinite;
        }
        .animate-pulse-ring {
          animation: pulse-ring 2s cubic-bezier(0.215, 0.61, 0.355, 1) infinite;
        }
      `}</style>

      <div className="pt-24 pb-16 md:pt-32 md:pb-20 max-w-7xl mx-auto px-4 md:px-6">
        {/* === SALE HEADER BANNER - DARK THEME RESPONSIVE === */}
        <div
          className="relative bg-gradient-to-br from-gray-900 via-black to-gray-900 rounded-xl md:rounded-[2.5rem] p-6 md:p-12 lg:p-16 mb-6 md:mb-12 text-center text-white overflow-hidden 
                     shadow-lg md:shadow-2xl shadow-purple-900/30 transition-all duration-500 group hover:scale-[1.01] hover:shadow-purple-900/50 cursor-pointer
                     border border-white/5"
          onMouseMove={handleMouseMove}
        >
          {/* Animated Neon Gradient Orbs - Smaller on mobile */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Main Center Glow */}
            <div
              className="absolute top-1/2 left-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-gradient-to-r from-purple-600/30 via-pink-600/20 to-orange-600/30 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 animate-pulse"
              style={{ animationDuration: "5s" }}
            ></div>

            {/* Floating Accent Orbs - Hidden on small mobile */}
            <div className="hidden sm:block absolute -top-20 -left-20 w-48 md:w-64 h-48 md:h-64 bg-gradient-to-br from-blue-500/20 to-purple-600/10 rounded-full blur-3xl animate-float-up"></div>
            <div className="hidden sm:block absolute -bottom-20 -right-20 w-56 md:w-80 h-56 md:h-80 bg-gradient-to-br from-pink-500/20 to-orange-600/10 rounded-full blur-3xl animate-float-down"></div>

            {/* Rotating Neon Rings - Smaller on mobile */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[500px] md:h-[500px] border border-purple-500/10 rounded-full animate-rotate-slow"></div>
          </div>

          {/* Grid Pattern Overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] md:opacity-[0.03]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />

          {/* === FLOATING BADGES - Hidden on mobile to avoid overlap === */}
          {/* Top Right Badge - Hidden on mobile */}
          <div
            className="hidden md:block absolute top-6 right-6 md:top-10 md:right-12 animate-bounce-in z-20"
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative group/badge">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full blur-lg opacity-60 animate-pulse-ring"></div>
              <div className="relative bg-gradient-to-br from-purple-500 to-pink-600 text-white font-black text-xs md:text-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-2xl transform rotate-12 border border-purple-300/30 animate-glow group-hover/badge:rotate-0 transition-transform duration-300 backdrop-blur-sm">
                SALE! 🔥
              </div>
            </div>
          </div>

          {/* Bottom Left Badge - Hidden on mobile */}
          <div
            className="hidden md:block absolute bottom-6 left-6 md:bottom-10 md:left-12 animate-bounce-in z-20"
            style={{ animationDelay: "0.4s" }}
          >
            <div className="relative group/badge">
              <div
                className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full blur-lg opacity-60 animate-pulse-ring"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="relative bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-black text-xs md:text-sm px-4 md:px-5 py-1.5 md:py-2 rounded-full shadow-2xl transform -rotate-12 border border-cyan-300/30 animate-glow group-hover/badge:rotate-0 transition-transform duration-300">
                HOT DEALS ⚡
              </div>
            </div>
          </div>

          {/* Top Center Badge - Smaller on mobile */}
          <div
            className="absolute top-4 md:top-6 left-1/2 -translate-x-1/2 animate-bounce-in z-20"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="relative">
              <div
                className="absolute inset-0 bg-gradient-to-r from-orange-400 to-pink-500 rounded-full blur-md opacity-70 animate-pulse-ring"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="relative bg-gradient-to-br from-orange-400 to-pink-500 text-white font-black text-[10px] md:text-xs px-3 md:px-4 py-1 md:py-1.5 rounded-full shadow-xl animate-wiggle border border-orange-200/30">
                UP TO 50% OFF
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="relative z-10">
            {/* Badge - Responsive size */}
            <div className="animate-scale-in mb-4 md:mb-6">
              <span className="relative inline-block bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-xl text-purple-300 text-[10px] md:text-xs font-black px-4 md:px-6 py-2 md:py-2.5 rounded-full uppercase tracking-wider md:tracking-widest shadow-xl md:shadow-2xl border border-purple-400/30">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-sm animate-pulse"></span>
                <span className="relative flex items-center gap-1.5 md:gap-2">
                  <svg
                    className="w-3 h-3 md:w-4 md:h-4 animate-spin text-purple-400"
                    style={{ animationDuration: "3s" }}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="hidden sm:inline">Limited Time Offer</span>
                  <span className="sm:hidden">Limited Offer</span>
                </span>
              </span>
            </div>

            {/* Main Title - Fully responsive */}
            <h1
              className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-black tracking-tighter mb-4 md:mb-8 drop-shadow-2xl animate-slide-in"
              style={{
                transform: `translate(${mousePosition.x * 4}px, ${mousePosition.y * 4}px)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <span className="block mb-1 md:mb-2 text-white">MID-SEASON</span>
              <span className="relative inline-block">
                <span
                  className="relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 animate-shimmer font-black italic"
                  style={{ backgroundSize: "200% auto" }}
                >
                  MEGA SALE
                </span>
                {/* Neon Glow Effect */}
                <div className="absolute -inset-1 md:-inset-2 bg-gradient-to-r from-purple-500/30 via-pink-500/30 to-cyan-500/30 blur-xl md:blur-2xl -z-10 animate-pulse"></div>
              </span>
            </h1>

            {/* Description - Responsive text */}
            <p
              className="text-gray-300 text-xs sm:text-sm md:text-base lg:text-xl max-w-3xl mx-auto font-medium mb-6 md:mb-10 leading-relaxed animate-scale-in px-4"
              style={{ animationDelay: "0.3s" }}
            >
              Get up to{" "}
              <span
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-pink-600 text-white font-black text-base sm:text-lg md:text-2xl lg:text-3xl px-2.5 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-md sm:rounded-lg md:rounded-xl shadow-lg md:shadow-2xl shadow-purple-500/50 animate-bounce-in mx-0.5 md:mx-1 border border-purple-400/30"
                style={{ animationDelay: "0.6s" }}
              >
                50% OFF
              </span>{" "}
              <span className="hidden sm:inline">on selected premium sneakers from</span>
              <span className="sm:hidden">on sneakers from</span>
              <span className="font-black bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Nike, Adidas, Jordan
              </span>{" "}
              <span className="hidden sm:inline">and more!</span>
            </p>

            {/* CTA Button - Fully responsive */}
            <div
              className="animate-slide-in-right"
              style={{ animationDelay: "0.5s" }}
            >
              <button className="group relative mt-2 md:mt-4 px-6 sm:px-8 md:px-12 py-3 sm:py-4 md:py-5 bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 text-white font-black rounded-lg sm:rounded-xl md:rounded-2xl text-[11px] sm:text-xs md:text-sm uppercase tracking-wide sm:tracking-wider md:tracking-widest shadow-lg md:shadow-2xl shadow-purple-500/50 transition-all duration-500 hover:shadow-purple-500/80 hover:scale-105 active:scale-95 overflow-hidden border border-purple-400/30">
                {/* Animated Gradient Background */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>

                {/* Glow Ring */}
                <div className="absolute inset-0 bg-purple-500 rounded-lg sm:rounded-xl md:rounded-2xl blur-xl opacity-0 group-hover:opacity-60 transition-opacity"></div>

                <span className="relative flex items-center justify-center gap-2 md:gap-3">
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                  Shop Now
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-5 md:h-5 group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* === GRID PRODUK SALE === */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[320px] bg-gray-200 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : (
          <>
            {/* TAMPILKAN ITEM */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-12 md:mb-16">
              {currentItems.map((item) => (
                <SaleProductCard
                  key={item.id}
                  item={item}
                  navigate={navigate}
                />
              ))}
            </div>

            {/* PAGINATION CONTROLS */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                <button
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === 1
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                    }`}
                >
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
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                    />
                  </svg>
                </button>

                {[...Array(totalPages)].map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => paginate(index + 1)}
                    className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${currentPage === index + 1
                      ? "bg-black text-white shadow-lg transform scale-110"
                      : "text-gray-500 hover:bg-gray-100"
                      }`}
                  >
                    {index + 1}
                  </button>
                ))}

                <button
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${currentPage === totalPages
                    ? "text-gray-300 border-gray-200 cursor-not-allowed"
                    : "text-gray-600 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                    }`}
                >
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
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}
