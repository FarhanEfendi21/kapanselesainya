import { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiHeart } from "react-icons/hi2";

import { useCart } from "../Context/CartContext";
import { useWishlist } from "../Context/WishlistContext";
import SearchBar from "./SearchBar";


const catalogCategories = [
  {
    title: "Popular Brands",
    items: [
      "Nike",
      "Adidas",
      "New Balance",
      "Puma",
      "Converse",
      "Vans",
      "Asics",
    ],
  },
  {
    title: "Trending Models",
    items: [
      "Air Jordan 1",
      "Salomon XT-6",
      "Adidas Samba",
      "New Balance 530",
      "Puma Speedcat",
      "Nike P-6000",
    ],
  },
  {
    title: "Categories",
    items: [
      "Running",
      "Basketball",
      "Lifestyle",
      "Skateboarding",
      "Training",
      "Sandals",
    ],
  },
  {
    title: "Collections",
    items: ["New Arrivals", "Best Sellers", "Sale & Deals"],
  },
];

// ==================================================
// NAVBAR COMPONENT
// ==================================================
export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCatalog, setShowCatalog] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);

  const { totalItems, refreshCart } = useCart();
  const { wishlistItems, removeFromWishlist, refreshWishlist } = useWishlist();

  const navigate = useNavigate();
  const location = useLocation();
  const catalogRef = useRef(null);

  // -----------------------------------------------
  // CLOSE CATALOG ON CLICK OUTSIDE
  // -----------------------------------------------
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (catalogRef.current && !catalogRef.current.contains(event.target)) {
        setShowCatalog(false);
      }
    };

    if (showCatalog) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showCatalog]);

  // -----------------------------------------------
  // LOAD USER FROM LOCAL STORAGE
  // -----------------------------------------------
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedProfileImage = localStorage.getItem("profileImage");

    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);

      // === LOGIKA BARU: CEK APAKAH INI GUEST? ===
      // Jika email bukan guest, baru set sebagai user login
      if (parsedUser.email && !parsedUser.email.includes("guest")) {
        setUser(parsedUser);
      } else {
        // Jika guest, pastikan state user kosong (agar tampilan tetap mode tamu)
        setUser(null);
      }
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

  // -----------------------------------------------
  // FUNCTIONS
  // -----------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);

    refreshCart();
    refreshWishlist();

    navigate("/login", { replace: true });
  };

  const handleWishlistNav = (path) => {
    setShowWishlist(false);
    navigate(path);
  };

  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const isActive = (path) =>
    location.pathname === path
      ? "text-[#FF5500] font-bold"
      : "text-gray-600 hover:text-black";

  // ==================================================
  // RENDER
  // ==================================================
  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 font-poppins ${isScrolled || showCatalog
          ? "bg-white/80 dark:bg-gray-900/90 backdrop-blur-xl shadow-[0_2px_20px_-5px_rgba(0,0,0,0.1)] py-2"
          : "bg-gradient-to-b from-white/50 to-transparent py-4"
          }`}
        onMouseLeave={() => { }}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center">
          {/* ==================================================
             LOGO
          ================================================== */}
          <div className="flex-shrink-0 z-20">
            <Link to="/home" className="flex items-center gap-2 group">
              <h1 className="text-2xl md:text-3xl font-black italic tracking-tighter select-none">
                <span className="text-gray-900 dark:text-white group-hover:text-black dark:group-hover:text-gray-200 transition-colors">
                  TRUE
                </span>
                <span className="text-[#FF5500]">KICKS</span>
              </h1>
            </Link>
          </div>

          {/* ==================================================
             MENU (CENTER) - Hidden below lg breakpoint
          ================================================== */}
          <div className="hidden lg:flex items-center gap-1 text-sm font-medium bg-gray-100/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-full px-1.5 py-1.5">
            <Link
              to="/home"
              className={`px-4 py-2 rounded-full transition-all duration-200 ${location.pathname === '/home'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Home
            </Link>

            {/* CATALOG MENU */}
            <div className="relative h-full flex items-center">
              <button
                onClick={() => setShowCatalog(!showCatalog)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full transition-all duration-200 ${showCatalog
                  ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
              >
                Catalog
                <svg
                  className={`w-3.5 h-3.5 transition-transform duration-300 ${showCatalog ? "rotate-180" : ""}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
            </div>

            <Link
              to="/sneakers"
              className={`px-4 py-2 rounded-full transition-all duration-200 ${location.pathname === '/sneakers'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Sneakers
            </Link>

            <Link
              to="/apparel"
              className={`px-4 py-2 rounded-full transition-all duration-200 ${location.pathname === '/apparel'
                ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'}`}
            >
              Apparel
            </Link>

            <Link
              to="/sale"
              className="px-4 py-2 rounded-full text-red-500 font-semibold hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
            >
              Sale
            </Link>
          </div>

          {/* ==================================================
             ACTION BUTTONS (RIGHT)
          ================================================== */}
          <div className="flex items-center gap-1 md:gap-2 lg:gap-3 flex-shrink-0">

            {/* === SEARCH BAR === */}
            <div className="hidden lg:block">
              <SearchBar />
            </div>

            {/* === WISHLIST BUTTON === */}
            <div className="relative hidden lg:block">
              <button
                onClick={() => setShowWishlist(!showWishlist)}
                className={`
                    group relative p-2 rounded-full transition-all duration-300
                    ${showWishlist
                    ? "bg-orange-50 text-[#FF5500]"
                    : "hover:bg-gray-100 text-gray-600 hover:text-[#FF5500]"
                  }
                 `}
              >
                {/* Container Icon dengan Animasi */}
                <div className="relative transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
                  {/* Tampilkan Hati Penuh jika ada isinya atau sedang dibuka, jika kosong tampilkan garis */}
                  {wishlistItems.length > 0 || showWishlist ? (
                    <HiHeart className="w-6 h-6 text-[#FF5500] drop-shadow-sm" />
                  ) : (
                    <HiOutlineHeart className="w-6 h-6 stroke-[2]" />
                  )}
                </div>

                {/* Badge Modern (Notification Style) */}
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 flex h-5 w-5">
                    {/* Ping Animation (Ring effect) */}
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    {/* Main Badge */}
                    <span className="relative inline-flex rounded-full h-5 w-5 bg-[#FF5500] border-2 border-white text-white items-center justify-center text-[9px] font-bold">
                      {wishlistItems.length}
                    </span>
                  </span>
                )}
              </button>

              {/* === DROPDOWN WISHLIST (MODERNIZED) === */}
              {showWishlist && (
                <div className="absolute top-full right-0 mt-4 w-80 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-fade-in origin-top-right ring-1 ring-black/5">
                  {/* Header Dropdown */}
                  <div className="p-4 border-b border-gray-50 flex justify-between items-center bg-gray-50/50">
                    <h3 className="font-black text-sm uppercase tracking-wide text-gray-800">
                      My Wishlist{" "}
                      <span className="text-[#FF5500]">
                        ({wishlistItems.length})
                      </span>
                    </h3>
                    <button
                      onClick={() => setShowWishlist(false)}
                      className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-400 transition-colors"
                    >
                      ✕
                    </button>
                  </div>

                  {/* List Item */}
                  <div className="p-2 max-h-[300px] overflow-y-auto custom-scrollbar">
                    {wishlistItems.length === 0 ? (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                          <HiOutlineHeart className="w-6 h-6 text-gray-300" />
                        </div>
                        <p className="text-xs font-bold text-gray-900">
                          Your wishlist is empty
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          Save items you love here.
                        </p>
                      </div>
                    ) : (
                      wishlistItems.map((item) => (
                        <div
                          key={item.id}
                          onClick={() => {
                            navigate(`/product/${item.productType || 'sneakers'}/${item.id}`);
                            setShowWishlist(false);
                          }}
                          className="flex gap-3 p-2 hover:bg-gray-50 rounded-xl cursor-pointer group transition-colors"
                        >
                          {/* Gambar Kecil */}
                          <div className="w-14 h-14 bg-white border border-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                            <img
                              src={item.image}
                              className="w-[85%] object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500"
                              alt={item.name}
                            />
                          </div>

                          {/* Info */}
                          <div className="flex-grow min-w-0 flex flex-col justify-center">
                            <p className="font-bold text-xs text-gray-900 truncate">
                              {item.name}
                            </p>
                            <p className="text-[10px] text-gray-500 font-medium mt-0.5">
                              Rp {(item.price / 1000).toLocaleString()}K
                            </p>
                          </div>

                          {/* Tombol Hapus (Icon Sampah Kecil) */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              removeFromWishlist(item.id);
                            }}
                            className="self-center p-2 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                            title="Remove from wishlist"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="w-4 h-4"
                            >
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  {/* Footer Dropdown (Optional: View All) */}
                  {wishlistItems.length > 0 && (
                    <div className="p-3 border-t border-gray-50 bg-gray-50/50">
                      <button
                        onClick={() => {
                          navigate("/wishlist");
                          setShowWishlist(false);
                        }}
                        className="w-full py-2 text-xs font-bold text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-black hover:text-white hover:border-black transition-all shadow-sm"
                      >
                        View Full Wishlist
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* CART */}
            <button
              onClick={() => navigate("/cart")}
              className="hidden md:block group relative p-2 rounded-full hover:bg-orange-50 transition-all duration-300"
            >
              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className={`w-6 h-6 transition-colors ${totalItems > 0
                  ? "text-[#FF5500] fill-orange-100"
                  : "text-gray-600 group-hover:text-black"
                  }`}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>

              {/* Badge Modern */}
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-[#FF5500] text-white text-[10px] font-bold h-5 min-w-[20px] px-1 flex items-center justify-center rounded-full border-2 border-white shadow-sm transform group-hover:scale-110 transition-transform">
                  {totalItems}
                </span>
              )}
            </button>

            {/* USER DROPDOWN */}
            {user ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="group flex items-center gap-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 rounded-full pl-1 pr-3 py-1 transition-all duration-200"
                >
                  <div className="relative">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#FF5500] to-orange-600 flex items-center justify-center text-white text-xs font-bold ring-2 ring-white dark:ring-gray-800 overflow-hidden">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        getInitials(user.full_name)
                      )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white dark:border-gray-800" />
                  </div>
                  <span className="text-xs font-semibold text-gray-700 dark:text-gray-200 group-hover:text-gray-900 dark:group-hover:text-white">
                    {user.full_name?.split(" ")[0] || "User"}
                  </span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className={`w-4 h-4 text-gray-400 transition-transform ${showUserMenu ? "rotate-180" : ""
                      }`}
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* DROPDOWN MENU */}
                {showUserMenu && (
                  <div className="absolute top-full right-0 mt-4 w-48 bg-white rounded-2xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] border border-gray-100 overflow-hidden z-50 animate-fade-in origin-top-right ring-1 ring-black/5">
                    <div className="p-2 space-y-1">
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-xl transition-colors"
                      >
                        <span>👤</span> My Profile
                      </Link>
                      <Link
                        to="/orders"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-black rounded-xl transition-colors"
                      >
                        <span>📦</span> My Orders
                      </Link>
                      <div className="h-px bg-gray-100 my-1"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 rounded-xl transition-colors text-left"
                      >
                        <span>🚪</span> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="hidden md:flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-5 py-2 rounded-full 
                           font-semibold text-sm hover:bg-gray-800 dark:hover:bg-gray-100 transition-all active:scale-95"
              >
                Sign In
              </button>
            )}
          </div>
        </div>

        {/* ==================================================
           MEGA MENU CATALOG
        ================================================== */}
        {showCatalog && (
          <div
            ref={catalogRef}
            className="absolute top-full left-0 w-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl shadow-[0_20px_50px_-20px_rgba(0,0,0,0.15)] border-t border-gray-100 dark:border-gray-800
                       overflow-hidden transition-all duration-300 origin-top"
          >
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="grid grid-cols-4 gap-10">
                {catalogCategories.map((category, index) => (
                  <div key={index}>
                    <h3 className="font-bold text-gray-900 dark:text-white text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                      <span className="w-6 h-0.5 bg-[#FF5500] rounded-full"></span>
                      {category.title}
                    </h3>

                    <ul className="space-y-2">
                      {category.items.map((item, idx) => {
                        let targetPath = "/sneakers";
                        let stateData = null;

                        if (category.title === "Collections") {
                          if (item === "Sale & Deals") targetPath = "/sale";
                          else if (item === "New Arrivals") {
                            targetPath = "/home";
                            stateData = { scrollTo: "new-arrivals" };
                          }
                          else if (item === "Best Sellers") {
                            targetPath = "/home";
                            stateData = { scrollTo: "best-sellers" };
                          }
                        } else {
                          let stateKey = "keyword";
                          if (category.title === "Categories") {
                            stateKey = "typeFilter";
                          } else if (category.title === "Popular Brands") {
                            stateKey = "brand";
                          }
                          stateData = { [stateKey]: item };
                        }

                        return (
                          <li key={idx}>
                            <Link
                              to={targetPath}
                              state={stateData}
                              onClick={() => setShowCatalog(false)}
                              className="text-gray-500 dark:text-gray-400 hover:text-[#FF5500] dark:hover:text-[#FF5500] transition text-sm font-medium hover:translate-x-1 inline-block"
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
      </nav >
    </>
  );
}
