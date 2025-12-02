import { useEffect, useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom"; //
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import heroImage from "../assets/p6000-silver.png";
import promoBanner from "../assets/backIn.png";
import nikeLogo from "../assets/nike.png";
import adidasLogo from "../assets/adidas.png";
import newBalanceLogo from "../assets/newbalance.png";
import pumaLogo from "../assets/puma.png";
import converseLogo from "../assets/converse.png";

// ========== CUSTOM HOOK UNTUK SCROLL ANIMATION ==========
const useScrollAnimation = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

const AnimatedImage = ({ src, alt, className }) => {
  const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

  return (
    <img
      ref={ref}
      src={src}
      alt={alt}
      className={`${className} transition-all duration-1000 ease-out will-change-transform
        ${
          isVisible
            ? "opacity-100 translate-y-0 scale-100 blur-0 grayscale-0"
            : "opacity-0 translate-y-12 scale-95 blur-sm grayscale"
        }`}
    />
  );
};

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const topPicksRef = useRef(null);
  const blackCollectionRef = useRef(null);

  // 1. FETCH DATA DARI API SUPABASE
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_BASE_URL;

        console.log("Fetching from:", API_URL);

        const response = await axios.get(`${API_URL}/api/products`);
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 2. MEMBAGI DATA (Slicing)
  const topPicks = products.slice(0, 3).concat(products.slice(13, 17));
  const newArrivals = products.slice(3, 7);
  const blackCollection = products.slice(7, 13);

  // 3. FUNGSI SCROLL CAROUSEL
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 320;
      if (direction === "left") {
        current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    if (location.state && location.state.scrollTo) {
      const elemId = location.state.scrollTo;
      const element = document.getElementById(elemId);

      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
      }
    }
  }, [location]);

  // Fungsi Scroll ke Section Tertentu
  const scrollToSection = (ref) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white font-poppins overflow-x-hidden">
      <Navbar />

      {/* ===========================
          1. HERO SECTION (RESPONSIVE UPDATE)
         =========================== */}
      <section className="relative w-full min-h-[600px] lg:min-h-[900px] flex flex-col items-center justify-center pt-32 pb-12 px-4 overflow-hidden">
        {/* Modern Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-white to-orange-50"></div>

        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 -left-20 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-gradient-to-br from-purple-300/30 to-blue-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob"></div>
          <div className="absolute top-40 -right-20 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-gradient-to-br from-orange-300/30 to-pink-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[300px] lg:w-[600px] h-[300px] lg:h-[600px] bg-gradient-to-br from-blue-300/30 to-cyan-300/30 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-7xl mx-auto">
          {/* Badge & Text Content */}
          <div className="text-center mb-8 lg:mb-16 space-y-6">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white px-5 py-2 rounded-full shadow-lg shadow-orange-500/30 animate-fade-in-down">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-xs font-bold tracking-wider uppercase">
                Limited Collection 2025
              </span>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black tracking-tighter leading-[0.95] lg:leading-[0.85]">
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-purple-700 to-blue-600 mb-2">
                DISCOVER
              </span>
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700">
                LIMITATION
              </span>
            </h1>

            <p className="text-gray-600 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-medium px-4">
              Explore the most exclusive sneaker collection with authentic
              quality and cutting-edge design.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4 w-full px-6 sm:px-0">
              <button
                onClick={() => scrollToSection(topPicksRef)}
                className="w-full sm:w-auto group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-bold rounded-2xl shadow-lg shadow-orange-500/40 hover:shadow-xl hover:shadow-orange-500/50 transition-all hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Shop Now
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => scrollToSection(blackCollectionRef)}
                className="w-full sm:w-auto px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-gray-900 hover:bg-white transition-all hover:shadow-lg"
              >
                View Collection
              </button>
            </div>
          </div>

          {/* ========================================================
              --- [MOBILE ONLY] ALTERNATIVE CONTENT ---
              ======================================================== */}
          <div className="lg:hidden w-full mt-10 mb-4 overflow-hidden">
            {" "}
            {/* Tambahkan overflow-hidden disini */}
            {/* 1. Running Text / Marquee */}
            <div className="relative w-full bg-black -rotate-2 py-2 mb-8 shadow-lg border-y-2 border-yellow-400 overflow-hidden">
              {/* Container animasi harus lebih lebar dari layar (w-max) */}
              <div className="flex w-max animate-marquee">
                {/* BAGIAN 1 (Original) */}
                <div className="flex gap-8 items-center text-white font-black italic tracking-widest text-sm px-4">
                  <span>NIKE</span> ✦ <span>ADIDAS</span> ✦{" "}
                  <span>NEW BALANCE</span> ✦ <span>PUMA</span> ✦{" "}
                  <span>ASICS</span> ✦ <span>NIKE</span> ✦ <span>ADIDAS</span> ✦{" "}
                  <span>NEW BALANCE</span>
                </div>

                {/* BAGIAN 2 (Duplikat untuk Seamless Loop) - Wajib ada! */}
                <div className="flex gap-8 items-center text-white font-black italic tracking-widest text-sm px-4">
                  <span>NIKE</span> ✦ <span>ADIDAS</span> ✦{" "}
                  <span>NEW BALANCE</span> ✦ <span>PUMA</span> ✦{" "}
                  <span>ASICS</span> ✦ <span>NIKE</span> ✦ <span>ADIDAS</span> ✦{" "}
                  <span>NEW BALANCE</span>
                </div>
              </div>
            </div>
            {/* 2. Simple Trust Badges (Grid) - Tetap sama */}
            <div className="grid grid-cols-3 gap-2 px-4">
              {/* ... kode trust badges tetap sama ... */}
              <div className="bg-white/60 backdrop-blur p-3 rounded-xl text-center border border-gray-100 shadow-sm">
                <div className="text-xl mb-1">📦</div>
                <p className="text-[10px] font-bold text-gray-600 uppercase">
                  Free Ship
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur p-3 rounded-xl text-center border border-gray-100 shadow-sm">
                <div className="text-xl mb-1">🛡️</div>
                <p className="text-[10px] font-bold text-gray-600 uppercase">
                  Authentic
                </p>
              </div>
              <div className="bg-white/60 backdrop-blur p-3 rounded-xl text-center border border-gray-100 shadow-sm">
                <div className="text-xl mb-1">↩️</div>
                <p className="text-[10px] font-bold text-gray-600 uppercase">
                  Returns
                </p>
              </div>
            </div>
          </div>

          {/* ========================================================
              --- [DESKTOP ONLY] SHOE & CARD ---
              Tampil di Desktop, Sembunyi di HP (hidden lg:flex)
              ======================================================== */}
          <div className="hidden lg:flex relative w-full h-[700px] items-center justify-center mt-8">
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
              <h2 className="text-[14rem] font-black text-gray-100/60 leading-none tracking-tighter whitespace-nowrap">
                NIKE P-6000
              </h2>
            </div>

            <div className="relative z-20 group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-purple-400 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-all duration-500 scale-75 group-hover:scale-100"></div>
              <img
                src={heroImage}
                alt="Nike P-6000"
                className="relative w-[700px] -rotate-[12deg] drop-shadow-2xl -translate-y-16 transition-all duration-700 ease-out group-hover:scale-110 group-hover:-rotate-6 group-hover:drop-shadow-[0_35px_60px_rgba(0,0,0,0.25)]"
              />
            </div>

            {/* Floating Card (Desktop Only) */}
            <div
              className="absolute top-[15%] right-[10%] z-30 group/card"
              onClick={() => navigate("/product/sneakers/3")}
            >
              <div className="relative bg-white/95 backdrop-blur-xl p-6 rounded-3xl shadow-2xl border border-white/50 w-72 transform transition-all duration-500 hover:scale-105 hover:-translate-y-2">
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400/30 via-purple-400/30 to-blue-400/30 opacity-0 group-hover/card:opacity-100 transition-opacity blur-2xl -z-10"></div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-black text-gray-900 text-lg leading-tight mb-1">
                      Nike P-6000 Metallic Silver
                    </h3>
                    <p className="text-xs text-gray-500 font-medium">
                      Limited Edition
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex text-orange-500 text-sm">
                      {"★".repeat(5)}
                    </div>
                    <span className="text-sm font-bold text-gray-700">
                      (4.9)
                    </span>
                    <span className="text-xs text-gray-400 ml-auto">
                      2.1K reviews
                    </span>
                  </div>

                  <div className="pt-3 border-t border-gray-100">
                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-gray-400 line-through mb-1">
                          IDR 1,800,000
                        </p>
                        <p className="text-2xl font-black bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                          IDR 1,460,000
                        </p>
                      </div>
                      <button className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center hover:scale-110 transition-transform shadow-lg shadow-orange-500/40">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M12 4v16m8-8H4"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>

                <svg
                  className="absolute top-1/2 -left-32 w-36 h-24 text-orange-500/80 pointer-events-none"
                  viewBox="0 0 150 80"
                  fill="none"
                >
                  <path
                    d="M 145 15 Q 100 15, 80 40 T 10 55"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    strokeLinecap="round"
                    className="animate-pulse"
                  />
                  <circle cx="10" cy="55" r="4" fill="currentColor">
                    <animate
                      attributeName="r"
                      values="3;5;3"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </circle>
                </svg>
              </div>
            </div>

            {/* Desktop Badges */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3 justify-center">
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 text-xs font-bold text-gray-700">
                ✓ Authentic Product
              </div>
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 text-xs font-bold text-gray-700">
                ✓ Free Shipping
              </div>
              <div className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-full shadow-lg border border-white/50 text-xs font-bold text-gray-700">
                ✓ 30 Days Return
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================
          2. BRAND LOGOS (DESKTOP ONLY)
          Tambahkan 'hidden md:block' agar hilang di mobile
         =========================== */}
      <section className="hidden md:block py-10 border-y-2 border-gray-200/50 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Optional: Subtitle */}
          <p className="text-center text-gray-400 text-xs font-medium uppercase tracking-widest mb-6 hidden sm:block">
            Trusted by the world's leading sneaker enthusiasts
          </p>

          <div className="flex justify-around items-center gap-16 sm:gap-20 overflow-x-auto no-scrollbar opacity-50 grayscale hover:grayscale-0 transition-all duration-700">
            <img
              src={nikeLogo}
              alt="Nike Logo"
              className="h-20 sm:h-20 md:h-20  flex-shrink-0"
            />
            <img
              src={adidasLogo}
              alt="Adidas Logo"
              className="h-7 sm:h-9 md:h-12 flex-shrink-0"
            />
            <img
              src={newBalanceLogo}
              alt="New Balance Logo"
              className="h-20 sm:h-20 md:h-20 flex-shrink-0"
            />
            <img
              src={pumaLogo}
              alt="Puma Logo"
              className="h-7 sm:h-9 md:h-12 flex-shrink-0"
            />
            <img
              src={converseLogo}
              alt="Converse Logo"
              className="h-20 sm:h-20 md:h-20  flex-shrink-0"
            />
          </div>
        </div>
      </section>

      {/* ===========================
          2.1 [MOBILE ONLY] QUICK CATEGORIES
          Pengganti logo brand, memudahkan navigasi jenis sepatu
         =========================== */}
      <section className="md:hidden py-6 border-b border-gray-100 bg-white">
        <div className="px-4">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-3">
            Browse by Category
          </h3>

          {/* Horizontal Scrollable Container */}
          <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
            {[
              { name: "Running", emoji: "🏃" },
              { name: "Lifestyle", emoji: "👟" },
              { name: "Basketball", emoji: "🏀" },
              { name: "Training", emoji: "🏋️" },
              { name: "Skateboarding", emoji: "🛹" },
              { name: "Sandals", emoji: "🩴" },
            ].map((cat) => (
              <button
                key={cat.name}
                onClick={() =>
                  navigate("/sneakers", { state: { typeFilter: cat.name } })
                } // Langsung filter ke halaman sneakers
                className="flex items-center gap-2 px-5 py-3 bg-gray-50 rounded-2xl border border-gray-100 whitespace-nowrap shadow-sm active:scale-95 active:bg-gray-100 transition-all"
              >
                <span className="text-lg">{cat.emoji}</span>
                <span className="text-xs font-bold text-gray-700">
                  {cat.name}
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===========================
          3. OUR TOP PICKS (Carousel) - MODERN SPOTLIGHT STYLE
         =========================== */}
      <section
        id="best-sellers"
        ref={topPicksRef}
        className="max-w-7xl mx-auto px-6 py-24 scroll-mt-32 relative"
      >
        {/* Decorative Background Blob (Optional, subtle behind the section) */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 -z-10"></div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-lg">
            <div className="flex items-center gap-2 mb-2">
              <svg
                className="w-5 h-5 text-orange-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="text-orange-600 font-bold text-sm tracking-widest uppercase">
                Curated Collection
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-tight">
              TOP{" "}
              <span className="relative inline-block">
                PICKS
                <span className="absolute bottom-1 left-0 w-full h-3 bg-orange-200/50 -z-10 rounded-sm transform -rotate-1"></span>
              </span>
            </h2>
            <p className="text-gray-500 mt-4 text-lg">
              The most sought-after silhouettes of the season, handpicked for
              your style.
            </p>
          </div>

          {/* Custom Navigation Buttons */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll("left")}
              className="group w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="group w-14 h-14 rounded-full border border-gray-200 bg-white flex items-center justify-center hover:bg-black hover:border-black transition-all duration-300 shadow-sm hover:shadow-xl"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 text-gray-700 group-hover:text-white transition-colors"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12 pt-4 scroll-smooth px-4"
        >
          {loading && topPicks.length === 0
            ? [...Array(3)].map((_, i) => (
                <div
                  key={i}
                  className="min-w-[300px] h-[400px] bg-gray-100 rounded-[2rem] animate-pulse flex-shrink-0"
                ></div>
              ))
            : topPicks.map((item, index) => (
                <div
                  key={item.id}
                  className="min-w-[300px] md:min-w-[340px] snap-center flex-shrink-0 group"
                >
                  <div
                    onClick={() => navigate(`/product/sneakers/${item.id}`)}
                    className="bg-white p-5 rounded-[2.5rem] relative transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.3)] border border-transparent hover:border-orange-100 h-full flex flex-col justify-between cursor-pointer"
                  >
                    {/* Image Area */}
                    <div>
                      <div className="relative h-[240px] rounded-[2rem] flex items-center justify-center mb-6 overflow-hidden bg-gray-50 group-hover:bg-orange-50/30 transition-colors duration-500">
                        {/* Ranking Badge */}
                        <div className="absolute top-4 left-4 z-20">
                          <div className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center font-black text-sm shadow-lg shadow-black/20">
                            #{index + 1}
                          </div>
                        </div>

                        {/* Favorite Button (Top Right) */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Mencegah klik tombol love memicu navigasi ke detail
                            // Tambahkan logika wishlist di sini nanti
                          }}
                          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors shadow-sm opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 duration-300"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>

                        {/* Background Glow behind Shoe */}
                        <div className="absolute w-40 h-40 bg-orange-400/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Animated Image */}
                        <AnimatedImage
                          src={item.image_url}
                          className="w-[90%] h-[90%] object-contain mix-blend-multiply z-10 transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:scale-110 group-hover:-rotate-12"
                          alt={item.name}
                        />
                      </div>

                      {/* Content */}
                      <div className="px-2">
                        <p className="text-orange-500 text-xs font-bold uppercase tracking-wider mb-1">
                          {item.category}
                        </p>
                        <h3 className="font-black text-gray-900 text-xl leading-tight mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                          {item.name}
                        </h3>
                      </div>
                    </div>

                    {/* Footer Action */}
                    <div className="px-2 pt-4 flex items-center justify-between border-t border-dashed border-gray-100 mt-2">
                      <div className="flex flex-col">
                        <span className="text-[10px] text-gray-400 font-medium uppercase">
                          Current Price
                        </span>
                        <p className="text-xl font-black text-gray-900">
                          {(item.price / 1000).toLocaleString()}K
                        </p>
                      </div>

                      <button className="relative overflow-hidden w-12 h-12 bg-gray-900 text-white rounded-2xl flex items-center justify-center group-hover:bg-orange-500 transition-colors duration-300 shadow-lg shadow-gray-900/20 group-hover:shadow-orange-500/40">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={2.5}
                          stroke="currentColor"
                          className="w-5 h-5 relative z-10"
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
                </div>
              ))}
        </div>
      </section>

      {/* ===========================
          4. NEW ARRIVALS - MODERN FRESH STYLE
         =========================== */}
      <section
        id="new-arrivals"
        className="max-w-7xl mx-auto px-6 mb-24 scroll-mt-32"
      >
        {/* Header dengan dekorasi modern */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-purple-500"></span>
              </span>
              <span className="text-purple-600 font-bold text-sm tracking-widest uppercase">
                Just Dropped
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 leading-none">
              FRESH{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                KICKS.
              </span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {loading && newArrivals.length === 0 ? (
            <p className="col-span-4 text-center py-20 text-gray-400 animate-pulse">
              Fetching latest drops...
            </p>
          ) : (
            newArrivals.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/products/${item.id}`)}
                className="group relative bg-white rounded-[2rem] p-4 transition-all duration-500 hover:shadow-[0_20px_50px_-12px_rgba(124,58,237,0.15)] hover:-translate-y-2 border border-gray-100 hover:border-purple-100 cursor-pointer"
              >
                {/* Image Container */}
                <div className="relative h-[220px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-[1.5rem] flex items-center justify-center mb-5 overflow-hidden group-hover:from-purple-50 group-hover:to-white transition-colors duration-500">
                  {/* Floating Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="bg-white/80 backdrop-blur-md px-3 py-1.5 rounded-full shadow-sm border border-white/50 flex items-center gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                      <span className="text-[10px] font-bold text-gray-800 tracking-wider uppercase">
                        New
                      </span>
                    </div>
                  </div>

                  {/* Background Blob Effect */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Animated Image */}
                  <AnimatedImage
                    src={item.image_url}
                    className="w-[90%] h-[90%] object-contain mix-blend-multiply transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-rotate-[8deg]"
                    alt={item.name}
                  />

                  {/* Quick Action Overlay (Hanya muncul saat hover) */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 translate-y-12 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20 w-[90%]">
                    <button className="w-full py-3 bg-white/90 backdrop-blur-md text-gray-900 text-xs font-bold uppercase tracking-wider rounded-xl shadow-lg hover:bg-black hover:text-white transition-colors border border-white/50">
                      Quick View
                    </button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="px-2 pb-2">
                  <p className="text-xs font-bold text-gray-400 mb-1 uppercase tracking-wide">
                    {item.category}
                  </p>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-3 group-hover:text-purple-700 transition-colors line-clamp-1">
                    {item.name}
                  </h3>

                  <div className="flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-medium">
                        Price
                      </span>
                      <span className="text-gray-900 font-black text-lg">
                        Rp {(item.price / 1000).toLocaleString()}K
                      </span>
                    </div>

                    {/* Modern Add Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Mencegah navigasi saat tombol + diklik
                        // Logika add to cart bisa ditaruh sini
                      }}
                      className="h-10 w-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-gray-900/20 group-hover:scale-110 group-hover:bg-purple-600 group-hover:shadow-purple-600/30 transition-all duration-300"
                    >
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
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* 5. PROMO BANNER - ENHANCED VISUAL */}
      <section className="relative w-full py-12 overflow-hidden">
        {/* A. Background Pattern (Grid Halus) - Mengisi kekosongan */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

        {/* B. Ambient Glow - Memberikan warna di belakang banner */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-full bg-gradient-to-r from-purple-100/50 via-transparent to-orange-100/50 blur-3xl -z-10"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          {/* C. Header Kecil (Penambah Konteks) */}
          <div className="flex items-center justify-between mb-4 px-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
              <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">
                Limited Time Offer
              </span>
            </div>
            <span className="text-xs font-medium text-gray-400">
              Ends in 24h
            </span>
          </div>

          {/* D. Banner Image */}
          <div className="rounded-[1.5rem] md:rounded-[2.5rem] p-1 bg-gradient-to-r from-gray-200 to-gray-100 shadow-2xl relative group">
            {/* Border Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-orange-500 rounded-[1.5rem] md:rounded-[2.5rem] opacity-0 group-hover:opacity-100 blur transition-opacity duration-500 -z-10"></div>

            <div className="rounded-[1.3rem] md:rounded-[2.3rem] overflow-hidden bg-white">
              {/* Overlay saat hover */}
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors z-20 pointer-events-none"></div>

              <img
                src={promoBanner}
                alt="Back in Black Promo"
                className="w-full h-auto block transform transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          {/* E. Dekorasi Bawah (Opsional - Brand Text) */}
          <div className="mt-4 text-center opacity-30">
            <p className="text-[10px] tracking-[0.5em] font-black uppercase">
              TrueKicks Original
            </p>
          </div>
        </div>
      </section>

      {/* 6. BLACK COLLECTION - MODERN DARK MODE STYLE */}
      {blackCollection.length > 0 && (
        <section
          ref={blackCollectionRef}
          className="max-w-7xl mx-auto px-6 mb-32 scroll-mt-24"
        >
          {/* Section Header */}
          <div className="mb-16 text-center relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[5rem] md:text-[8rem] font-black text-gray-100 opacity-40 select-none whitespace-nowrap z-0 blur-sm">
              BLACK OPS
            </span>
            <div className="relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-3">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">
                  Dark Side
                </span>
              </h2>
              <div className="h-1 w-24 bg-black mx-auto rounded-full mb-4"></div>
              <p className="text-gray-500 font-medium text-lg">
                Stealth mode activated. Essential black rotation.
              </p>
            </div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blackCollection.map((item) => (
              /* === UPDATE DI SINI === 
                   Menambahkan onClick dan cursor-pointer 
                */
              <div
                key={item.id}
                onClick={() => navigate(`/product/products/${item.id}`)}
                className="group relative bg-[#0F0F0F] rounded-[2.5rem] p-6 overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-500 hover:shadow-2xl hover:shadow-black/50 hover:-translate-y-2 cursor-pointer"
              >
                {/* Background Accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/10 transition-colors"></div>

                {/* Badge */}
                <div className="absolute top-6 left-6 z-20">
                  <span className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/10 text-white text-[10px] font-bold tracking-widest uppercase rounded-full">
                    Premium
                  </span>
                </div>

                {/* Image Area with Contrast Glow */}
                <div className="relative h-[260px] flex items-center justify-center mb-6 z-10">
                  {/* Glow behind the shoe so black shoe pops on dark bg */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700"></div>
                  </div>

                  {/* Animated Image Component */}
                  <AnimatedImage
                    src={item.image_url}
                    alt={item.name}
                    className="relative z-10 w-[95%] h-[95%] object-contain drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-[15deg] group-hover:translate-x-2"
                  />
                </div>

                {/* Content Area */}
                <div className="relative z-20 flex items-end justify-between border-t border-white/10 pt-5">
                  <div>
                    <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-gray-300 transition-colors">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">
                      {item.category || "Running / Lifestyle"}
                    </p>
                    <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                      Rp {(item.price / 1000).toLocaleString()}K
                    </p>
                  </div>

                  {/* Action Button */}
                  <button className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
