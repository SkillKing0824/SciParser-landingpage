'use client';

import { FaGoogle, FaLinkedin, FaAmazon } from "react-icons/fa";
import { SiSwiggy, SiIndeed } from "react-icons/si";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const icons = [
  { icon: FaGoogle, color: "#4285F4", label: "Google" },
  { icon: FaLinkedin, color: "#0A66C2", label: "LinkedIn" },
  { icon: SiSwiggy, color: "#FC8019", label: "Swiggy" },
  { icon: FaAmazon, color: "#FF9900", label: "Amazon" },
  { icon: SiIndeed, color: "#003A9B", label: "Indeed" },
];

export function OrbitingLogos({ className = "" }: { className?: string }) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : true;
  const radius = 80;

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Central Core (Optional glowing dot) */}
      <div className="w-8 h-8 rounded-full z-10 relative flex items-center justify-center"
           style={{ 
             background: 'radial-gradient(circle at 35% 35%, #6EF09C, #22C55E, #0a6630)', 
             boxShadow: '0 0 20px rgba(34,197,94,0.6)' 
           }}>
          <div className="w-2 h-2 rounded-full bg-white/60 absolute top-1.5 left-1.5 blur-[1px]" />
      </div>

      {/* Orbit Ring */}
      <div className="absolute inset-0 rounded-full border border-[#22C55E]/30" />
      <div className="absolute inset-2 rounded-full border border-[#22C55E]/10" />

      {/* Embedded style for the orbit keyframe to keep it self-contained */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes orbit-path {
          0% { transform: rotate(0deg) translateY(-${radius}px) rotate(0deg); }
          100% { transform: rotate(360deg) translateY(-${radius}px) rotate(-360deg); }
        }
      `}} />

      {/* Orbiting Icons */}
      {icons.map((item, i) => {
        const animationDelay = `-${(20 / icons.length) * i}s`;
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 w-10 h-10 -ml-5 -mt-5 flex items-center justify-center rounded-full shadow-lg"
            style={{
              animation: `orbit-path 20s linear infinite`,
              animationDelay,
              backgroundColor: isDark ? 'rgba(30, 41, 59, 0.8)' : 'rgba(255, 255, 255, 0.9)',
              border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)'}`,
              backdropFilter: 'blur(4px)',
            }}
          >
            <item.icon size={20} color={item.color} />
          </div>
        );
      })}
    </div>
  );
}
