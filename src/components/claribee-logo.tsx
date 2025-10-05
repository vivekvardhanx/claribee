import { SVGProps } from 'react';

export function ClaribeeLogo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" {...props}>
      <rect width="64" height="64" rx="12" fill="#FFD600" />
      <circle cx="32" cy="28" r="10" fill="black" />
      <path d="M22 38c4 6 16 6 20 0" stroke="black" strokeWidth="3" fill="none" />
      <path d="M20 24c6-10 18-10 24 0" stroke="black" strokeWidth="3" fill="none" />
      <text x="32" y="58" fontSize="12" fontWeight="bold" textAnchor="middle" fill="black">C</text>
    </svg>
  );
}
