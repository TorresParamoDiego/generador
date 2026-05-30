import { useEffect, useState } from 'react';
import { useAuthStore } from '../../store/auth';
import { StatCard } from './stat-card';
import { TicketsTable } from './tickets-table';
import { UsersTable } from './users-table';
import { IconUsers, IconTicket, IconCalendar, IconSparkle } from './icons';
import { API_URL } from '../../config';

interface Stats {
  totalUsuarios: number;
  totalTickets: number;
  ticketsHoy: number;
  ultimoUsuario: { name: string; email: string } | null;
}

type Tab = 'tickets' | 'usuarios';

export const AdminPage = () => {
  const userName = useAuthStore((s) => s.userName);
  const [stats, setStats] = useState<Stats | null>(null);
  const [tab, setTab] = useState<Tab>('tickets');

  const handleLogout = () => {
    useAuthStore.getState().logout();
  };

  const fetchStats = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/stats`);
      const json = await res.json();
      setStats(json);
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchStats();
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className='mx-auto pb-[76px] max-w-6xl'>
      {/* Header */}
      <div className='flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4'>
        <div>
          <div className='inline-block bg-Orange-500 text-Neutral-900 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2'>
            Panel de Administrador
          </div>
          <h1 className='text-3xl md:text-4xl font-bold text-Neutral-0'>
            Hola, {userName}
          </h1>
          <p className='text-Neutral-500'>
            Tienes el control total del sistema desde aquí
          </p>
        </div>
        <button
          type='button'
          onClick={handleLogout}
          className='px-5 py-3 bg-Neutral-900/40 border border-Neutral-700 rounded-xl text-Neutral-0 hover:bg-Orange-500 hover:text-Neutral-900 hover:border-Orange-500 transition-colors cursor-pointer font-bold'
        >
          Cerrar sesión
        </button>
      </div>

      {/* Stats */}
      <div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
        <StatCard
          label='Usuarios'
          value={stats?.totalUsuarios ?? '...'}
          Icon={IconUsers}
        />
        <StatCard
          label='Tickets'
          value={stats?.totalTickets ?? '...'}
          Icon={IconTicket}
          accent
        />
        <StatCard
          label='Hoy'
          value={stats?.ticketsHoy ?? '...'}
          Icon={IconCalendar}
        />
        <StatCard
          label='Último registro'
          value={stats?.ultimoUsuario?.name?.split(' ')[0] ?? '—'}
          Icon={IconSparkle}
        />
      </div>

      {/* Tabs */}
      <div className='flex gap-2 mb-5 border-b border-Neutral-700'>
        <button
          onClick={() => setTab('tickets')}
          className={`flex items-center gap-2 px-5 py-3 font-bold transition-colors cursor-pointer border-b-2 ${
            tab === 'tickets'
              ? 'text-Orange-500 border-Orange-500'
              : 'text-Neutral-500 border-transparent hover:text-Neutral-0'
          }`}
        >
          <IconTicket className='w-5 h-5' />
          Tickets
        </button>
        <button
          onClick={() => setTab('usuarios')}
          className={`flex items-center gap-2 px-5 py-3 font-bold transition-colors cursor-pointer border-b-2 ${
            tab === 'usuarios'
              ? 'text-Orange-500 border-Orange-500'
              : 'text-Neutral-500 border-transparent hover:text-Neutral-0'
          }`}
        >
          <IconUsers className='w-5 h-5' />
          Usuarios
        </button>
      </div>

      {/* Content */}
      <div className='bg-Neutral-900/20 border border-Neutral-700 rounded-2xl p-6'>
        {tab === 'tickets' ? <TicketsTable /> : <UsersTable />}
      </div>
    </section>
  );
};
