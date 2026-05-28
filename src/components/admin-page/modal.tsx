import type { ReactNode } from 'react';

interface Props {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}

export const Modal = ({ open, title, onClose, children }: Props) => {
  if (!open) return null;

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4'
      onClick={onClose}
    >
      <div
        className='bg-Neutral-900 border border-Neutral-700 rounded-2xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        <div className='flex justify-between items-center mb-5'>
          <h2 className='text-2xl font-bold text-Neutral-0'>{title}</h2>
          <button
            onClick={onClose}
            className='text-Neutral-500 hover:text-Orange-500 text-2xl cursor-pointer leading-none'
            aria-label='Cerrar'
          >
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};
