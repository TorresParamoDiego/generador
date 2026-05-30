import { useEffect, useState } from 'react';
import { Modal } from './modal';
import { UserForm, type UserFormData } from './user-form';
import { API_URL } from '../../config';

interface UserRow {
  id: number;
  name: string;
  email: string;
  github: string | null;
  date: string;
  role: string;
}

export const UsersTable = () => {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [error, setError] = useState('');

  const [createOpen, setCreateOpen] = useState(false);
  const [editing, setEditing] = useState<UserRow | null>(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch(`${API_URL}/api/admin/usuarios`);
      const json = await res.json();
      setUsers(json);
    } catch {
      setError('No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('¿Eliminar este usuario y todos sus tickets?')) return;
    try {
      const res = await fetch(`${API_URL}/api/admin/usuarios/${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((u) => u.id !== id));
      } else {
        const json = await res.json();
        alert(json.error || 'Error al eliminar');
      }
    } catch {
      alert('Error al eliminar el usuario');
    }
  };

  const handleCreate = async (data: UserFormData): Promise<string | null> => {
    try {
      const res = await fetch(`${API_URL}/api/admin/usuarios`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) return json.error || 'Error al crear';
      setCreateOpen(false);
      fetchUsers();
      return null;
    } catch {
      return 'No se pudo conectar con el servidor';
    }
  };

  const handleUpdate = async (data: UserFormData): Promise<string | null> => {
    if (!editing) return 'No hay usuario seleccionado';
    try {
      const body = { ...data };
      if (!body.password) {
        // No enviar password vacío para no sobrescribirla
        const { password: _p, ...rest } = body;
        const res = await fetch(
          `${API_URL}/api/admin/usuarios/${editing.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rest),
          }
        );
        const json = await res.json();
        if (!res.ok) return json.error || 'Error al actualizar';
      } else {
        const res = await fetch(
          `${API_URL}/api/admin/usuarios/${editing.id}`,
          {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
          }
        );
        const json = await res.json();
        if (!res.ok) return json.error || 'Error al actualizar';
      }
      setEditing(null);
      fetchUsers();
      return null;
    } catch {
      return 'No se pudo conectar con el servidor';
    }
  };

  const filtered = users.filter((u) => {
    const q = search.toLowerCase();
    return (
      u.name.toLowerCase().includes(q) ||
      u.email.toLowerCase().includes(q) ||
      u.github?.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5'>
        <input
          type='text'
          placeholder='Buscar por nombre, correo o GitHub...'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='flex-1 bg-Neutral-900/40 border border-Neutral-700 rounded-xl px-4 py-3 text-Neutral-0 placeholder:text-Neutral-500'
        />
        <button
          onClick={fetchUsers}
          className='px-5 py-3 bg-Neutral-900/40 border border-Neutral-700 rounded-xl text-Neutral-0 hover:bg-Neutral-900 cursor-pointer'
        >
          ↻ Recargar
        </button>
        <button
          onClick={() => setCreateOpen(true)}
          className='px-5 py-3 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold rounded-xl cursor-pointer'
        >
          + Nuevo usuario
        </button>
      </div>

      {loading && <p className='text-Neutral-500 text-center py-10'>Cargando usuarios...</p>}
      {error && <p className='text-Orange-500 text-center py-10'>{error}</p>}

      {!loading && !error && (
        <div className='overflow-x-auto rounded-2xl border border-Neutral-700'>
          <table className='w-full text-left'>
            <thead className='bg-Neutral-900/60 text-Neutral-500 text-sm uppercase tracking-wider'>
              <tr>
                <th className='px-4 py-3'>ID</th>
                <th className='px-4 py-3'>Nombre</th>
                <th className='px-4 py-3'>Correo</th>
                <th className='px-4 py-3'>GitHub</th>
                <th className='px-4 py-3'>Registro</th>
                <th className='px-4 py-3 text-right'>Acciones</th>
              </tr>
            </thead>
            <tbody className='text-Neutral-0'>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className='text-center py-10 text-Neutral-500'>
                    Sin usuarios que coincidan
                  </td>
                </tr>
              ) : (
                filtered.map((u) => (
                  <tr key={u.id} className='border-t border-Neutral-700 hover:bg-Neutral-900/30'>
                    <td className='px-4 py-3 font-mono text-Neutral-500'>{u.id}</td>
                    <td className='px-4 py-3 font-bold'>{u.name}</td>
                    <td className='px-4 py-3 text-sm'>{u.email}</td>
                    <td className='px-4 py-3 text-sm text-Neutral-500'>
                      {u.github || '—'}
                    </td>
                    <td className='px-4 py-3 text-sm text-Neutral-500'>
                      {u.date ? new Date(u.date).toLocaleDateString() : '—'}
                    </td>
                    <td className='px-4 py-3 text-right'>
                      <button
                        onClick={() => setEditing(u)}
                        className='text-Neutral-0 hover:text-Orange-500 text-sm font-bold cursor-pointer mr-4'
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => handleDelete(u.id)}
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

      <Modal
        open={createOpen}
        title='Nuevo usuario'
        onClose={() => setCreateOpen(false)}
      >
        <UserForm
          onSubmit={handleCreate}
          onCancel={() => setCreateOpen(false)}
          submitLabel='Crear'
        />
      </Modal>

      <Modal
        open={!!editing}
        title={`Editar ${editing?.name ?? ''}`}
        onClose={() => setEditing(null)}
      >
        {editing && (
          <UserForm
            initial={{
              id: editing.id,
              name: editing.name,
              email: editing.email,
              github: editing.github ?? '',
              password: '',
              role: editing.role as 'user' | 'admin',
            }}
            onSubmit={handleUpdate}
            onCancel={() => setEditing(null)}
            submitLabel='Guardar cambios'
          />
        )}
      </Modal>
    </div>
  );
};
