"use client";

import * as React from "react";

interface LoaderProps {
  size?: number; 
  text?: string;
}

export const AiLoader: React.FC<LoaderProps> = ({ size = 180, text = "LOADING..." }) => {
  const letters = text.split("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-b from-[#0B0F0D] via-[#050807] to-black backdrop-blur-md">
      <div
        className="relative flex items-center justify-center font-mono font-bold tracking-widest select-none text-[#22C55E]"
        style={{ width: size, height: size }}
      >
       
        {letters.map((letter, index) => (
          <span
            key={index}
            className="inline-block text-[#22C55E] opacity-40 animate-loaderLetter drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {letter}
          </span>
        ))}

        <div
          className="absolute inset-0 rounded-full animate-loaderCircle"
        ></div>
      </div>

      <style jsx>{`
        @keyframes loaderCircle {
          0% {
            transform: rotate(90deg);
            box-shadow:
              0 6px 12px 0 #4ade80 inset,
              0 12px 18px 0 #22c55e inset,
              0 36px 36px 0 #15803d inset,
              0 0 3px 1.2px rgba(74, 222, 128, 0.3),
              0 0 6px 1.8px rgba(34, 197, 94, 0.2);
          }
          50% {
            transform: rotate(270deg);
            box-shadow:
              0 6px 12px 0 #86efac inset,
              0 12px 6px 0 #10b981 inset,
              0 24px 36px 0 #047857 inset,
              0 0 3px 1.2px rgba(74, 222, 128, 0.3),
              0 0 6px 1.8px rgba(34, 197, 94, 0.2);
          }
          100% {
            transform: rotate(450deg);
            box-shadow:
              0 6px 12px 0 #4ade80 inset,
              0 12px 18px 0 #22c55e inset,
              0 36px 36px 0 #15803d inset,
              0 0 3px 1.2px rgba(74, 222, 128, 0.3),
              0 0 6px 1.8px rgba(34, 197, 94, 0.2);
          }
        }

        @keyframes loaderLetter {
          0%,
          100% {
            opacity: 0.3;
            transform: translateY(0);
          }
          20% {
            opacity: 1;
            transform: scale(1.15);
            text-shadow: 0 0 12px rgba(34,197,94,1);
          }
          40% {
            opacity: 0.5;
            transform: translateY(0);
          }
        }

        .animate-loaderCircle {
          animation: loaderCircle 3s linear infinite;
        }

        .animate-loaderLetter {
          animation: loaderLetter 2s infinite;
        }
      `}</style>
    </div>
  );
};
