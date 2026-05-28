import type { ComponentType } from 'react';

interface Props {
  label: string;
  value: string | number;
  Icon: ComponentType<{ className?: string }>;
  accent?: boolean;
}

export const StatCard = ({ label, value, Icon, accent = false }: Props) => {
  return (
    <div
      className={`flex-1 rounded-2xl p-5 border ${
        accent
          ? 'bg-gradient-to-br from-Orange-500 to-Orange-700 border-Orange-500 text-Neutral-900'
          : 'bg-Neutral-900/40 border-Neutral-700 text-Neutral-0'
      }`}
    >
      <div className='flex items-center justify-between mb-3'>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${
            accent
              ? 'bg-Neutral-900/15 text-Neutral-900'
              : 'bg-Orange-500/15 text-Orange-500'
          }`}
        >
          <Icon className='w-6 h-6' />
        </div>
        <span
          className={`text-xs uppercase tracking-wider ${
            accent ? 'text-Neutral-900/80' : 'text-Neutral-500'
          }`}
        >
          {label}
        </span>
      </div>
      <p className='text-4xl font-bold'>{value}</p>
    </div>
  );
};
