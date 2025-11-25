import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

// Import Icons
import googleIcon from "../assets/google-icon.png"; 
import facebookIcon from "../assets/facebook-icon.png"; 
import twitterIcon from "../assets/twitter-icon.png"; 

export default function Login() {
  const navigate = useNavigate();
  
  // State Form
  const [activeTab, setActiveTab] = useState("login"); 
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(""); 

 // === FUNGSI UTAMA LOGIN & REGISTER (SUDAH DINAMIS) ===
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(""); 

    try {
      // 1. Ambil URL Backend dari Environment Variable
      const API_URL = import.meta.env.VITE_API_BASE_URL;

      if (activeTab === "signup") {
        // --- LOGIC REGISTER ---
        // Ganti hardcoded localhost dengan variable API_URL
        const response = await axios.post(`${API_URL}/api/register`, {
          full_name: fullName,
          email: email,
          password: password
        });

        alert("Registrasi Berhasil! Silakan Login.");
        setActiveTab("login"); 
        setEmail("");
        setPassword("");

      } else {
        // --- LOGIC LOGIN ---
        // Ganti hardcoded localhost dengan variable API_URL
        const response = await axios.post(`${API_URL}/api/login`, {
          email: email,
          password: password
        });

        // Simpan data user di LocalStorage
        localStorage.setItem("user", JSON.stringify(response.data.user));
        
        // Pindah ke Home
        navigate("/home");
      }

    } catch (error) {
      if (error.response) {
        setErrorMsg(error.response.data.message);
      } else {
        setErrorMsg("Terjadi kesalahan jaringan.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // === FUNGSI GUEST MODE BARU ===
  const handleGuestLogin = () => {
    // Menghapus data sesi yang mungkin tersisa (penting untuk Guest Mode)
    localStorage.removeItem("user");
    // Langsung navigasi tanpa autentikasi
    navigate("/home"); 
  };


  return (
    <div className="min-h-screen flex items-center justify-center font-poppins bg-[#FAFAFA] px-4">
      
      <div className="w-full max-w-[420px]">
        
        {/* LOGO */}
        <div className="mb-8 text-center">
          <h1 className="text-5xl font-black italic tracking-tighter text-gray-900 select-none">
            TRUE<span className="text-[#FF5500]">KICKS</span>
          </h1>
          <p className="text-gray-400 text-sm mt-2 font-medium tracking-wide">
            Welcome back to the game.
          </p>
        </div>

        {/* CARD CONTAINER */}
        <div className="w-full bg-white rounded-3xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100">
          
          {/* TAB SWITCHER */}
          <div className="flex mb-6 relative">
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gray-200"></div>
            <button
              onClick={() => { setActiveTab("signup"); setErrorMsg(""); }}
              className={`w-1/2 pb-3 text-base font-bold transition-all relative ${
                activeTab === "signup" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Sign Up
              {activeTab === "signup" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full"></div>}
            </button>
            <button
              onClick={() => { setActiveTab("login"); setErrorMsg(""); }}
              className={`w-1/2 pb-3 text-base font-bold transition-all relative ${
                activeTab === "login" ? "text-gray-900" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              Log In
              {activeTab === "login" && <div className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-full"></div>}
            </button>
          </div>

          {/* PESAN ERROR (Muncul jika gagal login/register) */}
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-100 text-red-500 text-xs rounded-lg font-medium text-center">
              {errorMsg}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Input Nama (Sign Up Only) */}
            {activeTab === "signup" && (
              <div className="space-y-1.5 animate-fade-in-up">
                <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Full Name</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black focus:bg-white transition-all text-sm font-medium"
                  placeholder="e.g. Jordan Peterson"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </div>
            )}

            {/* Input Email */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Email Address</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black focus:bg-white transition-all text-sm font-medium"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Input Password */}
            <div className="space-y-1.5 relative">
              <label className="text-xs font-bold text-gray-700 ml-1 uppercase tracking-wider">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-black focus:bg-white transition-all text-sm font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black transition-colors"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Tombol Aksi */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-sm hover:bg-gray-800 hover:shadow-lg transition-all active:scale-[0.98] flex justify-center items-center gap-2 mt-4 shadow-lg shadow-black/20"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                activeTab === "login" ? "Log In" : "Sign Up"
              )}
            </button>
            
            {/* Divider and Social Icons (Untuk styling) */}
            <div className="relative flex items-center py-4">
              <div className="flex-grow border-t border-gray-200"></div>
              <span className="flex-shrink mx-4 text-gray-400 text-[10px] font-bold uppercase tracking-widest">Or continue with</span>
              <div className="flex-grow border-t border-gray-200"></div>
            </div>

            <div className="flex justify-center gap-4">
              {[
                { icon: googleIcon, alt: "Google" },
                { icon: facebookIcon, alt: "Facebook" },
                { icon: twitterIcon, alt: "Twitter" },
              ].map((social, index) => (
                <button 
                  key={index}
                  type="button" 
                  className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-300 transform hover:-translate-y-1 bg-white"
                >
                  <img src={social.icon} alt={social.alt} className="w-5 h-5" />
                </button>
              ))}
            </div>

            {/* Text Login/Sign up switch */}
            <div className="text-center mt-4">
              <p className="text-xs text-gray-600">
                {activeTab === "login" ? "Need an account?" : "Already have an account?"}{' '}
                <button 
                  type="button"
                  onClick={() => { setActiveTab(activeTab === "login" ? "signup" : "login"); setErrorMsg(""); }}
                  className="text-[#FF5500] font-bold hover:underline ml-1"
                >
                  {activeTab === "login" ? "Sign Up" : "Log In"}
                </button>
              </p>
            </div>

          </form>
        </div>
        
{/* === GUEST MODE BUTTON BARU === */}
<div className="mt-8 text-center">
    <button
        onClick={handleGuestLogin}
        className="w-full max-w-xs mx-auto flex items-center justify-center gap-3 
        bg-white border border-gray-300 shadow-sm 
        hover:shadow-md hover:border-gray-400 
        text-gray-800 font-semibold 
        px-5 py-3 rounded-xl 
        transition-all duration-300 
        hover:-translate-y-0.5 active:scale-95"
    >
        <span className="tracking-wide">Continue as Guest</span>

        {/* Ikon lebih modern (lucide-react) */}
        <svg 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            className="w-5 h-5 transition-transform group-hover:translate-x-1"
        >
            <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
    </button>
</div>


      </div>
    </div>
  );
}