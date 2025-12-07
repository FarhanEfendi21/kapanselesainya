import React from "react";
import { Link } from "react-router-dom";

export default function Footer({ showOnMobile = false }) {
  const whatsappNumber = "081392460881";
  const whatsappMessage = "Halo TrueKicks, saya butuh bantuan...";
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <footer className={`bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 font-poppins border-t border-gray-100 dark:border-gray-800 pb-24 md:pb-0 transition-colors duration-300 ${showOnMobile ? '' : 'hidden md:block'}`}>

      {/* Decorative Top Accent */}
      <div className="h-1 bg-gradient-to-r from-[#FF5500] via-orange-400 to-[#FF5500]"></div>

      <div className="max-w-6xl mx-auto px-5 py-10 md:py-14">

        {/* Main Content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <Link to="/home" className="inline-block">
              <h2 className="text-3xl font-black italic tracking-tighter text-gray-900 select-none hover:scale-105 transition-transform">
                TRUE<span className="text-[#FF5500]">KICKS</span>
              </h2>
            </Link>
            <p className="text-xs text-gray-400 mt-2 tracking-wide">Premium Authentic Sneakers</p>

            {/* Social Icons */}
            <div className="flex gap-2 mt-5 justify-center md:justify-start">
              <a
                href="https://www.instagram.com/efndfrhn"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white hover:bg-[#FF5500] hover:scale-110 transition-all shadow-lg shadow-gray-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
              <a
                href="https://github.com/FarhanEfendi21/kapanselesainya"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-white hover:bg-[#FF5500] hover:scale-110 transition-all shadow-lg shadow-gray-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FF5500]"></span>
              Shop
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/sneakers" className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all inline-block">Sneakers</Link></li>
              <li><Link to="/apparel" className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all inline-block">Apparel</Link></li>
              <li><Link to="/sale" className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all inline-block">Sale</Link></li>
            </ul>
          </div>

          {/* Account Links */}
          <div className="text-center md:text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FF5500]"></span>
              Account
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/profile" className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all inline-block">Profile</Link></li>
              <li><Link to="/cart" className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all inline-block">Cart</Link></li>
              <li><Link to="/wishlist" className="text-gray-500 hover:text-[#FF5500] hover:translate-x-1 transition-all inline-block">Wishlist</Link></li>
            </ul>
          </div>

          {/* Contact Section */}
          <div className="col-span-2 md:col-span-1 text-center md:text-left">
            <h3 className="text-xs font-bold text-gray-900 uppercase tracking-widest mb-4 flex items-center justify-center md:justify-start gap-2">
              <span className="w-1 h-1 rounded-full bg-[#FF5500]"></span>
              Contact
            </h3>

            {/* Phone Number */}
            <p className="text-sm text-gray-600 font-medium mb-3">+62 813-9246-0881</p>

            {/* WhatsApp Button - Simple */}
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white text-sm font-medium rounded-lg hover:bg-[#20bd5a] transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.017-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
              </svg>
              WhatsApp
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-gray-200/50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-400 flex items-center gap-2">
            <span>&copy; 2024 TrueKicks Indonesia</span>
            <span className="hidden sm:inline">•</span>
            <span className="hidden sm:inline">All rights reserved</span>
          </p>
          <div className="flex gap-4 text-xs">
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Privacy Policy</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
