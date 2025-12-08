import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../Context/CartContext";

import { HiHome, HiOutlineHome, HiUser, HiOutlineUser } from "react-icons/hi2";
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

  const isActive = (path) => location.pathname === path;

  // Sembunyikan BottomNav di halaman Checkout
  if (location.pathname === "/checkout") return null;

  return (
    <>
      {/* ========================================
          1. OVERLAY BACKDROP
      ======================================== */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-all duration-300 lg:hidden
        ${showMenu ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"}`}
      />

      {/* ========================================
          2. QUICK MENU POPUP
      ======================================== */}
      <div
        onClick={(e) => e.stopPropagation()}
        className={`fixed bottom-28 left-1/2 -translate-x-1/2 w-[85%] max-w-sm z-50 transition-all duration-300 ease-out lg:hidden
        ${showMenu ? "translate-y-0 opacity-100 scale-100" : "translate-y-4 opacity-0 scale-95 pointer-events-none"}`}
      >
        <div className="bg-white rounded-2xl p-4 shadow-2xl shadow-black/20 border border-gray-100">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[10px] font-bold text-gray-400 tracking-widest uppercase">
              Quick Menu
            </span>
            <button
              onClick={() => setShowMenu(false)}
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 hover:bg-gray-200 transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Menu Grid */}
          <div className="grid grid-cols-2 gap-2">
            <MenuButton
              icon={<GiRunningShoe className="w-5 h-5" />}
              title="Sneakers"
              onClick={() => handleNavigate("/sneakers")}
            />
            <MenuButton
              icon={<GiHoodie className="w-5 h-5" />}
              title="Apparel"
              onClick={() => handleNavigate("/apparel")}
            />
            <MenuButton
              icon={<FiPercent className="w-5 h-5" />}
              title="Sale"
              onClick={() => handleNavigate("/sale")}
              highlight
            />
            <MenuButton
              icon={<FiHeart className="w-5 h-5" />}
              title="Wishlist"
              onClick={() => handleNavigate("/wishlist")}
            />
          </div>
        </div>
      </div>

      {/* ========================================
          3. FLOATING CART BUTTON
      ======================================== */}
      <div
        className={`fixed bottom-24 right-5 z-40 lg:hidden transition-all duration-300 
        ${showMenu ? "opacity-30 scale-90" : "opacity-100 scale-100"}`}
      >
        <button
          onClick={() => navigate("/cart")}
          className="relative w-14 h-14 bg-gray-900 rounded-full flex items-center justify-center shadow-lg shadow-black/30 active:scale-95 transition-transform"
        >
          {/* Cart Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 text-white"
          >
            <path
              fillRule="evenodd"
              d="M7.5 6v.75H5.513c-.96 0-1.764.724-1.865 1.679l-1.263 12c-.15.143-.206.361-.143.558a.75.75 0 00.713.494h18.09a.75.75 0 00.713-.494.75.75 0 00-.143-.558l-1.263-12a1.875 1.875 0 00-1.865-1.679H16.5V6a4.5 4.5 0 10-9 0zM12 3a3 3 0 00-3 3v.75h6V6a3 3 0 00-3-3zm-3 8.25a3 3 0 106 0v-.75a.75.75 0 011.5 0v.75a4.5 4.5 0 11-9 0v-.75a.75.75 0 011.5 0v.75z"
              clipRule="evenodd"
            />
          </svg>

          {/* Badge */}
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-orange-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center">
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* ========================================
          4. MAIN BOTTOM NAV BAR
      ======================================== */}
      <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden px-4 pb-4 pt-2">
        <div className="bg-white rounded-2xl h-16 flex justify-around items-center shadow-lg shadow-black/10 border border-gray-100 max-w-md mx-auto">

          {/* Home Button */}
          <NavIcon
            active={isActive("/home")}
            onClick={() => handleNavigate("/home")}
            IconOutline={HiOutlineHome}
            IconFilled={HiHome}
            label="Home"
          />

          {/* Center Button - Menu */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-200 
            ${showMenu
                ? "bg-gray-900 rotate-45"
                : "bg-orange-500 hover:bg-orange-600"
              }`}
          >
            <RiAddFill className="w-6 h-6 text-white" />
          </button>

          {/* Profile Button */}
          <NavIcon
            active={isActive("/profile") || isActive("/login")}
            onClick={() => handleNavigate("/profile")}
            IconOutline={HiOutlineUser}
            IconFilled={HiUser}
            label="Profile"
          />
        </div>
      </div>
    </>
  );
}

// ==================================================================
// SUB-COMPONENTS
// ==================================================================

function NavIcon({ active, onClick, IconOutline, IconFilled, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 h-full transition-colors
        ${active ? "text-orange-500" : "text-gray-400 hover:text-gray-600"}`}
    >
      <div className={`transition-transform ${active ? "scale-110" : ""}`}>
        {active ? (
          <IconFilled className="w-6 h-6" />
        ) : (
          <IconOutline className="w-6 h-6" />
        )}
      </div>
      <span className={`text-[10px] mt-0.5 font-medium ${active ? "text-orange-500" : "text-gray-400"}`}>
        {label}
      </span>
    </button>
  );
}

function MenuButton({ icon, title, onClick, highlight }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all active:scale-95
        ${highlight
          ? "bg-orange-500 text-white"
          : "bg-gray-50 text-gray-700 hover:bg-gray-100"
        }`}
    >
      <span className={highlight ? "text-white" : "text-gray-500"}>
        {icon}
      </span>
      <span className="font-semibold text-sm">{title}</span>
    </button>
  );
}
