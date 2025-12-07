import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ApparelBanner from "../components/ApparelBanner";

// =========================================
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
      onClick={() => navigate(`/product/apparel/${item.id}`)}
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

// =========================================
// MAIN COMPONENT: APPAREL
// =========================================
export default function Apparel() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // --- BARU: State untuk menyembunyikan/menampilkan filter ---
  const [showFilters, setShowFilters] = useState(false);

  const navigate = useNavigate();

  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; // Batas 16 item per halaman

  // Filter Tab
  const categories = [
    "All",
    "Hoodies",
    "T-Shirts",
    "Jackets",
    "Pants",
    "Jersey",
  ];

  useEffect(() => {
    const fetchApparel = async () => {
      try {
        // 1. Ambil URL dasar dari Environment Variable
        const API_URL = import.meta.env.VITE_API_BASE_URL;

        // 2. Gunakan URL tersebut untuk memanggil endpoint apparel
        const response = await axios.get(`${API_URL}/api/apparel`);

        setProducts(response.data);
        setFilteredProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data apparel:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApparel();
  }, []);

  // Filter Lokal (Tab Kategori di Frontend)
  const handleFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1); // Reset ke halaman 1 saat filter berubah

    if (category === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((item) => item.category === category);
      setFilteredProducts(filtered);
    }
  };

  // --- LOGIKA PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Fungsi Ganti Halaman
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 font-poppins transition-colors duration-300">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        {/* TRUEKICKS BANNER - BACK IN BLACK STYLE */}
        <ApparelBanner />

        {/* 1. CONTAINER UTAMA (Compact Spacing) */}
        <div className="lg:col-span-3 mb-4 lg:mb-8">
          {/* 2. TOP BAR (Clean Toggle Style) */}
          <div className="flex items-center justify-between mb-2 lg:mb-4 px-1">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="group flex items-center gap-3 text-gray-900 hover:text-orange-600 transition-colors"
            >
              <div
                className={`p-2 rounded-full transition-colors ${showFilters
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-600"
                  }`}
              >
                {/* Icon Filter Lines */}
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
                  <line x1="4" y1="21" x2="4" y2="14"></line>
                  <line x1="4" y1="10" x2="4" y2="3"></line>
                  <line x1="12" y1="21" x2="12" y2="12"></line>
                  <line x1="12" y1="8" x2="12" y2="3"></line>
                  <line x1="20" y1="21" x2="20" y2="16"></line>
                  <line x1="20" y1="12" x2="20" y2="3"></line>
                  <line x1="1" y1="14" x2="7" y2="14"></line>
                  <line x1="9" y1="8" x2="15" y2="8"></line>
                  <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
              </div>
              <div className="text-left">
                <span className="block font-bold text-sm tracking-wide leading-none mb-1">
                  {showFilters ? "Hide Categories" : "Show Categories"}
                </span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                  {filteredProducts.length} Items
                </span>
              </div>
            </button>
          </div>

          {/* 3. EXPANDABLE PANEL (Responsive Scroll) */}
          <div
            className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showFilters ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
              }`}
          >
            <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50">
              {/* Header Kategori */}
              <h3 className="font-bold text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-2 md:mb-4 flex items-center gap-2 pl-1">
                <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                Apparel Categories
              </h3>
              <div className="flex flex-nowrap overflow-x-auto md:overflow-visible md:flex-wrap gap-2.5 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => handleFilter(cat)}
                      className={`
                                        flex-shrink-0 snap-start
                                        px-5 py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border whitespace-nowrap
                                        ${isActive
                          ? /* Active: Solid Black (Sesuai tema Category) */
                          "bg-black text-white border-black shadow-lg shadow-black/20 transform scale-105"
                          : /* Inactive: Clean White */
                          "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }
                                    `}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* === PRODUCT GRID === */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="h-[300px] bg-gray-200 rounded-3xl animate-pulse"
              ></div>
            ))}
          </div>
        ) : currentItems.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
              {currentItems.map((item) => (
                <ProductCard key={item.id} item={item} navigate={navigate} />
              ))}
            </div>

            {/* === PAGINATION CONTROLS === */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-2">
                {/* Tombol Previous */}
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

                {/* Angka Halaman */}
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

                {/* Tombol Next */}
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
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
            <p className="text-xl font-bold text-gray-400">
              No apparel found for "{activeCategory}"
            </p>
            <button
              onClick={() => handleFilter("All")}
              className="mt-4 text-[#FF5500] font-bold hover:underline"
            >
              View All Apparel
            </button>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
