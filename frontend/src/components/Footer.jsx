import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  // Config WhatsApp
  const whatsappNumber = "081392460881"; // Ganti dengan nomor asli
  const whatsappMessage = "Halo TrueKicks, saya butuh bantuan...";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  return (
    <footer className="bg-[#1F1F1F] text-white pt-16 pb-32 md:pb-16 font-poppins border-t border-white/5">
      <div className="container mx-auto px-6">
        {/* === BAGIAN ATAS: SOSMED & LOGO === */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 relative">
          {/* 1. Social Media Icons (Posisi Kiri di Desktop) */}
          <div className="flex space-x-6 mb-8 md:mb-0 md:absolute md:left-0 md:top-2">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/efndfrhn?igsh=MXduMWQxc2lxZzI1dA=="
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF5500] transition transform hover:scale-110"
            >
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                className="w-6 h-6"
                viewBox="0 0 24 24"
              >
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
              </svg>
            </a>
            {/* GitHub */}
            <a
              href="https://github.com/FarhanEfendi21/kapanselesainya"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#FF5500] transition transform hover:scale-110"
            >
              <svg fill="currentColor" className="w-6 h-6" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
          </div>

          {/* 2. Logo Tengah (Centered) */}
          <div className="w-full text-center">
            <Link to="/home">
              <h2 className="text-4xl font-black italic tracking-tighter select-none hover:scale-105 transition-transform inline-block cursor-pointer">
                TRUE<span className="text-[#FF5500]">KICKS</span>
              </h2>
            </Link>
            <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide">
              100% Authentic Guarantee
            </p>
          </div>
        </div>

        {/* === BAGIAN BAWAH: GRID 4 KOLOM === */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-sm">
          {/* Kolom 1: Quick Links */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">
              Quick Links
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li>
                <Link
                  to="/profile"
                  className="hover:text-[#FF5500] hover:pl-2 transition-all block"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-[#FF5500] hover:pl-2 transition-all block"
                >
                  Shopping Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/wishlist"
                  className="hover:text-[#FF5500] hover:pl-2 transition-all block"
                >
                  My Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* Kolom 3: Our Information */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">
              Store Info
            </h3>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 mt-0.5 flex-shrink-0 text-[#FF5500]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                </svg>
                <span>Magelang, Indonesia</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#FF5500]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  ></path>
                </svg>
                <span>+62 815 7642 387</span>
              </li>
              <li className="flex items-center gap-3">
                <svg
                  className="w-5 h-5 flex-shrink-0 text-[#FF5500]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  ></path>
                </svg>
                <span className="truncate">farhanefendi71@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Kolom 4: Get in Touch (REPLACED WITH WHATSAPP CTA) */}
          <div>
            <h3 className="font-bold text-lg mb-6 text-white uppercase tracking-wider">
              Fast Response
            </h3>
            <p className="text-gray-400 mb-6 text-sm">
              Need help with your order or finding a specific pair? Chat with us
              instantly.
            </p>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-3 w-full bg-[#25D366] hover:bg-[#20bd5a] text-white px-4 py-3 rounded-xl font-bold transition-all shadow-lg hover:shadow-green-500/20 active:scale-95"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              Chat on WhatsApp
            </a>
          </div>
        </div>

        {/* COPYRIGHT */}
        <div className="border-t border-white/10 mt-16 pt-8 text-center text-xs text-gray-500 flex flex-col md:flex-row justify-between items-center gap-4">
          <p>&copy; 2024 TrueKicks Indonesia. All rights reserved.</p>
          <div className="flex gap-4">
            <span className="hover:text-white cursor-pointer transition">
              Privacy Policy
            </span>
            <span className="hover:text-white cursor-pointer transition">
              Terms of Service
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
