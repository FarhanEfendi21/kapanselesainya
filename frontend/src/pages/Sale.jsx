import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Sale() {
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
        // 1. Ambil URL Backend dari Environment Variable
        const API_URL = import.meta.env.VITE_API_BASE_URL;

        // 2. Gunakan URL tersebut
        // Ganti hardcoded localhost dengan variable API_URL
        const response = await axios.get(`${API_URL}/api/products`);
        
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
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
      delay: Math.random() * 2
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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle mouse move untuk parallax effect
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setMousePosition({ x, y });
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
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

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        
        {/* === SALE HEADER BANNER === */}
        <div 
          className="relative bg-gradient-to-br from-red-600 via-red-500 to-orange-600 rounded-[2.5rem] p-8 md:p-12 mb-12 text-center text-white overflow-hidden 
                     shadow-xl shadow-red-400/50 transition-all duration-500 group hover:scale-[1.02] hover:shadow-2xl cursor-pointer"
          onMouseMove={handleMouseMove}
        >
            
            {/* Animated Gradient Background Orbs */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-1/2 left-1/2 w-[350px] h-[350px] bg-red-400/40 rounded-full blur-3xl animate-pulse -translate-x-1/2 -translate-y-1/2" 
                   style={{ animationDuration: '4s' }}></div>
              <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl animate-float-up"></div>
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-yellow-300/20 rounded-full blur-3xl animate-float-down"></div>
              
              {/* Rotating Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-2 border-white/10 rounded-full animate-rotate-slow"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 border border-white/5 rounded-full animate-rotate-slow" 
                   style={{ animationDuration: '15s', animationDirection: 'reverse' }}></div>
            </div>

            {/* Floating Particles */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((particle) => (
                <div
                  key={particle.id}
                  className="absolute rounded-full bg-white/30 animate-float-particle"
                  style={{
                    left: `${particle.x}%`,
                    top: `${particle.y}%`,
                    width: `${particle.size}px`,
                    height: `${particle.size}px`,
                    animationDuration: `${particle.duration}s`,
                    animationDelay: `${particle.delay}s`
                  }}
                />
              ))}
            </div>

            {/* Sparkle Effects */}
            <div className="absolute top-10 left-20 w-3 h-3 bg-white rounded-full animate-sparkle"></div>
            <div className="absolute top-20 right-32 w-2 h-2 bg-yellow-200 rounded-full animate-sparkle" style={{ animationDelay: '0.5s' }}></div>
            <div className="absolute bottom-20 left-1/3 w-2 h-2 bg-white rounded-full animate-sparkle" style={{ animationDelay: '1s' }}></div>
            <div className="absolute bottom-32 right-20 w-3 h-3 bg-yellow-300 rounded-full animate-sparkle" style={{ animationDelay: '1.5s' }}></div>
            
            {/* Shimmer Line Top */}
            <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%' }}></div>
            </div>

            {/* Shimmer Line Bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-px overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer" 
                   style={{ backgroundSize: '200% 100%', animationDelay: '1.5s' }}></div>
            </div>
            
            {/* === ANIMASI LOGO MELAYANG === */}
            {/* Logo Kanan Atas - Enhanced */}
            <div className="absolute top-6 right-6 md:top-10 md:right-12 animate-bounce-in z-20" style={{ animationDelay: '0.2s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-white/50 rounded-full blur-md animate-pulse-ring"></div>
                  <div className="relative bg-gradient-to-br from-white to-red-50 text-red-600 font-black text-xs md:text-sm px-4 py-1.5 rounded-full shadow-lg transform rotate-12 border-2 border-red-100 animate-glow group-hover:rotate-0 transition-transform duration-300">
                      SALE! 🔥
                  </div>
                </div>
            </div>
            
            {/* Logo Kiri Bawah - Enhanced */}
            <div className="absolute bottom-6 left-6 md:bottom-10 md:left-12 animate-bounce-in z-20" style={{ animationDelay: '0.4s' }}>
                 <div className="relative">
                   <div className="absolute inset-0 bg-white/50 rounded-full blur-md animate-pulse-ring" style={{ animationDelay: '1s' }}></div>
                   <div className="relative bg-gradient-to-br from-white to-yellow-50 text-red-600 font-black text-xs md:text-sm px-4 py-1.5 rounded-full shadow-lg transform -rotate-12 border-2 border-red-100 animate-glow group-hover:rotate-0 transition-transform duration-300">
                      HOT DEALS ⚡
                  </div>
                 </div>
            </div>

            {/* Logo Top Center - New */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 animate-bounce-in z-20" style={{ animationDelay: '0.6s' }}>
                <div className="relative">
                  <div className="absolute inset-0 bg-yellow-300/50 rounded-full blur-md animate-pulse-ring" style={{ animationDelay: '0.5s' }}></div>
                  <div className="relative bg-gradient-to-br from-yellow-300 to-orange-400 text-red-700 font-black text-xs px-3 py-1 rounded-full shadow-lg animate-wiggle">
                      30% OFF
                  </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="relative z-10">
                {/* Badge */}
                <div className="animate-scale-in mb-4">
                  <span className="relative inline-block bg-white text-red-600 text-xs font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg">
                      <span className="absolute inset-0 bg-white rounded-full blur-sm animate-pulse"></span>
                      <span className="relative flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" style={{ animationDuration: '3s' }} fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                        </svg>
                        Limited Time Offer
                      </span>
                  </span>
                </div>
                
                {/* Main Title with Parallax Effect */}
                <h1 
                  className="text-4xl md:text-6xl lg:text-7xl font-black italic tracking-tighter mb-6 drop-shadow-2xl animate-slide-in"
                  style={{
                    transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
                    transition: 'transform 0.3s ease-out'
                  }}
                >
                  MID-SEASON
                  <br />
                  <span className="relative inline-block">
                    <span className="relative bg-clip-text text-transparent bg-gradient-to-r from-yellow-200 via-white to-yellow-200 animate-shimmer"
                          style={{ backgroundSize: '200% auto' }}>
                      SALE
                    </span>
                    {/* Glow effect under text */}
                    <div className="absolute -inset-1 bg-white/30 blur-xl -z-10 animate-pulse"></div>
                  </span>
                </h1>
                
                {/* Description */}
                <p className="text-white/95 text-base md:text-lg max-w-2xl mx-auto font-medium mb-8 leading-relaxed animate-scale-in" style={{ animationDelay: '0.3s' }}>
                    Get up to <span className="inline-block bg-white text-red-600 font-black text-xl md:text-2xl px-3 py-1 rounded-lg shadow-lg animate-bounce-in mx-1" style={{ animationDelay: '0.6s' }}>30% OFF</span> on selected premium sneakers from 
                    <span className="font-black text-yellow-200"> Nike, Adidas, Jordan</span> and more!
                </p>
                
                {/* CTA Button with Shine Effect */}
                <div className="animate-slide-in-right" style={{ animationDelay: '0.5s' }}>
                  <button className="group relative mt-4 px-10 py-4 bg-white text-red-600 font-black rounded-full text-sm uppercase tracking-widest shadow-2xl transition-all duration-300 hover:shadow-3xl active:scale-95 overflow-hidden">
                      {/* Shine Effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-200/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      
                      {/* Glow Ring */}
                      <div className="absolute inset-0 bg-white rounded-full blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                      
                      <span className="relative flex items-center justify-center gap-3">
                        Shop Deals Now
                        <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </span>
                  </button>
                </div>

                {/* Stats Section */}
                <div className="flex justify-center gap-8 md:gap-12 mt-10 pt-8 border-t border-white/20 animate-scale-in" style={{ animationDelay: '0.7s' }}>
                  <div className="text-center group/stat cursor-pointer">
                    <p className="text-2xl md:text-3xl font-black mb-1 group-hover/stat:scale-110 transition-transform">500+</p>
                    <p className="text-xs md:text-sm text-white/80 font-medium uppercase tracking-wide">Products</p>
                  </div>
                  <div className="text-center group/stat cursor-pointer">
                    <p className="text-2xl md:text-3xl font-black mb-1 group-hover/stat:scale-110 transition-transform">50+</p>
                    <p className="text-xs md:text-sm text-white/80 font-medium uppercase tracking-wide">Brands</p>
                  </div>
                  <div className="text-center group/stat cursor-pointer">
                    <p className="text-2xl md:text-3xl font-black mb-1 group-hover/stat:scale-110 transition-transform">⭐ 4.9</p>
                    <p className="text-xs md:text-sm text-white/80 font-medium uppercase tracking-wide">Rating</p>
                  </div>
                </div>
            </div>
        </div>

        {/* === GRID PRODUK SALE === */}
        {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[320px] bg-gray-200 rounded-3xl animate-pulse"></div>
                ))}
             </div>
        ) : (
            <>
              {/* TAMPILKAN ITEM */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {currentItems.map((item) => {
                  
                  const fakeOriginalPrice = item.price * 1.3; 
                  const discountPercentage = 30;

                  return (
                    <div key={item.id} className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg hover:border-red-100 transition-all duration-300 hover:-translate-y-1 cursor-pointer group h-full flex flex-col justify-between">
                       
                       <div>
                          <div className="relative h-[180px] bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-red-50 transition-colors overflow-hidden">
                             <span className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold px-3 py-1 rounded-md z-10 shadow-md">
                                -{discountPercentage}%
                             </span>
                             <img 
                                src={item.image_url} 
                                className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6" 
                                alt={item.name} 
                             />
                          </div>
                          <h3 className="font-bold text-gray-900 text-sm line-clamp-2 mb-1 group-hover:text-red-600 transition-colors">
                            {item.name}
                          </h3>
                          <p className="text-xs text-gray-500">{item.category}</p>
                       </div>

                       <div className="mt-3">
                          <p className="text-gray-400 text-xs line-through decoration-red-400 decoration-2">
                              Rp {(fakeOriginalPrice / 1000).toFixed(0).toLocaleString()}K
                          </p>
                          <div className="flex items-center justify-between mt-1">
                              <p className="text-red-600 font-black text-lg">
                                  Rp {(item.price / 1000).toLocaleString()}K
                              </p>
                              <button className="w-9 h-9 bg-red-600 text-white rounded-xl flex items-center justify-center hover:bg-red-700 transition-colors shadow-md shadow-red-200">
                                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                                  </svg>
                              </button>
                          </div>
                       </div>
                    </div>
                  );
                })}
              </div>

              {/* PAGINATION CONTROLS */}
              {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2">
                  <button 
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      currentPage === 1 
                        ? "text-gray-300 border-gray-200 cursor-not-allowed" 
                        : "text-gray-600 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                    </svg>
                  </button>

                  {[...Array(totalPages)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => paginate(index + 1)}
                      className={`w-10 h-10 rounded-full font-bold text-sm transition-all ${
                        currentPage === index + 1
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
                    className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                      currentPage === totalPages 
                        ? "text-gray-300 border-gray-200 cursor-not-allowed" 
                        : "text-gray-600 border-gray-300 hover:bg-black hover:text-white hover:border-black"
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
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