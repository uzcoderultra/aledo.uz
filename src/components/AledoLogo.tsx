import React from 'react';

interface AledoLogoProps {
  className?: string;
  height?: number | string;
  showBadge?: boolean;
  variant?: 'white' | 'gold' | 'lime';
}

export const AledoLogo: React.FC<AledoLogoProps> = ({
  className = '',
  height = 38,
  showBadge = true,
  variant = 'white',
}) => {
  // Solid color mapping matching the architectural website design
  const textColor = variant === 'gold' ? '#E8C45A' : variant === 'lime' ? '#D4E137' : '#FFFFFF';
  const degreeColor = variant === 'gold' ? '#FFFFFF' : '#E8C45A';

  return (
    <div className={`inline-flex items-center gap-0.5 select-none ${className}`}>
      {/* Official ALEDO Vector Logo (°aledo) with crisp solid color typography */}
      <svg
        style={{ height: typeof height === 'number' ? `${height}px` : height }}
        viewBox="0 0 186 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-auto transition-all duration-300"
        aria-label="ALEDO Architectural Lighting"
      >
        {/* Superscript Kelvin / Degree Symbol (°) representing light color temperature */}
        <circle
          cx="11"
          cy="18"
          r="8"
          stroke={degreeColor}
          strokeWidth="4.5"
          fill="none"
          className="transition-all duration-300 group-hover:drop-shadow-[0_0_10px_rgba(232,196,90,0.9)]"
        />

        {/* Official Solid Lowercase Typography "aledo" */}
        <text
          x="26"
          y="56"
          fill={textColor}
          fontFamily="system-ui, -apple-system, 'Plus Jakarta Sans', 'Inter', sans-serif"
          fontSize="64"
          fontWeight="700"
          letterSpacing="-3.5"
          className="transition-colors duration-300"
        >
          aledo
        </text>
      </svg>

      {showBadge && (
        <span className="text-[10px] xl:text-[11px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded border border-[#E8C45A]/40 text-[#E8C45A] bg-[#E8C45A]/10 font-mono hidden sm:inline-flex items-center shrink-0 whitespace-nowrap shadow-sm transition-all duration-300 group-hover:border-[#E8C45A] group-hover:bg-[#E8C45A]/20">
          UZ
        </span>
      )}
    </div>
  );
};


