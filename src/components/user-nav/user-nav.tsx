
import { useAuthStore } from '../../store/auth';
import { useUserViewStore, type UserView } from '../../store/user-view';
import {
  IconHome,
  IconCalendar,
  IconMapPin,
  IconUser,
} from '../icons';

interface NavItem {
  id: UserView;
  label: string;
  Icon: React.ComponentType<{ className?: string }>;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Inicio', Icon: IconHome },
  { id: 'conference', label: 'Conferencia', Icon: IconCalendar },
  { id: 'venue', label: 'Sede', Icon: IconMapPin },
  { id: 'account', label: 'Mi cuenta', Icon: IconUser },
];

export const UserNav = () => {
  const userName = useAuthStore((s) => s.userName);
  const view = useUserViewStore((s) => s.view);
  const setView = useUserViewStore((s) => s.setView);
  const handleLogout = () => {
    useAuthStore.getState().logout();
  };

  return (
    <header className='mb-8'>
      <div className='flex justify-between items-center mb-4 px-1'>
        <p className='text-Neutral-0 text-sm md:text-base'>
          Hola, <span className='font-bold'>{userName || 'usuario'}</span>
        </p>
        <button
          type='button'
          onClick={handleLogout}
          className='text-Orange-500 hover:text-Orange-700 text-sm font-bold cursor-pointer'
        >
          Cerrar sesión →
        </button>
      </div>

      <nav className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-1.5 flex gap-1 overflow-x-auto'>
        {NAV_ITEMS.map(({ id, label, Icon }) => {
          const active = view === id;
          return (
            <button
              key={id}
              onClick={() => setView(id)}
              className={`flex-1 min-w-fit flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-bold transition-colors cursor-pointer whitespace-nowrap ${
                active
                  ? 'bg-Orange-700 text-Neutral-900'
                  : 'text-Neutral-500 hover:text-Neutral-0 hover:bg-Neutral-900/60'
              }`}
            >
              <Icon className='w-4 h-4' />
              {label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
