import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";

import { HiHome, HiOutlineHome, HiUser, HiOutlineUser } from "react-icons/hi2";
import { HiOutlineShoppingBag, HiOutlineHeart } from "react-icons/hi2";
import { GiRunningShoe, GiHoodie } from "react-icons/gi";
import { FiPercent, FiHeart } from "react-icons/fi";
import { RiAddFill } from "react-icons/ri";

export default function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const { totalItems } = useCart();

  const [showMenu, setShowMenu] = useState(false);

  const handleNavigate = (path) => {
    navigate(path);
    setShowMenu(false);
  };

  useEffect(() => {
    const closeMenu = () => setShowMenu(false);
    if (showMenu) window.addEventListener("click", closeMenu);
    return () => window.removeEventListener("click", closeMenu);
  }, [showMenu]);

  // Cek apakah route aktif
  const isActive = (path) => location.pathname === path;

  return (
    <>
      {/* 1. DARK OVERLAY */}
      <div
        className={`fixed inset-0 bg-black/60 z-40 transition-opacity duration-300 md:hidden
        ${
          showMenu
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* 2. MENU OVERLAY (POPUP CONTENT) - UPDATE ICONS */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-50 transition-all duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) origin-bottom md:hidden
        ${
          showMenu
            ? "translate-y-0 opacity-100 scale-100"
            : "translate-y-10 opacity-0 scale-90 pointer-events-none"
        }`}
      >
        <div className="bg-[#1A1A1A] border border-white/10 rounded-3xl p-5 shadow-2xl shadow-black/50 overflow-hidden relative">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF5500]/10 blur-3xl rounded-full pointer-events-none"></div>

          <div className="flex justify-between items-center mb-4">
            <span className="text-xs font-bold text-gray-400 tracking-widest uppercase">
              Quick Menu
            </span>
          </div>

          {/* Update: Menggunakan Component Icon modern daripada emoji */}
          <div className="grid grid-cols-2 gap-3">
            <MenuButton
              icon={<GiRunningShoe className="w-6 h-6" />}
              title="Sneakers"
              subtitle="All Collections"
              onClick={() => handleNavigate("/sneakers")}
            />
            <MenuButton
              icon={<GiHoodie className="w-6 h-6" />}
              title="Apparel"
              subtitle="Streetwear"
              onClick={() => handleNavigate("/apparel")}
            />
            <MenuButton
              icon={<FiPercent className="w-6 h-6" />}
              title="Sale"
              subtitle="Hot Deals"
              onClick={() => handleNavigate("/sale")}
              highlight
            />
            <MenuButton
              icon={<FiHeart className="w-6 h-6" />}
              title="Wishlist"
              subtitle="Your Favorites"
              onClick={() => handleNavigate("/wishlist")}
            />
          </div>
        </div>
      </div>

      {/* ==================================================================
          3. FLOATING CART BUTTON (PREMIUM GLOW STYLE)
         ================================================================== */}
      <div
        className={`fixed bottom-28 right-6 z-40 md:hidden transition-all duration-300 ${
          showMenu ? "blur-sm opacity-50" : "opacity-100"
        }`}
      >
        <button
          onClick={() => navigate("/cart")}
          className="group relative w-16 h-16 rounded-full flex items-center justify-center transition-transform active:scale-90"
        >
          {/* Background Blur/Glow Effect */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-[#FF5500] to-orange-600 blur-lg opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>

          {/* Main Button Circle */}
          <div className="relative w-full h-full bg-gradient-to-br from-[#FF5500] to-orange-600 rounded-full flex items-center justify-center shadow-xl border border-white/20 overflow-hidden">
            {/* Shine Animation */}
            <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>

            {/* Icon Tas Belanja */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 h-7 text-white drop-shadow-md"
            >
              <path
                fillRule="evenodd"
                d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12c-.15.143-.206.361-.143.558a.75.75 0 00.713.494h18.09a.75.75 0 00.713-.494.75.75 0 00-.143-.558l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
                clipRule="evenodd"
              />
            </svg>
          </div>

          {/* Badge Notification (Pulsing) */}
          {totalItems > 0 && (
            <span className="absolute top-0 right-0 flex h-6 w-6">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
              <span className="relative inline-flex rounded-full h-6 w-6 bg-white text-[#FF5500] border-2 border-[#FF5500] items-center justify-center text-[10px] font-black">
                {totalItems}
              </span>
            </span>
          )}
        </button>
      </div>

      {/* 4. BOTTOM NAV BAR (MAIN UPDATE) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[350px] z-50 md:hidden">
        <div className="bg-[#121212]/95 backdrop-blur-xl rounded-full px-8 h-[72px] flex justify-between items-center shadow-[0_8px_30px_rgb(0,0,0,0.4)] border border-white/5 relative">
          {/* --- TOMBOL KIRI: HOME (Outline vs Solid) --- */}
          <NavIcon
            active={isActive("/home")}
            onClick={() => handleNavigate("/home")}
            IconOutline={HiOutlineHome} // Icon saat tidak aktif
            IconFilled={HiHome} // Icon saat aktif
          />

          {/* --- TOMBOL TENGAH: PLUS MENU --- */}
          <div className="relative -top-6">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMenu(!showMenu);
              }}
              className={`w-16 h-16 rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(255,85,0,0.4)] transition-all duration-300 border-4 border-[#121212] group
                    ${
                      showMenu
                        ? "bg-white text-black rotate-45 scale-95"
                        : "bg-[#FF5500] text-white rotate-0 hover:scale-105"
                    }`}
            >
              {/* Menggunakan icon plus yang lebih tebal (RiAddFill) */}
              <RiAddFill className="w-9 h-9 transition-transform group-hover:rotate-90 duration-300" />
            </button>
          </div>

          {/* --- TOMBOL KANAN: PROFILE (Outline vs Solid) --- */}
          <NavIcon
            active={isActive("/profile") || isActive("/login")} // Aktif di profile atau login
            onClick={() => handleNavigate("/profile")}
            IconOutline={HiOutlineUser}
            IconFilled={HiUser}
          />
        </div>
      </div>
    </>
  );
}

