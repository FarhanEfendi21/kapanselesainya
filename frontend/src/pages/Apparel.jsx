import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

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
  const categories = ["All", "Hoodies", "T-Shirts", "Jackets", "Pants", "Jersey"];

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
      const filtered = products.filter((item) => 
        item.category === category
      );
      setFilteredProducts(filtered);
    }
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
  };

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <Navbar />

      <div className="pt-32 pb-20 max-w-7xl mx-auto px-6">
        
        {/* === HEADER SECTION === */}
        <div className="text-center mb-6">
            <span className="text-[#FF5500] font-bold text-sm tracking-wider uppercase">Streetwear Essentials</span>
            <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-2 mb-4">TRENDING APPAREL</h1>
            <p className="text-gray-500 max-w-2xl mx-auto">
                Elevate your style with our curated selection of hoodies, tees, and jackets from top brands.
            </p>
        </div>
        
        {/* --- TOMBOL TOGGLE FILTER BARU --- */}
        <div className="flex lg:col-span-3 mb-8">
            <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-2 bg-white text-gray-700 font-bold text-sm rounded-full shadow-lg border border-gray-100 hover:shadow-xl hover:text-black transition-all active:scale-[0.98]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-4 h-4 transition-transform duration-300 ${showFilters ? 'rotate-180' : 'rotate-0'}`}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5" />
                </svg>
                {showFilters ? 'Hide Categories' : 'Show Categories'} ({filteredProducts.length} Items)
            </button>
        </div>


        {/* === WRAPPER FILTER CONTENT (Dapat Disembunyikan) === */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${showFilters ? 'max-h-[300px] opacity-100 mb-12' : 'max-h-0 opacity-0 mb-0'}`}>

            <div className="w-full bg-white p-5 rounded-2xl shadow-lg border border-gray-100">
                <h3 className="font-black text-xs text-gray-400 uppercase tracking-widest mb-4 border-b border-gray-100 pb-2">Apparel Categories</h3>
                
                <div className="flex flex-wrap justify-center gap-3">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => handleFilter(cat)}
                            className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                                activeCategory === cat
                                    ? "bg-black text-white shadow-lg transform scale-105"
                                    : "bg-white text-gray-500 border border-gray-200 hover:border-gray-400 hover:text-black"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>
        </div>

        {/* === PRODUCT GRID === */}
        {loading ? (
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[...Array(8)].map((_, i) => (
                    <div key={i} className="h-[300px] bg-gray-200 rounded-3xl animate-pulse"></div>
                ))}
             </div>
        ) : currentItems.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-16">
                {currentItems.map((item) => (
                  // 3. UPDATE DI SINI: Tambahkan onClick navigasi
                  <div 
                    key={item.id} 
                    onClick={() => navigate(`/product/apparel/${item.id}`)}
                    className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full flex flex-col justify-between group"
                  >
                      
                      {/* Gambar */}
                      <div>
                         <div className="relative h-[220px] bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-gray-100 transition-colors overflow-hidden">
                            <span className="absolute top-3 left-3 bg-white/80 backdrop-blur-sm text-gray-900 text-[10px] px-2 py-1 rounded-md font-bold border border-gray-100">
                               {item.category}
                            </span>
                            <img 
                               src={item.image_url} 
                               className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-105" 
                               alt={item.name} 
                            />
                         </div>
                         
                         <h3 className="font-bold text-gray-900 text-sm line-clamp-2 min-h-[40px] group-hover:text-[#FF5500] transition-colors">
                           {item.name}
                         </h3>
                      </div>

                      {/* Harga & Button */}
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
                <p className="text-xl font-bold text-gray-400">No apparel found for "{activeCategory}"</p>
                <button onClick={() => handleFilter("All")} className="mt-4 text-[#FF5500] font-bold hover:underline">
                    View All Apparel
                </button>
            </div>
        )}
      </div>

      <Footer />
    </div>
  );
}