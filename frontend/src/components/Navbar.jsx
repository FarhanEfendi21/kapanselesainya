import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../Context/CartContext"; 
import { useWishlist } from "../Context/WishlistContext";

// --- DATA MENU CATALOG ---
const catalogCategories = [
  {
    title: "Popular Brands",
    items: ["Nike", "Adidas", "New Balance", "Puma", "Converse", "Vans", "Asics", "Reebok"]
  },
  {
    title: "Trending Models",
    items: ["Air Jordan 1", "Nike Dunk Low", "Adidas Samba", "New Balance 530", "Yeezy Slide", "Nike P-6000"]
  },
  {
    title: "Categories",
    items: ["Running", "Basketball", "Lifestyle", "Skateboarding", "Training", "Sandals"]
  },
  {
    title: "Collections",
    items: ["New Arrivals", "Best Sellers", "Upcoming Releases", "Member Exclusives", "Sale & Deals"]
  }
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  // HAPUS STATE isMobileMenuOpen KARENA TIDAK DIPAKAI LAGI
  const [showWishlist, setShowWishlist] = useState(false);
  
  const { wishlistItems, removeFromWishlist } = useWishlist(); 
  const { totalItems } = useCart(); 
  
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCatalog, setShowCatalog] = useState(false);
  
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const searchInputRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedProfileImage = localStorage.getItem("profileImage");
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedProfileImage) {
      setProfileImage(storedProfileImage);
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleLogout = () => {
    localStorage.removeItem("user"); 
    setUser(null); 
    navigate("/login"); 
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      navigate('/sneakers', { state: { keyword: searchTerm } }); 
      setShowSearch(false); 
    }
  };

  const handleWishlistNav = (path) => {
    setShowWishlist(false);
    navigate(path);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  const isActive = (path) => location.pathname === path ? "text-[#FF5500] font-bold" : "text-gray-600 hover:text-black";

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 font-poppins ${
          isScrolled || showCatalog 
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3" 
            : "bg-transparent py-5"
        }`}
        onMouseLeave={() => setShowCatalog(false)}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center relative">
          
          {/* 1. LOGO */}
          <div className="flex-shrink-0 z-20">
            <Link to="/home" className={`flex items-center gap-2 group ${showSearch ? 'hidden md:flex' : 'flex'}`}>
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter select-none">
                <span className="text-gray-900 group-hover:text-black transition-colors">TRUE</span>
                <span className="text-[#FF5500]">KICKS</span>
              </h1>
            </Link>
          </div>

          {/* 2. MENU TENGAH (DESKTOP ONLY) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            {showSearch ? (
              <div className="relative w-[200px] md:w-[500px] animate-fade-in">
                <input 
                  ref={searchInputRef}
                  type="text" 
                  placeholder="Search sneakers..." 
                  className="w-full bg-gray-100 text-gray-800 px-5 py-2.5 rounded-full outline-none focus:ring-2 focus:ring-orange-500/50 transition-all text-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={handleSearchSubmit}
                />
                <button 
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500 p-1"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-8 text-sm font-bold tracking-wide">
                <Link to="/home" className={`${isActive('/home')} transition-transform hover:scale-105`}>HOME</Link>
                
                {/* CATALOG TRIGGER */}
                <div 
                  className="relative h-full flex items-center cursor-default"
                  onMouseEnter={() => setShowCatalog(true)}
                >
                  <div className={`flex items-center gap-1 transition-colors cursor-pointer ${showCatalog ? 'text-black' : 'text-gray-600 hover:text-black'}`}>
                    CATALOG
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={`w-3 h-3 transition-transform duration-300 ${showCatalog ? 'rotate-180' : ''}`}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </div>
                </div>

                <Link to="/sneakers" className={`${isActive('/sneakers')} transition-transform hover:scale-105`}>SNEAKERS</Link>
                <Link to="/apparel" className={`${isActive('/apparel')} transition-transform hover:scale-105`}>APPAREL</Link>
                <Link to="/sale" className="text-red-500 font-bold hover:text-red-600 transition-transform hover:scale-105">SALE</Link>
              </div>
            )}
          </div>

          {/* 3. ACTIONS KANAN */}
          <div className="flex items-center gap-3 md:gap-5 flex-shrink-0 z-20">
            {!showSearch && (
              <button onClick={() => setShowSearch(true)} className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                </svg>
              </button>
            )}

            {/* WISHLIST BUTTON */}
            <div className="relative">
              <button 
                onClick={() => setShowWishlist(!showWishlist)}
                className="p-2 rounded-full hover:bg-black/5 transition-colors text-gray-600 relative"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
                {wishlistItems.length > 0 && (
                  <span className="absolute top-1 right-0 bg-red-500 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white">
                    {wishlistItems.length}
                  </span>
                )}
              </button>

              {/* FLOATING DROPDOWN WISHLIST */}
              {showWishlist && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fade-in origin-top-right">
                  <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                    <h3 className="font-bold text-gray-900">My Wishlist ({wishlistItems.length})</h3>
                    <button onClick={() => setShowWishlist(false)} className="text-gray-400 hover:text-black">✕</button>
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto p-2 space-y-2">
                    {wishlistItems.length === 0 ? (
                      <div className="text-center py-8 text-gray-400 text-xs">
                        Your wishlist is empty. <br/> Start loving some shoes!
                      </div>
                    ) : (
                      wishlistItems.map((item) => (
                        <div key={item.id} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors group">
                          <div className="w-14 h-14 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                             <img src={item.image} className="w-[90%] mix-blend-multiply" alt={item.name} />
                          </div>
                          <div className="flex-grow min-w-0 cursor-pointer" onClick={() => { handleWishlistNav(`/product/sneakers/${item.id}`); }}>
                             <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
                             <p className="text-xs text-gray-500">Rp {(item.price / 1000).toLocaleString()}K</p>
                          </div>
                          <button 
                            onClick={(e) => { e.stopPropagation(); removeFromWishlist(item.id); }}
                            className="p-2 text-gray-300 hover:text-red-500 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.636-1.452zM12.75 9.75a.75.75 0 10-1.5 0v8.625a.75.75 0 101.5 0V9.75zm-3.375 0a.75.75 0 10-1.5 0v8.625a.75.75 0 101.5 0V9.75zm6.75 0a.75.75 0 10-1.5 0v8.625a.75.75 0 101.5 0V9.75z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* CART BUTTON */}
            <button 
              onClick={() => navigate('/cart')} 
              className="hidden md:block p-2 rounded-full hover:bg-black/5 transition-colors text-gray-600 relative"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-1 right-0 bg-[#FF5500] text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center rounded-full border border-white shadow-sm animate-bounce-in">
                  {totalItems}
                </span>
              )}
            </button>
            

            {/* USER ACTIONS */}
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/profile" className="group flex items-center gap-2.5 hover:bg-gray-50 rounded-full pr-3 py-1 transition-all duration-300">
                  <div className="relative">
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF5500] to-orange-600 flex items-center justify-center text-white text-sm font-bold overflow-hidden ring-2 ring-white shadow-md group-hover:ring-[#FF5500] transition-all duration-300">
                      {profileImage ? (
                        <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      ) : (
                        getInitials(user.full_name)
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white"></div>
                  </div>
                  <div className="hidden lg:block text-left">
                    <p className="text-[10px] text-gray-500 font-medium leading-none mb-0.5">Hi,</p>
                    <p className="text-xs font-bold text-gray-900 leading-none group-hover:text-[#FF5500] transition-colors">
                      {user.full_name?.split(" ")[0] || "User"}
                    </p>
                  </div>
                </Link>

                <button 
                  onClick={handleLogout} 
                  className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-full font-semibold text-xs uppercase tracking-wider hover:bg-gray-800 hover:shadow-lg transition-all duration-300 active:scale-95"
                >
                  Logout
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                  </svg>
                </button>
              </div>
            ) : (
              <button onClick={() => navigate('/login')} className="hidden md:flex items-center gap-2 bg-black text-white px-6 py-2.5 rounded-full font-bold text-sm hover:bg-gray-800 hover:shadow-lg transition-all duration-300 active:scale-95">
                Log In
              </button>
            )}

            {/* --- HAMBURGER MENU DIHAPUS ---*/}
          </div>
        </div>

        {/* MEGA MENU (TETAP ADA UNTUK DESKTOP) */}
        {showCatalog && (
          <div 
            className={`absolute top-full left-0 w-full bg-white shadow-xl border-t border-gray-100 overflow-hidden transition-all duration-300 origin-top ${
              showCatalog ? "opacity-100 max-h-[500px] visible" : "opacity-0 max-h-0 invisible"
            }`}
            onMouseEnter={() => setShowCatalog(true)}
            onMouseLeave={() => setShowCatalog(false)}
          >
            <div className="max-w-7xl mx-auto px-6 py-10">
              <div className="grid grid-cols-4 gap-8">
                {catalogCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-black text-gray-900 text-sm uppercase tracking-wider mb-4 border-b border-gray-100 pb-2">
                      {category.title}
                    </h3>
                    <ul className="space-y-2.5">
                      {category.items.map((item, idx) => {
                        const targetPath = category.title === "Categories" ? "/sneakers" : "/catalog";
                        const stateKey = category.title === "Categories" ? "typeFilter" : "keyword";
                        return (
                          <li key={idx}>
                            <Link 
                              to={targetPath} 
                              state={{ [stateKey]: item }} 
                              onClick={() => setShowCatalog(false)}
                              className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all duration-200 inline-block text-sm font-medium"
                            >
                              {item}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {/* --- MOBILE MENU OVERLAY DIHAPUS ---
           Sudah tidak diperlukan karena navigasi mobile ditangani oleh BottomNav
        */}

      </nav>
    </>
  );
}