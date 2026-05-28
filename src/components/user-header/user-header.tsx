import { useAuthStore } from '../../store/auth';

export const UserHeader = () => {
  const { userName, logout } = useAuthStore();

  return (
    <div className='flex justify-between items-center mb-6 px-1'>
      <p className='text-Neutral-0 text-sm md:text-base'>
        Hola, <span className='font-bold'>{userName || 'usuario'}</span>
      </p>
      <button
        onClick={logout}
        className='text-Orange-500 hover:text-Orange-700 text-sm font-bold cursor-pointer'
      >
        Cerrar sesión →
      </button>
    </div>
  );
};
