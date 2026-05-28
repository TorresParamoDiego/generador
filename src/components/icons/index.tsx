interface IconProps {
  className?: string;
}

const base = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
};

export const IconHome = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M3 12l9-9 9 9' />
    <path d='M5 10v10a1 1 0 0 0 1 1h4v-6h4v6h4a1 1 0 0 0 1-1V10' />
  </svg>
);

export const IconCalendar = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <rect x='3' y='4' width='18' height='18' rx='2' />
    <line x1='16' y1='2' x2='16' y2='6' />
    <line x1='8' y1='2' x2='8' y2='6' />
    <line x1='3' y1='10' x2='21' y2='10' />
  </svg>
);

export const IconMapPin = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
    <circle cx='12' cy='10' r='3' />
  </svg>
);

export const IconUser = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2' />
    <circle cx='12' cy='7' r='4' />
  </svg>
);

export const IconDownload = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4' />
    <polyline points='7 10 12 15 17 10' />
    <line x1='12' y1='15' x2='12' y2='3' />
  </svg>
);

export const IconCode = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <polyline points='16 18 22 12 16 6' />
    <polyline points='8 6 2 12 8 18' />
  </svg>
);

export const IconLightbulb = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M9 18h6' />
    <path d='M10 22h4' />
    <path d='M12 2a7 7 0 0 0-4 12.7c.9.8 1.5 1.4 1.5 2.3v1h5v-1c0-.9.6-1.5 1.5-2.3A7 7 0 0 0 12 2z' />
  </svg>
);

export const IconPeople = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
);

export const IconTrophy = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M8 21h8' />
    <path d='M12 17v4' />
    <path d='M7 4h10v5a5 5 0 0 1-10 0V4z' />
    <path d='M17 4h3a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-2' />
    <path d='M7 4H4a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3h2' />
  </svg>
);

export const IconClock = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='10' />
    <polyline points='12 6 12 12 16 14' />
  </svg>
);

export const IconMail = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M4 4h16c1 0 2 1 2 2v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2z' />
    <polyline points='22 6 12 13 2 6' />
  </svg>
);

export const IconPhone = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z' />
  </svg>
);

export const IconGlobe = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <circle cx='12' cy='12' r='10' />
    <line x1='2' y1='12' x2='22' y2='12' />
    <path d='M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z' />
  </svg>
);

export const IconCoffee = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M18 8h1a4 4 0 0 1 0 8h-1' />
    <path d='M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z' />
    <line x1='6' y1='1' x2='6' y2='4' />
    <line x1='10' y1='1' x2='10' y2='4' />
    <line x1='14' y1='1' x2='14' y2='4' />
  </svg>
);

export const IconMic = ({ className = 'w-5 h-5' }: IconProps) => (
  <svg {...base} className={className}>
    <path d='M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z' />
    <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
    <line x1='12' y1='19' x2='12' y2='23' />
    <line x1='8' y1='23' x2='16' y2='23' />
  </svg>
);
