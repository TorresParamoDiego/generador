interface IconProps {
  className?: string;
}

export const IconUsers = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2' />
    <circle cx='9' cy='7' r='4' />
    <path d='M23 21v-2a4 4 0 0 0-3-3.87' />
    <path d='M16 3.13a4 4 0 0 1 0 7.75' />
  </svg>
);

export const IconTicket = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z' />
    <path d='M13 5v2' />
    <path d='M13 17v2' />
    <path d='M13 11v2' />
  </svg>
);

export const IconCalendar = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <rect x='3' y='4' width='18' height='18' rx='2' ry='2' />
    <line x1='16' y1='2' x2='16' y2='6' />
    <line x1='8' y1='2' x2='8' y2='6' />
    <line x1='3' y1='10' x2='21' y2='10' />
    <path d='M8 14h2v2H8z' fill='currentColor' stroke='none' />
  </svg>
);

export const IconSparkle = ({ className = 'w-7 h-7' }: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    className={className}
  >
    <path d='M12 3v3' />
    <path d='M12 18v3' />
    <path d='M5.6 5.6l2.1 2.1' />
    <path d='M16.3 16.3l2.1 2.1' />
    <path d='M3 12h3' />
    <path d='M18 12h3' />
    <path d='M5.6 18.4l2.1-2.1' />
    <path d='M16.3 7.7l2.1-2.1' />
    <circle cx='12' cy='12' r='3' fill='currentColor' stroke='none' />
  </svg>
);
