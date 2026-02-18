import type { ComponentProps } from 'react';

export function SiteLogo(props: ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 220 52" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden {...props}>
      <g fill="currentColor">
        <rect x="4" y="22" width="10" height="8" rx="4" />
        <rect x="18" y="22" width="10" height="8" rx="4" />
        <rect x="32" y="22" width="10" height="8" rx="4" />
        <rect x="20" y="10" width="48" height="8" rx="4" />
        <rect x="34" y="34" width="34" height="8" rx="4" />
      </g>
      <text x="76" y="38" fontSize="44" fontWeight="700" fontFamily="Inter, Arial, sans-serif" fill="currentColor">
        Elexvx
      </text>
    </svg>
  );
}
