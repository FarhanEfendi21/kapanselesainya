import React from "react";
import adizero from "../assets/adizero.png";
import asics2 from "../assets/asics-2.png";
import backGround from "../assets/backGround.png";

const BackInBlackBanner = ({ onScrollToProducts }) => {
    return (
        <div
            className="relative rounded-2xl md:rounded-3xl p-8 md:p-16 mb-8 md:mb-12 overflow-hidden min-h-[280px] md:min-h-[380px] lg:min-h-[420px] group"
            style={{ backgroundImage: `url(${backGround})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
        >
            {/* Dark Overlay with gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40"></div>

            {/* Animated Grid Lines */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </div>

            {/* Left Sneaker - Larger */}
            <div className="absolute left-0 md:left-4 lg:left-12 top-1/2 -translate-y-1/2 w-[140px] md:w-[240px] lg:w-[300px] animate-float-slow">
                <svg className="absolute inset-0 w-full h-full scale-150 opacity-80 animate-pulse-slow" viewBox="0 0 100 100" fill="white">
                    <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
                </svg>
                <img
                    src={adizero}
                    alt="Adizero Sneaker"
                    className="relative z-10 w-full object-contain rotate-[-12deg] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)]"
                />
            </div>

            {/* Right Sneaker - Larger */}
            <div className="absolute right-0 md:right-4 lg:right-12 top-1/2 -translate-y-1/2 w-[140px] md:w-[240px] lg:w-[300px] animate-float-slow-reverse">
                <svg className="absolute inset-0 w-full h-full scale-150 opacity-80 animate-pulse-slow" viewBox="0 0 100 100" fill="white">
                    <polygon points="50,0 61,35 97,35 68,57 79,91 50,70 21,91 32,57 3,35 39,35" />
                </svg>
                <img
                    src={asics2}
                    alt="Asics Sneaker"
                    className="relative z-10 w-full object-contain rotate-[12deg] drop-shadow-[0_25px_50px_rgba(0,0,0,0.5)] scale-x-[-1]"
                />
            </div>

            {/* Center Content - Enhanced Typography */}
            <div className="relative z-20 text-center flex flex-col items-center justify-center h-full py-8 md:py-12">
                {/* Brand Tag */}
                <div className="animate-slide-down opacity-0" style={{ animationDelay: '0.1s', animationFillMode: 'forwards' }}>
                    <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-sm rounded-full text-white text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-4 border border-white/20">
                        ✦ TrueKicks Exclusive ✦
                    </span>
                </div>

                {/* Main Title - Bigger */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-black text-white tracking-tighter leading-[0.9] mb-4 md:mb-6 drop-shadow-[0_4px_20px_rgba(0,0,0,0.8)] animate-slide-down opacity-0" style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
                    BACK IN<br className="md:hidden" />
                    <span className="relative inline-block">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 via-white to-gray-200 animate-shimmer">BLACK</span>
                        <span className="absolute -inset-1 bg-white/10 blur-xl rounded-lg -z-10"></span>
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-gray-200 text-sm md:text-base lg:text-lg mb-6 max-w-lg font-light tracking-wide animate-slide-down opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
                    Stealth mode activated. Premium black collection.
                </p>

                {/* CTA Button - Enhanced */}
                <button
                    onClick={onScrollToProducts}
                    className="group/btn relative bg-white text-gray-900 font-bold text-sm md:text-base px-8 py-3 md:px-10 md:py-4 rounded-full hover:bg-gray-100 active:scale-95 transition-all duration-300 animate-slide-up opacity-0 overflow-hidden"
                    style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}
                >
                    <span className="relative z-10 flex items-center gap-2">
                        EXPLORE COLLECTION
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-4 h-4 transition-transform group-hover/btn:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                    </span>
                    <span className="absolute inset-0 bg-gradient-to-r from-gray-100 to-white opacity-0 group-hover/btn:opacity-100 transition-opacity"></span>
                </button>
            </div>

            {/* Decorative Elements */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 opacity-50">
                <div className="w-8 h-[1px] bg-white/50"></div>
                <span className="text-white/60 text-[10px] tracking-[0.3em] uppercase font-medium">Limited Edition</span>
                <div className="w-8 h-[1px] bg-white/50"></div>
            </div>

            {/* CSS Animations */}
            <style>{`
                @keyframes float-slow {
                    0%, 100% { transform: translateY(-50%) translateX(0); }
                    50% { transform: translateY(-50%) translateX(-8px) translateY(-12px); }
                }
                @keyframes float-slow-reverse {
                    0%, 100% { transform: translateY(-50%) translateX(0); }
                    50% { transform: translateY(-50%) translateX(8px) translateY(-12px); }
                }
                @keyframes slide-down {
                    from { opacity: 0; transform: translateY(-30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes slide-up {
                    from { opacity: 0; transform: translateY(30px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes pulse-slow {
                    0%, 100% { opacity: 0.8; transform: scale(1.5); }
                    50% { opacity: 0.6; transform: scale(1.55); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .animate-float-slow { animation: float-slow 5s ease-in-out infinite; }
                .animate-float-slow-reverse { animation: float-slow-reverse 5s ease-in-out infinite; }
                .animate-slide-down { animation: slide-down 0.8s ease-out; }
                .animate-slide-up { animation: slide-up 0.8s ease-out; }
                .animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
                .animate-shimmer { 
                    background-size: 200% auto;
                    animation: shimmer 3s linear infinite;
                }
            `}</style>
        </div>
    );
};

export default BackInBlackBanner;
