import React, { useState, useEffect } from 'react';
import { Shield } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export function Login({ onLogin }: LoginProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false);
      onLogin();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onLogin]);

  return (
    <div className="min-h-screen bg-[#111E29] flex items-center justify-center relative overflow-hidden">
      {/* Animated Curved Lines */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute h-[200px] w-[2000px]"
            style={{
              top: `${i * 15}%`,
              left: '-50%',
              background: `linear-gradient(90deg, transparent, rgba(255, 107, 44, ${0.05 + (i * 0.01)}), transparent)`,
              transform: `rotate(${i % 2 ? -3 : 3}deg) translateY(${Math.sin(i) * 20}px)`,
              animation: `wave ${15 + i * 2}s infinite linear`,
              animationDelay: `${i * 0.2}s`
            }}
          />
        ))}
      </div>

      {/* Loading Content */}
      <div className="relative z-10 text-center">
        <Shield className={`w-24 h-24 text-[#FF6B2C] mx-auto ${isLoading ? 'animate-pulse' : ''}`} />
        <h2 className="text-2xl font-bold text-white mt-6">CyberGuard</h2>
        <div className="mt-4 flex items-center justify-center space-x-2">
          <div className="w-2 h-2 bg-[#FF6B2C] rounded-full animate-bounce" />
          <div className="w-2 h-2 bg-[#FF6B2C] rounded-full animate-bounce delay-100" />
          <div className="w-2 h-2 bg-[#FF6B2C] rounded-full animate-bounce delay-200" />
        </div>
      </div>
    </div>
  );
}