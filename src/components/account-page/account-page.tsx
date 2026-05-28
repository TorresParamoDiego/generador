import { useEffect, useRef, useState } from 'react';
import html2canvas from 'html2canvas';
import { useAuthStore } from '../../store/auth';
import { useUserViewStore } from '../../store/user-view';
import { Ticket } from '../confirmation-page/ticket';
import { CONFERENCE } from '../../data/conference';
import { IconUser, IconMail, IconDownload, IconCalendar } from '../icons';

interface TicketRow {
  id: number;
  num_ticket: number;
  date: string;
}

interface ProfileData {
  usuario: {
    id: number;
    name: string;
    email: string;
    github: string | null;
    date: string;
  };
  tickets: TicketRow[];
}

export const AccountPage = () => {
  const { userId, userName, userEmail } = useAuthStore();
  const setView = useUserViewStore((s) => s.setView);
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<TicketRow | null>(null);
  const ticketRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }
    fetch(`http://localhost:3000/api/usuarios/${userId}/tickets`)
      .then((r) => r.json())
      .then((d) => {
        setData(d);
        if (d.tickets && d.tickets.length > 0) setSelected(d.tickets[0]);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [userId]);

  const handleDownload = async () => {
    if (!ticketRef.current) return;
    setDownloading(true);
    try {
      const canvas = await html2canvas(ticketRef.current, {
        backgroundColor: null,
        scale: 2,
        useCORS: true,
      });
      const link = document.createElement('a');
      link.download = `ticket_${selected?.num_ticket ?? 'usuario'}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } catch {
      alert('No se pudo descargar el ticket');
    } finally {
      setDownloading(false);
    }
  };

  return (
    <section className='pb-12'>
      {/* Profile card */}
      <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-3xl p-6 md:p-8 mb-6'>
        <div className='flex items-center gap-5 mb-6'>
          <div className='w-20 h-20 rounded-2xl bg-gradient-to-br from-Orange-500 to-Orange-700 text-Neutral-900 flex items-center justify-center text-3xl font-extrabold flex-shrink-0'>
            {userName?.charAt(0)?.toUpperCase() || '?'}
          </div>
          <div>
            <p className='text-Neutral-500 text-xs uppercase tracking-wider mb-1'>
              Mi cuenta
            </p>
            <h1 className='text-2xl md:text-3xl font-extrabold text-Neutral-0'>
              {userName}
            </h1>
            <p className='text-Neutral-300 text-sm'>{userEmail}</p>
          </div>
        </div>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-3'>
          <div className='flex items-center gap-3 bg-Neutral-900/50 rounded-xl p-3'>
            <div className='w-9 h-9 rounded-lg bg-Orange-500/15 text-Orange-500 flex items-center justify-center'>
              <IconUser className='w-4 h-4' />
            </div>
            <div>
              <p className='text-Neutral-500 text-xs'>GitHub</p>
              <p className='text-Neutral-0 text-sm font-bold'>
                {data?.usuario?.github || '—'}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-Neutral-900/50 rounded-xl p-3'>
            <div className='w-9 h-9 rounded-lg bg-Orange-500/15 text-Orange-500 flex items-center justify-center'>
              <IconCalendar className='w-4 h-4' />
            </div>
            <div>
              <p className='text-Neutral-500 text-xs'>Miembro desde</p>
              <p className='text-Neutral-0 text-sm font-bold'>
                {data?.usuario?.date
                  ? new Date(data.usuario.date).toLocaleDateString('es-MX')
                  : '—'}
              </p>
            </div>
          </div>
          <div className='flex items-center gap-3 bg-Neutral-900/50 rounded-xl p-3'>
            <div className='w-9 h-9 rounded-lg bg-Orange-500/15 text-Orange-500 flex items-center justify-center'>
              <IconMail className='w-4 h-4' />
            </div>
            <div>
              <p className='text-Neutral-500 text-xs'>Tickets generados</p>
              <p className='text-Neutral-0 text-sm font-bold'>
                {data?.tickets?.length ?? 0}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets */}
      <h2 className='text-2xl font-bold text-Neutral-0 mb-4'>Mis tickets</h2>

      {loading && (
        <p className='text-Neutral-500 text-center py-10'>Cargando...</p>
      )}

      {!loading && data?.tickets && data.tickets.length === 0 && (
        <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-2xl p-10 text-center'>
          <p className='text-Neutral-500 mb-4'>
            Todavía no has generado ningún ticket.
          </p>
          <button
            onClick={() => setView('home')}
            className='inline-flex items-center gap-2 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold px-5 py-2.5 rounded-xl cursor-pointer'
          >
            Generar mi primer ticket
          </button>
        </div>
      )}

      {!loading && data?.tickets && data.tickets.length > 0 && (
        <>
          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 mb-6'>
            {data.tickets.map((t) => {
              const active = selected?.id === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t)}
                  className={`text-left rounded-2xl p-4 border cursor-pointer transition-colors ${
                    active
                      ? 'bg-Orange-700 border-Orange-500 text-Neutral-900'
                      : 'bg-Neutral-900/40 border-Neutral-700 text-Neutral-0 hover:bg-Neutral-900/70'
                  }`}
                >
                  <p
                    className={`text-xs uppercase tracking-wider mb-1 ${
                      active ? 'text-Neutral-900/70' : 'text-Neutral-500'
                    }`}
                  >
                    Ticket
                  </p>
                  <p className='text-xl font-mono font-bold'>
                    #{t.num_ticket}
                  </p>
                  <p
                    className={`text-xs mt-1 ${
                      active ? 'text-Neutral-900/70' : 'text-Neutral-500'
                    }`}
                  >
                    {t.date
                      ? new Date(t.date).toLocaleDateString('es-MX')
                      : CONFERENCE.shortDate}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Selected ticket preview */}
          {selected && (
            <div className='bg-Neutral-900/40 border border-Neutral-700 rounded-3xl p-6'>
              <div className='flex flex-col md:flex-row md:items-center justify-between mb-6 gap-3'>
                <div>
                  <p className='text-Neutral-500 text-xs uppercase tracking-wider mb-1'>
                    Vista previa
                  </p>
                  <p className='text-Neutral-0 font-bold'>
                    Ticket #{selected.num_ticket}
                  </p>
                </div>
                <button
                  onClick={handleDownload}
                  disabled={downloading}
                  className='flex items-center gap-2 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold px-5 py-2.5 rounded-xl cursor-pointer disabled:opacity-60'
                >
                  <IconDownload className='w-5 h-5' />
                  {downloading ? 'Descargando...' : 'Descargar'}
                </button>
              </div>
              <Ticket
                ref={ticketRef}
                ticketNumber={selected.num_ticket}
                name={data.usuario.name}
                github={data.usuario.github ?? ''}
              />
            </div>
          )}
        </>
      )}
    </section>
  );
};
