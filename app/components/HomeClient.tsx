'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="#4f46e5" emissive="#4f46e5" emissiveIntensity={0.8} roughness={0.2} metalness={0.8} />
    </mesh>
  );
}

function formatXtri(amount: number) {
  const xtri = amount * 10000;
  return xtri < 1000000 ? xtri.toLocaleString() : '1,000,000+';
}

function formatCountdown(targetDate: Date) {
  const now = new Date().getTime();
  const distance = targetDate.getTime() - now;
  if (distance <= 0) return 'Presale ended';

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}

export default function Home() {
  const [bnbAmount, setBnbAmount] = useState(0.1);
  const [bnbRate, setBnbRate] = useState(600); // fallback default
  const [countdown, setCountdown] = useState('');
  const [showPopup, setShowPopup] = useState(true);

  useEffect(() => {
    const fetchBNBRate = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd');
        const data = await res.json();
        setBnbRate(data.binancecoin.usd);
      } catch (err) {
        console.error('Failed to fetch BNB price:', err);
      }
    };
    fetchBNBRate();

    const interval = setInterval(() => {
      const target = new Date('2025-07-15T00:00:00');
      setCountdown(formatCountdown(target));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const aprYear = 72;
  const aprMonth = aprYear / 12;
  const ambassadorFeeBNB = (200 / bnbRate).toFixed(4);

  const handleJoinClick = () => {
    const el = document.getElementById('ambassador');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setShowPopup(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0f0f1c] to-black text-white font-sans relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.2)_0%,transparent_70%)] animate-pulse"></div>
      </div>

      {/* Floating light streaks */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-32 bg-indigo-500 opacity-10 animate-slide"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          ></div>
        ))}
      </div>

      <style jsx>{`
        @keyframes slide {
          0% { transform: translateY(0); opacity: 0; }
          50% { opacity: 0.3; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-slide {
          animation: slide 10s linear infinite;
        }
      `}</style>

      {/* Ambassador Popup */}
      {showPopup && (
        <div className="fixed top-0 left-0 w-full h-full bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-[#151522] p-8 rounded-xl text-center shadow-xl max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Become a Xentari Ambassador</h3>
            <p className="text-gray-400 mb-6">
              Join for <strong>{ambassadorFeeBNB} BNB</strong> (~$200) and unlock referral rewards + {aprYear}% APR staking.
            </p>
            <button onClick={handleJoinClick} className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded-xl font-semibold">
              Join Now
            </button>
          </div>
        </div>
      )}

      {/* Navigation */}
      <header className="flex justify-between items-center px-6 py-4 border-b border-white/10 z-10 relative">
        <h1 className="text-2xl font-extrabold text-indigo-400">Xentari</h1>
        <nav className="hidden md:flex space-x-6 text-sm">
          <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
          <a href="#about" className="text-gray-300 hover:text-white transition">About</a>
          <a href="#contact" className="text-gray-300 hover:text-white transition">Contact</a>
          <a href="#ambassador" className="text-gray-300 hover:text-white transition">Ambassador</a>
        </nav>
        <button className="bg-indigo-600 hover:bg-indigo-700 transition px-5 py-2 rounded-xl text-sm font-semibold">
          Join Presale
        </button>
      </header>

      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center px-8 md:px-20 mt-24 relative z-10">
        <div className="space-y-6">
          <motion.h2 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} className="text-5xl font-extrabold leading-tight">
            Experience <br />The Power of Xentari
          </motion.h2>
          <p className="text-gray-400 max-w-md text-lg">
            Dive into our AI-driven ecosystem and discover how Xentari is shaping the future of blockchain utility.
          </p>
          <div className="text-sm text-gray-400">Presale ends in <span className="text-white font-semibold">{countdown}</span></div>
        </div>

        <div className="h-[400px] md:h-[500px]">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <Sphere />
            <OrbitControls enableZoom={false} enablePan={false} />
          </Canvas>
        </div>
      </section>

      {/* Remaining content... */}

    </main>
  );
}










