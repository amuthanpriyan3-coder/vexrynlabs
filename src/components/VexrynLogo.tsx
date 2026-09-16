import React from 'react';

interface VexrynLogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
  animated?: boolean;
}

export const VexrynLogo: React.FC<VexrynLogoProps> = ({
  className = '',
  size = 36,
  showText = false,
  animated = false,
}) => {
  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Geometric V Logo Icon */}
      <div 
        className={`relative flex items-center justify-center shrink-0 ${animated ? 'transition-transform duration-300 hover:scale-105' : ''}`}
        style={{ width: size, height: size }}
      >
        <svg
          viewBox="0 0 500 500"
          width="100%"
          height="100%"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="overflow-visible"
        >
          {/* Main V Structure in Stark White */}
          <path
            d="M 90 140 L 205 140 L 250 250 L 295 140 L 410 140 L 255 375 L 250 375 L 245 370 Z"
            fill="#FFFFFF"
          />

          {/* Aerodynamic razor cut groove on left wing */}
          <path
            d="M 152 195 Q 165 235 246 372 L 240 376 Q 150 240 140 190 Z"
            fill="#050505"
          />
          {/* Separate outer blade sliver */}
          <path
            d="M 139 190 Q 155 240 244 376 L 240 379 Q 130 230 135 186 Z"
            fill="#FFFFFF"
          />

          {/* Inner dark trench framing the lime triangle */}
          <path
            d="M 205 140 L 250 205 L 295 140 L 305 140 L 250 220 L 195 140 Z"
            fill="#050505"
          />

          {/* Core Inverted Triangle in signature Neon Lime */}
          <polygon
            points="207,140 293,140 250,203"
            fill="#CCFF00"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className="font-display font-extrabold tracking-wider text-white text-lg sm:text-xl">
              VEXRYN
            </span>
            <span className="font-display font-light tracking-widest text-[#CCFF00] text-lg sm:text-xl">
              LABS
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.25em] text-[#888888] uppercase mt-0.5">
            STUDIO
          </span>
        </div>
      )}
    </div>
  );
};
