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
        ${isVisible
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
  const location = useLocation();
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
          1. HERO SECTION - MINIMALIST & ELEGANT
         =========================== */}
      <section className="relative w-full min-h-[85vh] lg:min-h-screen flex items-center justify-center pt-20 pb-12 px-4 overflow-hidden">
        {/* Clean Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50 via-white to-gray-50"></div>

        {/* Subtle Accent */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF5500] to-transparent opacity-60"></div>

        {/* Hero Content Container */}
        <div className="relative z-10 w-full max-w-6xl mx-auto">

          {/* Main Content - Centered */}
          <div className="text-center space-y-6 lg:space-y-8">

            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide">
              <span className="w-1.5 h-1.5 bg-[#FF5500] rounded-full animate-pulse"></span>
              New Collection 2025
            </div>

            {/* Main Headline */}
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              <span className="block text-gray-900">Step Into</span>
              <span className="block text-[#FF5500]">Greatness</span>
            </h1>

            {/* Subtitle */}
            <p className="text-gray-500 text-base sm:text-lg max-w-md mx-auto leading-relaxed">
              Premium authentic sneakers, curated for those who demand the best.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                onClick={() => scrollToSection(topPicksRef)}
                className="w-full sm:w-auto px-8 py-4 bg-gray-900 text-white font-semibold rounded-xl hover:bg-gray-800 transition-all hover:scale-105 shadow-lg shadow-gray-900/20"
              >
                Shop Now
              </button>
              <button
                onClick={() => scrollToSection(blackCollectionRef)}
                className="w-full sm:w-auto px-8 py-4 bg-white text-gray-900 font-semibold rounded-xl border-2 border-gray-200 hover:border-gray-900 transition-all"
              >
                Explore
              </button>
            </div>
          </div>

          {/* ========================================================
              --- [MOBILE ONLY] Brand Marquee + Trust Badges ---
              ======================================================== */}
          <div className="lg:hidden mt-10">
            {/* Brand Marquee - Dark Theme */}
            <div className="relative w-full bg-gray-900 py-3 mb-8 overflow-hidden">
              <div className="flex w-max animate-marquee">
                {/* Part 1 */}
                <div className="flex gap-8 items-center text-white font-bold tracking-widest text-sm px-4">
                  <span>NIKE</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>ADIDAS</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>NEW BALANCE</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>PUMA</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>CONVERSE</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>ASICS</span>
                  <span className="text-[#FF5500]">✦</span>
                </div>
                {/* Part 2 - Duplicate for seamless loop */}
                <div className="flex gap-8 items-center text-white font-bold tracking-widest text-sm px-4">
                  <span>NIKE</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>ADIDAS</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>NEW BALANCE</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>PUMA</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>CONVERSE</span>
                  <span className="text-[#FF5500]">✦</span>
                  <span>ASICS</span>
                  <span className="text-[#FF5500]">✦</span>
                </div>
              </div>
            </div>

            {/* Trust Badges - Simple like Desktop */}
            <div className="flex flex-wrap justify-center gap-4 px-4">
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <svg className="w-4 h-4 text-[#FF5500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100% Authentic
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <svg className="w-4 h-4 text-[#FF5500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-500">
                <svg className="w-4 h-4 text-[#FF5500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30 Days Return
              </div>
            </div>
          </div>

          {/* ========================================================
              --- [DESKTOP ONLY] Featured Product Showcase ---
              ======================================================== */}
          <div className="hidden lg:block relative mt-16">
            {/* Product Image */}
            <div className="relative flex justify-center">
              <div className="relative group cursor-pointer">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-200 to-orange-100 rounded-full blur-3xl opacity-0 group-hover:opacity-60 transition-all duration-700 scale-75 group-hover:scale-100"></div>

                <img
                  src={heroImage}
                  alt="Nike P-6000"
                  className="relative w-[550px] -rotate-12 drop-shadow-2xl transition-all duration-700 ease-out group-hover:scale-105 group-hover:-rotate-6"
                />
              </div>

              {/* Floating Card */}
              <div
                className="absolute top-0 right-[5%] xl:right-[15%] cursor-pointer group/card"
                onClick={() => navigate("/product/sneakers/3")}
              >
                <div className="bg-white p-5 rounded-2xl shadow-xl border border-gray-100 w-64 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-xs text-gray-400 font-medium mb-1">Featured</p>
                      <h3 className="font-bold text-gray-900 text-sm leading-tight">Nike P-6000 Metallic Silver</h3>
                    </div>
                    <span className="text-xs bg-[#FF5500] text-white px-2 py-1 rounded-lg font-medium">-19%</span>
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <div className="flex text-[#FF5500] text-xs">★★★★★</div>
                    <span className="text-xs text-gray-400">(4.9)</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-gray-400 line-through">Rp 1.800.000</p>
                      <p className="text-lg font-bold text-gray-900">Rp 1.460.000</p>
                    </div>
                    <button className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center hover:bg-[#FF5500] transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Desktop Trust Badges */}
            <div className="flex justify-center gap-8 mt-12">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                100% Authentic
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free Shipping
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <svg className="w-5 h-5 text-[#FF5500]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30 Days Return
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
          3. OUR TOP PICKS (Carousel) - RESPONSIVE TUNED
         =========================== */}
      <section
        id="best-sellers"
        ref={topPicksRef}
        className="max-w-7xl mx-auto px-4 md:px-6 py-16 md:py-24 scroll-mt-32 relative"
      >
        {/* Decorative Background Blob */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 -translate-y-1/2 -z-10"></div>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 gap-6">
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-tight">
              TOP{" "}
              <span className="relative inline-block">
                PICKS
                <span className="absolute bottom-1 left-0 w-full h-2 md:h-3 bg-orange-200/50 -z-10 rounded-sm transform -rotate-1"></span>
              </span>
            </h2>
            <p className="text-gray-500 mt-2 md:mt-4 text-sm md:text-lg">
              The most sought-after silhouettes of the season.
            </p>
          </div>

          {/* Custom Navigation Buttons (Hidden di Mobile agar lebih bersih) */}
          <div className="hidden md:flex gap-4">
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
          className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12 pt-4 scroll-smooth px-2 md:px-4"
        >
          {loading && topPicks.length === 0
            ? [...Array(3)].map((_, i) => (
              <div
                key={i}
                // SKELETON RESPONSIVE
                className="min-w-[260px] md:min-w-[340px] h-[350px] md:h-[400px] bg-gray-100 rounded-[2rem] animate-pulse flex-shrink-0"
              ></div>
            ))
            : topPicks.map((item, index) => (
              <div
                key={item.id}
                // UBAH LEBAR KARTU DI SINI (260px di mobile, 340px di desktop)
                className="min-w-[260px] md:min-w-[340px] snap-center flex-shrink-0 group"
              >
                <div
                  onClick={() => navigate(`/product/sneakers/${item.id}`)}
                  // Enhanced hover with lift and glow effect
                  className="bg-white p-4 md:p-5 rounded-[2rem] relative transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_25px_50px_-12px_rgba(249,115,22,0.4)] border border-gray-100 hover:border-orange-200 h-full flex flex-col justify-between cursor-pointer overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-50/0 before:to-orange-50/0 hover:before:from-orange-50/50 hover:before:to-purple-50/30 before:transition-all before:duration-700 before:opacity-0 hover:before:opacity-100"
                >
                  {/* Image Area */}
                  <div>
                    {/* TINGGI GAMBAR DIKURANGI DI MOBILE (h-[180px]) */}
                    <div className="relative h-[180px] md:h-[240px] rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center mb-4 md:mb-6 overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100/50 group-hover:from-orange-50/50 group-hover:to-purple-50/30 transition-all duration-700">
                      {/* Ranking Badge with pulse */}
                      <div className="absolute top-3 left-3 md:top-4 md:left-4 z-20">
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-gray-900 to-black text-white rounded-full flex items-center justify-center font-black text-xs md:text-sm shadow-lg shadow-black/30 group-hover:shadow-black/50 transition-all duration-500 group-hover:scale-110 relative">
                          <span className="relative z-10">#{index + 1}</span>
                          <span className="absolute inset-0 rounded-full bg-orange-500 opacity-0 group-hover:opacity-20 animate-pulse"></span>
                        </div>
                      </div>

                      {/* Favorite Button with enhanced interaction */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        className="absolute top-3 right-3 md:top-4 md:right-4 z-20 w-8 h-8 md:w-10 md:h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-white transition-all shadow-lg hover:shadow-red-200/50 opacity-100 md:opacity-0 md:group-hover:opacity-100 transform md:translate-y-2 md:group-hover:translate-y-0 duration-500 hover:scale-110 active:scale-95"
                      >
                        <svg
                          className="w-4 h-4 md:w-5 md:h-5 transition-transform hover:scale-110"
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

                      {/* Animated glow background */}
                      <div className="absolute w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-orange-400/30 to-purple-400/30 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-all duration-700 group-hover:scale-150"></div>

                      {/* Animated Image (Lebar disesuaikan agar tidak terlalu penuh di mobile) */}
                      <AnimatedImage
                        src={item.image_url}
                        className="w-[85%] md:w-[90%] h-[85%] md:h-[90%] object-contain mix-blend-multiply z-10 transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:-rotate-12 drop-shadow-xl group-hover:drop-shadow-2xl"
                        alt={item.name}
                      />
                    </div>

                    {/* Content */}
                    <div className="px-1 md:px-2 relative z-10">
                      <p className="text-orange-500 text-[10px] md:text-xs font-bold uppercase tracking-wider mb-1 group-hover:text-orange-600 transition-colors">
                        {item.category}
                      </p>
                      <h3 className="font-black text-gray-900 text-lg md:text-xl leading-tight mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors duration-300">
                        {item.name}
                      </h3>
                    </div>
                  </div>

                  {/* Footer Action */}
                  <div className="px-1 md:px-2 pt-3 md:pt-4 flex items-center justify-between border-t border-dashed border-gray-100 group-hover:border-orange-200/50 mt-2 transition-colors relative z-10">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 font-medium uppercase group-hover:text-orange-500 transition-colors">
                        Current Price
                      </span>
                      <p className="text-lg md:text-xl font-black text-gray-900 group-hover:text-orange-600 transition-colors">
                        {(item.price / 1000).toLocaleString()}K
                      </p>
                    </div>

                    <button className="relative overflow-hidden w-10 h-10 md:w-12 md:h-12 bg-gray-900 text-white rounded-xl md:rounded-2xl flex items-center justify-center group-hover:bg-gradient-to-br group-hover:from-orange-500 group-hover:to-orange-600 transition-all duration-500 shadow-lg shadow-gray-900/20 group-hover:shadow-orange-500/50 group-hover:scale-110 active:scale-95">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2.5}
                        stroke="currentColor"
                        className="w-4 h-4 md:w-5 md:h-5 relative z-10 transition-transform group-hover:rotate-90 duration-500"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m7.5-7.5h-15"
                        />
                      </svg>
                      {/* Ripple effect */}
                      <span className="absolute inset-0 rounded-xl md:rounded-2xl bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity"></span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </section>

      {/* ===========================
          4. NEW ARRIVALS - RESPONSIVE 2-COLUMN GRID
         =========================== */}
      <section
        id="new-arrivals"
        className="max-w-7xl mx-auto px-4 md:px-6 mb-24 scroll-mt-32"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-4">
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
            <h2 className="text-3xl md:text-5xl font-black text-gray-900 leading-none">
              FRESH{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-500">
                KICKS.
              </span>
            </h2>
          </div>
        </div>

        {/* GRID LAYOUT PERBAIKAN:
            - grid-cols-2 (Mobile)
            - gap-3 (Mobile) -> gap-8 (Desktop)
        */}
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8">
          {loading && newArrivals.length === 0 ? (
            <p className="col-span-2 lg:col-span-4 text-center py-20 text-gray-400 animate-pulse">
              Fetching latest drops...
            </p>
          ) : (
            newArrivals.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/products/${item.id}`)}
                // Enhanced hover with smooth lift and purple theme
                className="group relative bg-white rounded-2xl md:rounded-[2rem] p-3 md:p-4 transition-all duration-700 hover:shadow-[0_25px_60px_-15px_rgba(124,58,237,0.25)] hover:-translate-y-3 border border-gray-100 hover:border-purple-200 cursor-pointer h-full flex flex-col justify-between overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-50/0 before:to-blue-50/0 hover:before:from-purple-50/40 hover:before:to-blue-50/30 before:transition-all before:duration-700 before:opacity-0 hover:before:opacity-100"
              >
                {/* Image Container */}
                <div>
                  {/* Tinggi gambar lebih kecil di mobile (h-[140px]) */}
                  <div className="relative h-[140px] md:h-[220px] bg-gradient-to-br from-[#F8FAFC] to-[#F1F5F9] rounded-xl md:rounded-[1.5rem] flex items-center justify-center mb-3 md:mb-5 overflow-hidden group-hover:from-purple-50/70 group-hover:to-blue-50/40 transition-all duration-700">
                    {/* Floating Badge with enhanced animation */}
                    <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
                      <div className="bg-white/90 backdrop-blur-md px-2 py-1 md:px-3 md:py-1.5 rounded-full shadow-lg border border-white/50 flex items-center gap-1.5 group-hover:shadow-purple-200/50 group-hover:scale-105 transition-all duration-500">
                        <div className="w-1 md:w-1.5 h-1 md:h-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse"></div>
                        <span className="text-[8px] md:text-[10px] font-bold text-gray-800 tracking-wider uppercase">
                          New
                        </span>
                      </div>
                    </div>

                    {/* Gradient glow effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-200/30 to-blue-200/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                    {/* Animated Image */}
                    <AnimatedImage
                      src={item.image_url}
                      className="w-[85%] md:w-[90%] h-[85%] md:h-[90%] object-contain mix-blend-multiply transition-all duration-700 ease-out group-hover:scale-[1.12] group-hover:-rotate-[10deg] drop-shadow-lg group-hover:drop-shadow-2xl relative z-10"
                      alt={item.name}
                    />
                  </div>

                  {/* Product Info */}
                  <div className="px-1 md:px-2 pb-2 relative z-10">
                    <p className="text-[10px] md:text-xs font-bold text-gray-400 group-hover:text-purple-500 mb-0.5 md:mb-1 uppercase tracking-wide truncate transition-colors duration-300">
                      {item.category}
                    </p>
                    <h3 className="font-bold text-gray-900 group-hover:text-purple-700 text-sm md:text-lg leading-tight mb-2 md:mb-3 transition-colors duration-300 line-clamp-2 md:line-clamp-1 h-[2.5em] md:h-auto">
                      {item.name}
                    </h3>
                  </div>
                </div>

                {/* Footer Price & Button */}
                <div className="px-1 md:px-2 flex items-center justify-between border-t border-gray-50 group-hover:border-purple-100/50 pt-2 md:pt-4 mt-auto transition-colors relative z-10">
                  <div className="flex flex-col">
                    <span className="hidden md:block text-[10px] text-gray-400 group-hover:text-purple-500 font-medium transition-colors">
                      Price
                    </span>
                    <span className="text-gray-900 group-hover:text-purple-700 font-black text-sm md:text-lg transition-colors">
                      {(item.price / 1000).toLocaleString()}K
                    </span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    className="h-8 w-8 md:h-10 md:w-10 bg-gray-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-gray-900/20 group-hover:scale-110 group-hover:bg-gradient-to-br group-hover:from-purple-600 group-hover:to-purple-700 group-hover:shadow-purple-600/40 transition-all duration-500 active:scale-95 relative overflow-hidden"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover:rotate-90 relative z-10"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4.5v15m7.5-7.5h-15"
                      />
                    </svg>
                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full bg-white opacity-0 group-hover:opacity-20 group-active:opacity-30 transition-opacity"></span>
                  </button>
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

      {/* 6. BLACK COLLECTION - MODERN DARK MODE STYLE (RESPONSIVE GRID) */}
      {blackCollection.length > 0 && (
        <section
          ref={blackCollectionRef}
          className="max-w-7xl mx-auto px-4 md:px-6 mb-32 scroll-mt-24"
        >
          {/* Section Header */}
          <div className="mb-12 md:mb-16 text-center relative">
            <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[4rem] md:text-[8rem] font-black text-gray-100 opacity-40 select-none whitespace-nowrap z-0 blur-sm">
              BLACK OPS
            </span>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter uppercase mb-3">
                The{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-700 to-black">
                  Dark Side
                </span>
              </h2>
              <div className="h-1 w-24 bg-black mx-auto rounded-full mb-4"></div>
              <p className="text-gray-500 font-medium text-sm md:text-lg">
                Stealth mode activated. Essential black rotation.
              </p>
            </div>
          </div>

          {/* GRID LAYOUT:
              - grid-cols-2 (Mobile)
              - grid-cols-3 (Desktop)
              - gap-3 (Mobile) -> gap-8 (Desktop)
          */}
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
            {blackCollection.map((item) => (
              <div
                key={item.id}
                onClick={() => navigate(`/product/products/${item.id}`)}
                // Enhanced dark theme with dramatic hover
                className="group relative bg-gradient-to-br from-[#0F0F0F] to-[#1A1A1A] rounded-2xl md:rounded-[2.5rem] p-3 md:p-6 overflow-hidden border border-white/5 hover:border-white/30 transition-all duration-700 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)] hover:-translate-y-3 cursor-pointer h-full flex flex-col justify-between before:absolute before:inset-0 before:bg-gradient-to-br before:from-white/0 before:to-white/0 hover:before:from-white/5 hover:before:to-transparent before:transition-all before:duration-700 before:opacity-0 hover:before:opacity-100"
              >
                {/* Background Accents - Enhanced */}
                <div className="absolute top-0 right-0 w-24 h-24 md:w-32 md:h-32 bg-white/5 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:bg-white/20 transition-all duration-700 group-hover:scale-150"></div>

                {/* Badge with enhanced visibility */}
                <div className="absolute top-3 left-3 md:top-6 md:left-6 z-20">
                  <span className="px-2 py-1 md:px-3 md:py-1 bg-white/10 backdrop-blur-md border border-white/10 group-hover:bg-white/20 group-hover:border-white/30 text-white text-[8px] md:text-[10px] font-bold tracking-widest uppercase rounded-full transition-all duration-500 shadow-lg group-hover:shadow-white/25 group-hover:scale-105">
                    Premium
                  </span>
                </div>

                {/* Image Area */}
                <div>
                  {/* Tinggi gambar dikurangi di mobile (h-[140px]) */}
                  <div className="relative h-[140px] md:h-[260px] flex items-center justify-center mb-2 md:mb-6 z-10">
                    {/* Enhanced Glow */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-24 h-24 md:w-40 md:h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 group-hover:bg-white/20 transition-all duration-700"></div>
                    </div>

                    {/* Animated Image with enhanced drop shadow */}
                    <AnimatedImage
                      src={item.image_url}
                      alt={item.name}
                      className="relative z-10 w-[95%] h-[95%] object-contain drop-shadow-[0_20px_40px_rgba(255,255,255,0.1)] transition-all duration-700 ease-out group-hover:scale-[1.15] group-hover:-rotate-[15deg] group-hover:translate-x-2 group-hover:drop-shadow-[0_30px_60px_rgba(255,255,255,0.2)]"
                    />
                  </div>

                  {/* Content Area */}
                  <div className="relative z-20 px-1 md:px-0">
                    <h3 className="text-sm md:text-xl font-bold text-white leading-tight mb-1 group-hover:text-gray-200 transition-colors duration-300 line-clamp-1">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 group-hover:text-gray-400 text-[10px] md:text-xs font-medium uppercase tracking-wider mb-2 truncate transition-colors duration-300">
                      {item.category || "Running / Lifestyle"}
                    </p>
                  </div>
                </div>

                {/* Footer (Price & Button) */}
                <div className="relative z-20 flex items-center justify-between border-t border-white/10 group-hover:border-white/20 pt-2 md:pt-5 mt-auto px-1 md:px-0 transition-colors duration-300">
                  <p className="text-sm md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 group-hover:from-white group-hover:to-gray-300 transition-all">
                    Rp {(item.price / 1000).toLocaleString()}K
                  </p>

                  <button className="w-8 h-8 md:w-12 md:h-12 bg-white text-black rounded-full flex items-center justify-center hover:bg-gray-200 hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] active:scale-95 relative overflow-hidden group/btn">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-4 h-4 md:w-5 md:h-5 transition-transform duration-500 group-hover/btn:rotate-90 relative z-10"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {/* Ripple effect */}
                    <span className="absolute inset-0 rounded-full bg-black opacity-0 group-hover/btn:opacity-10 group-active/btn:opacity-20 transition-opacity"></span>
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
