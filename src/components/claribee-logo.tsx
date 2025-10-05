import { SVGProps } from 'react';

export function ClaribeeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      {/* Background */}
      <rect width="64" height="64" rx="12" fill="#FFD600"/>

      {/* Bee Body */}
      <ellipse cx="32" cy="32" rx="14" ry="10" fill="black"/>
      <line x1="18" y1="32" x2="46" y2="32" stroke="#FFD600" strokeWidth="2"/>
      <line x1="20" y1="28" x2="44" y2="28" stroke="#FFD600" strokeWidth="2"/>
      <line x1="20" y1="36" x2="44" y2="36" stroke="#FFD600" strokeWidth="2"/>

      {/* Bee Wings */}
      <ellipse cx="24" cy="22" rx="6" ry="4" fill="white" opacity="0.8"/>
      <ellipse cx="40" cy="22" rx="6" ry="4" fill="white" opacity="0.8"/>

      {/* Text */}
      <text x="32" y="55" fontFamily="Poppins, sans-serif" fontSize="14" fontWeight="bold" textAnchor="middle" fill="black">
        C
      </text>
    </svg>
  );
}