// ==================================================================
// SUB-COMPONENT YANG DIPERBARUI
// ==================================================================

// --- 1. MODERNISED NAV ICON (Menerima komponen Icon, bukan SVG string) ---
function NavIcon({ active, onClick, IconOutline, IconFilled }) {
  return (
    <button
      onClick={onClick}
      // Gunakan 'group' untuk hover effect
      // Warna inactive diubah jadi gray-400 agar lebih subtle
      className={`flex flex-col items-center justify-center w-12 h-12 transition-all duration-300 group relative
             ${
               active ? "text-[#FF5500]" : "text-gray-400 hover:text-gray-200"
             }`}
    >
      {/* Container Icon dengan animasi scale */}
      <div
        className={`transition-transform duration-300 ${
          active ? "scale-110" : "group-hover:scale-105"
        }`}
      >
        {active ? (
          // Render Icon Solid jika aktif
          <IconFilled className="w-[28px] h-[28px]" />
        ) : (
          // Render Icon Outline jika tidak aktif (stroke sedikit dipertebal)
          <IconOutline className="w-[28px] h-[28px] stroke-[1.5]" />
        )}
      </div>

      {/* Indikator Dot di bawah (opsional, sekarang lebih halus) */}
      <span
        className={`absolute bottom-1 w-1.5 h-1.5 bg-[#FF5500] rounded-full transition-all duration-300 
                ${active ? "opacity-100 scale-100" : "opacity-0 scale-0"}`}
      ></span>
    </button>
  );
}

// --- 2. MENU ITEM BUTTON (Menerima komponen Icon) ---
function MenuButton({ icon, title, subtitle, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 p-3 rounded-2xl text-left transition-all active:scale-95 border group
            ${
              highlight
                ? "bg-gradient-to-r from-[#FF5500] to-orange-600 border-transparent text-white shadow-lg"
                : "bg-white/5 border-white/5 hover:bg-white/10 text-gray-300 hover:text-white"
            }`}
    >
      {/* Render icon component */}
      <span
        className={`text-2xl transition-transform group-hover:scale-110 ${
          highlight ? "text-white" : "text-gray-400 group-hover:text-[#FF5500]"
        }`}
      >
        {icon}
      </span>
      <div>
        <span
          className={`block font-bold text-sm ${
            highlight ? "text-white" : "text-gray-200"
          }`}
        >
          {title}
        </span>
        <span
          className={`block text-[10px] ${
            highlight ? "text-white/80" : "text-gray-500"
          }`}
        >
          {subtitle}
        </span>
      </div>
    </button>
  );
}
