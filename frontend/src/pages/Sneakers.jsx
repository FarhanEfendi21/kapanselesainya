import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { supabase } from "../lib/supabaseClient";


const useScrollAnimation = () => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Jika elemen masuk ke layar, set isVisible jadi true
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); // Stop observe biar animasi cuma sekali
        }
      },
      { threshold: 0.1 } // Memicu animasi saat 10% elemen terlihat
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  return [elementRef, isVisible];
};

// =========================================
// 2. KOMPONEN PRODUCT CARD (DENGAN ANIMASI)
// =========================================
const ProductCard = ({ item, navigate }) => {
  const [ref, isVisible] = useScrollAnimation();

  return (
    <div 
      ref={ref} // WAJIB: Ref dipasang di sini agar terdeteksi
      onClick={() => navigate(`/product/sneakers/${item.id}`)}
      // LOGIKA ANIMASI: Jika isVisible true, opacity 100 & posisi normal. Jika false, sembunyi & turun sedikit.
      className={`
        bg-white p-4 rounded-3xl shadow-sm border border-gray-100 
        hover:shadow-lg transition-all duration-700 ease-out 
        hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between group
        transform 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}
      `}
    >
      <div>
          <div className="relative h-[180px] bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors overflow-hidden">
            <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-gray-900 text-[10px] px-2 py-1 rounded-md font-bold border border-gray-100 z-10">
                {item.category}
            </span>
            <img 
                src={item.image_url} 
                className="w-[85%] h-[85%] object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3" 
                alt={item.name} 
                loading="lazy"
            />
          </div>
          <h3 className="font-bold text-gray-900 text-sm line-clamp-1 group-hover:text-[#FF5500] transition-colors">
            {item.name}
          </h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-1">{item.description || "Premium Sneakers"}</p>
      </div>

      <div className="flex items-center justify-between mt-4">
          <p className="text-[#FF5500] font-bold text-sm md:text-base">
            Rp {(item.price / 1000).toLocaleString()}K
          </p>
          <button className="w-9 h-9 bg-[#0F172A] text-white rounded-xl flex items-center justify-center hover:bg-black transition-colors shadow-md shadow-blue-900/20">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default function Sneakers() {
  const location = useLocation();
  const [searchKeyword, setSearchKeyword] = useState("");
  const initialTypeFilter = location.state?.typeFilter || "All Types"; 
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activeTypeFilter, setActiveTypeFilter] = useState(initialTypeFilter); 
  const [showFilters, setShowFilters] = useState(true); 
  const navigate = useNavigate();

  // --- DATA FILTER ---F
  const brandCategories = ["All", "Nike", "Adidas", "New Balance", "Puma", "Converse", "Vans", "Salomon", "ASICS"];
  const [shoeTypes, setShoeTypes] = useState(["All Types", "Running", "Basketball", "Lifestyle", "Skateboarding", "Training", "Sandals"]); 
  
  // --- STATE PAGINATION ---
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 16; 

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]); 

  // --- FUNGSI UTAMA UNTUK FILTERING SIMULTAN ---
  const applyFilter = (list, keyword, brand, shoeType) => {
    let result = list;

    // 1. Filter Berdasarkan Brand
    if (brand !== "All") {
      const lowerBrand = brand.toLowerCase();
      result = result.filter((item) => 
        (item.category || "").toLowerCase().includes(lowerBrand) || 
        (item.name || "").toLowerCase().includes(lowerBrand)
      );
    }
    
    // 2. Filter Berdasarkan Tipe Sepatu
    if (shoeType !== "All Types") {
        const lowerShoeType = shoeType.toLowerCase();
        result = result.filter((item) => {
            const itemCat = (item.categories || "").toLowerCase();
            return itemCat.includes(lowerShoeType);
        });
    }

    // 3. Filter Berdasarkan Keyword Pencarian
    if (keyword) {
        const lowerKeyword = keyword.toLowerCase();
        result = result.filter((item) => 
            (item.name || "").toLowerCase().includes(lowerKeyword) ||
            (item.description || "").toLowerCase().includes(lowerKeyword) ||
            (item.category || "").toLowerCase().includes(lowerKeyword) ||
            (item.categories || "").toLowerCase().includes(lowerKeyword)
        );
    }
    return result;
  };
  // -------------------------------------

  // --- USE EFFECT: FETCH KATEGORI DARI SUPABASE ---
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const { data, error } = await supabase
                .from('sneakers')
                .select('categories')
                .not('categories', 'is', null);

            if (error) throw error;
            
            const allTypes = data.map(item => item.categories);
            const uniqueTypes = ["All Types", ...new Set(allTypes)].filter(name => name);
            
            setShoeTypes(uniqueTypes);

        } catch (error) {
            console.error("Gagal mengambil kategori:", error);
            setShoeTypes(["All Types", "Running", "Basketball", "Lifestyle", "Skateboarding", "Training", "Sandals"]);
        }
    };
    fetchCategories();
  }, []); 


  // --- USE EFFECT: FETCH PRODUCTS & APPLY INITIAL FILTER ---
useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 1. Ambil URL Backend dari Environment Variable
        const API_URL = import.meta.env.VITE_API_BASE_URL;

        // 2. Gunakan URL dinamis
        const response = await axios.get(`${API_URL}/api/sneakers`);
        
        const fetchedProducts = response.data;
        setProducts(fetchedProducts);
        
        // Logic filter tetap sama
        const initialFiltered = applyFilter(fetchedProducts, searchKeyword, activeCategory, initialTypeFilter);
        setFilteredProducts(initialFiltered);

      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
    // Pastikan dependency array sudah sesuai kebutuhan logic kamu
  }, [searchKeyword, initialTypeFilter, activeCategory]);

useEffect(() => {
    if (location.state) {
        // Jika ada filter kategori (misal: Running, Basketball)
        if (location.state.category) {
            setActiveCategory(location.state.category);
            setSearchKeyword(""); // Reset keyword
        } 
        // Jika ada filter brand atau model (misal: Nike, Air Jordan)
        else if (location.state.brand) {
            setActiveCategory("All"); // Reset kategori
            setSearchKeyword(location.state.brand);
        }
        // Jika ada keyword umum (Search bar)
        else if (location.state.keyword) {
            setActiveCategory("All");
            setSearchKeyword(location.state.keyword);
        }
        
        // Reset ke halaman 1 setiap kali filter berubah
        setCurrentPage(1);
        window.scrollTo(0, 0);
    }
  }, [location.state]); // Jalankan setiap kali lokasi/state berubah


  // Handler untuk Filter Brand
  const handleBrandFilter = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
    const result = applyFilter(products, searchKeyword, category, activeTypeFilter);
    setFilteredProducts(result);
  };
    
  // Handler untuk Filter Tipe Sepatu
  const handleTypeFilter = (type) => {
    setActiveTypeFilter(type);
    setCurrentPage(1);
    const result = applyFilter(products, searchKeyword, activeCategory, type);
    setFilteredProducts(result);
  };

  // --- LOGIKA PAGINATION ---
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Fungsi Ganti Halaman
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      <div className="pt-24 md:pt-32 pb-32 md:pb-20 max-w-7xl mx-auto px-4 md:px-6">
        
        {/* ========================================================
            HEADER & SEARCH RESULT
        ======================================================== */}
        <div className="text-center mb-6">
            <span className="text-[#FF5500] font-bold text-sm tracking-wider uppercase">Premium Collection</span>
            
            <h1 className="text-3xl md:text-5xl font-black text-gray-900 mt-2">
                ALL SNEAKERS
            </h1>
            
            {searchKeyword && (
                <div className="mt-4 mb-4 flex items-center justify-center gap-3 animate-fade-in-down">
                    <span className="text-base text-gray-600 font-medium">Showing results for:</span>
                    <span className="inline-block bg-[#FF5500]/10 text-[#FF5500] px-4 py-1.5 rounded-lg font-black text-sm uppercase shadow-sm border border-[#FF5500]/20 transition-all hover:scale-[1.03]">
                        "{searchKeyword}"
                    </span>
                </div>
            )}

            <p className="text-gray-500 max-w-2xl mx-auto mt-4">
                Browse our extensive range of rare and limited edition sneakers. Find the perfect pair that suits your style.
            </p>
        </div>

        {/* ========================================================
    MODERN COMPACT FILTER (RESPONSIVE)
======================================================== */}
{/* UBAH 1: Kurangi margin bawah container utama dari mb-8 jadi mb-4 di mobile */}
<div className="lg:col-span-3 mb-4 lg:mb-8">

    {/* 1. TOP BAR (Control & Status) */}
    {/* UBAH 2: Kurangi margin bawah tombol toggle dari mb-4 jadi mb-2 */}
    <div className="flex items-center justify-between mb-2 lg:mb-4 px-1">
        <button
            onClick={() => setShowFilters(!showFilters)}
            className="group flex items-center gap-3 text-gray-900 hover:text-orange-600 transition-colors"
        >
            <div className={`p-2 rounded-full transition-colors ${showFilters ? 'bg-black text-white' : 'bg-gray-100 text-gray-600'}`}>
                {/* Icon Filter */}
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="4" y1="21" x2="4" y2="14"></line><line x1="4" y1="10" x2="4" y2="3"></line>
                    <line x1="12" y1="21" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="3"></line>
                    <line x1="20" y1="21" x2="20" y2="16"></line><line x1="20" y1="12" x2="20" y2="3"></line>
                    <line x1="1" y1="14" x2="7" y2="14"></line><line x1="9" y1="8" x2="15" y2="8"></line>
                    <line x1="17" y1="16" x2="23" y2="16"></line>
                </svg>
            </div>
            <div className="text-left">
                <span className="block font-bold text-sm tracking-wide leading-none mb-1">
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                </span>
                <span className="text-[10px] font-medium text-gray-400 uppercase tracking-wider">
                    {filteredProducts.length} Results
                </span>
            </div>
        </button>

         {/* Tombol Reset (Opsional) - Tampil jika ada filter aktif */}
         {(activeCategory !== 'All' || activeTypeFilter !== 'All Types') && (
            <button
                onClick={() => { setActiveCategory('All'); setActiveTypeFilter('All Types'); }}
                className="text-[10px] font-bold text-red-500 hover:text-red-700 underline underline-offset-2"
            >
                Reset
            </button>
        )}
    </div>

    {/* 2. EXPANDABLE FILTER PANEL */}
    <div
        className={`overflow-hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${showFilters ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
            }`}
    >
        <div className="bg-white p-4 md:p-6 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 shadow-xl shadow-gray-100/50 space-y-5 md:space-y-8">

            {/* SECTION A: SHOE TYPE (Chips Style) */}
            <div>
                {/* UBAH 4: Margin judul dikurangi jadi mb-2 (sebelumnya mb-4) */}
                <h3 className="font-bold text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-2 md:mb-4 flex items-center gap-2 pl-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-black"></span>
                    Category
                </h3>
                {/* UBAH 5: Padding bawah scroll dikurangi jadi pb-2 (sebelumnya pb-4) */}
                <div className="flex flex-nowrap overflow-x-auto md:overflow-visible md:flex-wrap gap-2.5 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x">
                    {shoeTypes.map((typeCat) => {
                        const isActive = activeTypeFilter === typeCat;
                        return (
                            <button
                                key={typeCat}
                                onClick={() => handleTypeFilter(typeCat)}
                                className={`
                                    flex-shrink-0 snap-start
                                    px-4 py-2 md:px-5 md:py-2.5 rounded-xl text-xs font-bold transition-all duration-200 border
                                    ${isActive
                                        ? "bg-black text-white border-black shadow-lg shadow-black/20 transform scale-105"
                                        : "bg-gray-50 text-gray-600 border-transparent hover:bg-gray-100 hover:border-gray-200"
                                    }
                                `}
                            >
                                {typeCat}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Divider Halus */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-100 to-transparent"></div>

            <div>
    <h3 className="font-bold text-[10px] md:text-xs text-gray-400 uppercase tracking-widest mb-2 md:mb-4 flex items-center gap-2 pl-1">
        <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
        Brand
    </h3>
    
    <div className="flex flex-nowrap overflow-x-auto md:overflow-visible md:flex-wrap gap-2 md:gap-3 pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0 no-scrollbar snap-x">
        {brandCategories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
                <button
                    key={cat}
                    onClick={() => handleBrandFilter(cat)}
                    className={`
                        flex-shrink-0 snap-start
                        relative px-5 py-2 md:px-6 md:py-2.5 rounded-full text-xs font-bold transition-all duration-200 border whitespace-nowrap
                        ${isActive
                            ? "bg-[#FF5500] text-white border-[#FF5500] shadow-md shadow-orange-500/20 transform scale-[1.02]"
                            : "bg-white text-gray-500 border-gray-200 hover:border-gray-300 hover:text-gray-900"
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
</div>

        {/* GRID PRODUK */}
        {loading ? (
             // SKELETON LOADING (Fix: Menggunakan div, bukan ProductCard)
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[300px] bg-gray-200 rounded-3xl animate-pulse"></div>
                ))}
             </div>
        ) : currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 mb-32">
                {currentItems.map((item) => (
                    // REAL PRODUCT CARD (Sudah ada data 'item')
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

                  {/* Angka Halaman */}
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

                  {/* Tombol Next */}
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
        ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
                <p className="text-xl font-bold text-gray-400">No sneakers found for "{activeCategory}"</p>
                <button onClick={() => handleFilter("All")} className="mt-4 text-[#FF5500] font-bold hover:underline">
                    View All Sneakers
                </button>
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}