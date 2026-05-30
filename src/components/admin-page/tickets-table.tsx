import { useEffect, useState } from 'react';
import { Modal } from './modal';
import { API_URL } from '../../config';

interface TicketRow {
  id: number;
  num_ticket: number;
  user_id: number;
  date: string;
  Usuario: { id: number; name: string; email: string; github: string } | null;
}

interface UserOption {
  id: number;
  name: string;
  email: string;
}

export const TicketsTable = () => {
  const [tickets, setTickets] = useState<TicketRow[]>([]);
  const [users, setUsers] = useState<UserOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<TicketRow | null>(null);
  const [selectedUser, setSelectedUser] = useState<number | ''>('');
  const [actionError, setActionError] = useState('');

  const fetchTickets = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/tickets`);
      const json = await res.json();
      setTickets(json);
    } catch {
      setError('No se pudieron cargar los tickets');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch(`${API_URL}/api/admin/usuarios`);
      const json = await res.json();
      setUsers(json.map((u: UserOption) => ({ id: u.id, name: u.name, email: u.email })));
    } catch {
      // silent
    }
  };

  useEffect(() => {
    fetchTickets();
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este ticket?')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/tickets/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setTickets((prev) => prev.filter((t) => t.id !== id));
      }
    } catch {
      alert('Error al eliminar el ticket');
    }
  };

  const openCreate = () => {
    setActionError('');
    setSelectedUser('');
    setCreateOpen(true);
  };

  const openEdit = (t: TicketRow) => {
    setActionError('');
    setSelectedUser(t.user_id);
    setEditing(t);
  };

  const handleCreate = async () => {
    if (!selectedUser) {
      setActionError('Selecciona un usuario');
      return;
    }
    try {
      const res = await fetch(`${API_URL}/api/admin/tickets`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: selectedUser }),
      });
      const json = await res.json();
      if (!res.ok) {
        setActionError(json.error || 'Error al crear');
        return;
      }
      setCreateOpen(false);
      fetchTickets();
    } catch {
      setActionError('No se pudo conectar con el servidor');
    }
  };

  const handleUpdate = async () => {
    if (!editing) return;
    if (!selectedUser) {
      setActionError('Selecciona un usuario');
      return;
    }
    try {
      const res = await fetch(
        `${API_URL}/api/admin/tickets/${editing.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ user_id: selectedUser }),
        }
      );
      const json = await res.json();
      if (!res.ok) {
        setActionError(json.error || 'Error al reasignar');
        return;
      }
      setEditing(null);
      fetchTickets();
    } catch {
      setActionError('No se pudo conectar con el servidor');
    }
  };

  const filtered = tickets.filter((t) => {
    const q = search.toLowerCase();
    return (
      String(t.num_ticket).includes(q) ||
      t.Usuario?.name.toLowerCase().includes(q) ||
      t.Usuario?.email.toLowerCase().includes(q)
    );
  });

  const inputClass =
    'w-full bg-Neutral-900/40 border border-Neutral-700 rounded-xl px-4 py-3 text-Neutral-0 placeholder:text-Neutral-500 focus:border-Orange-500 outline-none';

  return (
    <div>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5'>
        <input
          type='text'
          placeholder='Buscar por número, nombre o correo...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 bg-Neutral-900/40 border border-Neutral-700 rounded-xl px-4 py-3 text-Neutral-0 placeholder:text-Neutral-500'
        />
        <button
          onClick={fetchTickets}
          className='px-5 py-3 bg-Neutral-900/40 border border-Neutral-700 rounded-xl text-Neutral-0 hover:bg-Neutral-900 cursor-pointer'
        >
          ↻ Recargar
        </button>
        <button
          onClick={openCreate}
          className='px-5 py-3 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold rounded-xl cursor-pointer'
        >
          + Nuevo ticket
        </button>
      </div>

      {loading && <p className='text-Neutral-500 text-center py-10'>Cargando tickets...</p>}
      {error && <p className='text-Orange-500 text-center py-10'>{error}</p>}

      {!loading && !error && (
        <div className='overflow-x-auto rounded-2xl border border-Neutral-700'>
          <table className='w-full text-left'>
            <thead className='bg-Neutral-900/60 text-Neutral-500 text-sm uppercase tracking-wider'>
              <tr>
                <th className='px-4 py-3'>#Ticket</th>
                <th className='px-4 py-3'>Usuario</th>
                <th className='px-4 py-3'>Correo</th>
                <th className='px-4 py-3'>GitHub</th>
                <th className='px-4 py-3'>Fecha</th>
                <th className='px-4 py-3 text-right'>Acciones</th>
              </tr>
            </thead>
            <tbody className='text-Neutral-0'>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-10 text-Neutral-500'>
                    Sin tickets que coincidan
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr key={t.id} className='border-t border-Neutral-700 hover:bg-Neutral-900/30'>
                    <td className='px-4 py-3 font-mono text-Orange-500'>
                      #{t.num_ticket}
                    </td>
                    <td className='px-4 py-3'>{t.Usuario?.name || '—'}</td>
                    <td className='px-4 py-3 text-sm'>{t.Usuario?.email || '—'}</td>
                    <td className='px-4 py-3 text-sm text-Neutral-500'>
                      {t.Usuario?.github || '—'}
                    </td>
                    <td className='px-4 py-3 text-sm text-Neutral-500'>
                      {t.date ? new Date(t.date).toLocaleDateString() : '—'}
                    </td>
                    <td className='px-4 py-3 text-right'>
                      <button
                        onClick={() => openEdit(t)}
                        className='text-Neutral-0 hover:text-Orange-500 text-sm font-bold cursor-pointer mr-4'
                      >
                        Reasignar
                      </button>
                      <button
                        onClick={() => handleDelete(t.id)}
                        className='text-Orange-500 hover:text-Orange-700 text-sm font-bold cursor-pointer'
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Crear */}
      <Modal
        open={createOpen}
        title='Nuevo ticket'
        onClose={() => setCreateOpen(false)}
      >
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-Neutral-500 text-sm mb-2'>
              Asignar al usuario
            </label>
            <select
              value={selectedUser}
              onChange={(e) =>
                setSelectedUser(e.target.value ? Number(e.target.value) : '')
              }
              className={inputClass}
            >
              <option value=''>-- Selecciona un usuario --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>
          <p className='text-Neutral-500 text-xs'>
            El número de ticket se genera automáticamente.
          </p>
          {actionError && (
            <p className='text-Orange-500 text-sm bg-Orange-500/10 border border-Orange-500/30 rounded-lg px-3 py-2'>
              {actionError}
            </p>
          )}
          <div className='flex gap-3 mt-2'>
            <button
              onClick={() => setCreateOpen(false)}
              className='flex-1 py-3 border border-Neutral-700 rounded-xl text-Neutral-0 hover:bg-Neutral-700 cursor-pointer'
            >
              Cancelar
            </button>
            <button
              onClick={handleCreate}
              className='flex-1 py-3 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold rounded-xl cursor-pointer'
            >
              Crear ticket
            </button>
          </div>
        </div>
      </Modal>

      {/* Reasignar */}
      <Modal
        open={!!editing}
        title={`Reasignar ticket #${editing?.num_ticket ?? ''}`}
        onClose={() => setEditing(null)}
      >
        <div className='flex flex-col gap-4'>
          <div>
            <label className='block text-Neutral-500 text-sm mb-2'>
              Nuevo usuario
            </label>
            <select
              value={selectedUser}
              onChange={(e) =>
                setSelectedUser(e.target.value ? Number(e.target.value) : '')
              }
              className={inputClass}
            >
              <option value=''>-- Selecciona un usuario --</option>
              {users.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.email})
                </option>
              ))}
            </select>
          </div>
          {actionError && (
            <p className='text-Orange-500 text-sm bg-Orange-500/10 border border-Orange-500/30 rounded-lg px-3 py-2'>
              {actionError}
            </p>
          )}
          <div className='flex gap-3 mt-2'>
            <button
              onClick={() => setEditing(null)}
              className='flex-1 py-3 border border-Neutral-700 rounded-xl text-Neutral-0 hover:bg-Neutral-700 cursor-pointer'
            >
              Cancelar
            </button>
            <button
              onClick={handleUpdate}
              className='flex-1 py-3 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold rounded-xl cursor-pointer'
            >
              Guardar
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
