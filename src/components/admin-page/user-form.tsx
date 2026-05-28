import { useState, useEffect, type FormEvent } from 'react';

export interface UserFormData {
  id?: number;
  name: string;
  email: string;
  github: string;
  password: string;
  role: 'user' | 'admin';
}

interface Props {
  initial?: Partial<UserFormData>;
  onSubmit: (data: UserFormData) => Promise<string | null>;
  onCancel: () => void;
  submitLabel?: string;
}

export const UserForm = ({
  initial,
  onSubmit,
  onCancel,
  submitLabel = 'Guardar',
}: Props) => {
  const [name, setName] = useState(initial?.name ?? '');
  const [email, setEmail] = useState(initial?.email ?? '');
  const [github, setGithub] = useState(initial?.github ?? '');
  const [password, setPassword] = useState(initial?.password ?? '');
  const [role, setRole] = useState<'user' | 'admin'>(initial?.role ?? 'user');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setName(initial?.name ?? '');
    setEmail(initial?.email ?? '');
    setGithub(initial?.github ?? '');
    setPassword(initial?.password ?? '');
    setRole(initial?.role ?? 'user');
  }, [initial]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const errorMsg = await onSubmit({ name, email, github, password, role });
    setLoading(false);
    if (errorMsg) setError(errorMsg);
  };

  const inputClass =
    'w-full bg-Neutral-900/40 border border-Neutral-700 rounded-xl px-4 py-3 text-Neutral-0 placeholder:text-Neutral-500 focus:border-Orange-500 outline-none';

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <div>
        <label className='block text-Neutral-500 text-sm mb-2'>Nombre</label>
        <input
          type='text'
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className='block text-Neutral-500 text-sm mb-2'>Correo</label>
        <input
          type='email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={inputClass}
          required
        />
      </div>
      <div>
        <label className='block text-Neutral-500 text-sm mb-2'>GitHub</label>
        <input
          type='text'
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className={inputClass}
          placeholder='@usuario'
        />
      </div>
      <div>
        <label className='block text-Neutral-500 text-sm mb-2'>
          Contraseña {initial?.id && '(deja vacío para no cambiarla)'}
        </label>
        <input
          type='text'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={inputClass}
          required={!initial?.id}
        />
      </div>
      <div>
        <label className='block text-Neutral-500 text-sm mb-2'>Rol</label>
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as 'user' | 'admin')}
          className={inputClass}
        >
          <option value='user'>Usuario</option>
          <option value='admin'>Administrador</option>
        </select>
      </div>

      {error && (
        <p className='text-Orange-500 text-sm bg-Orange-500/10 border border-Orange-500/30 rounded-lg px-3 py-2'>
          {error}
        </p>
      )}

      <div className='flex gap-3 mt-2'>
        <button
          type='button'
          onClick={onCancel}
          className='flex-1 py-3 border border-Neutral-700 rounded-xl text-Neutral-0 hover:bg-Neutral-700 cursor-pointer'
        >
          Cancelar
        </button>
        <button
          type='submit'
          disabled={loading}
          className='flex-1 py-3 bg-Orange-700 hover:bg-Orange-500 text-Neutral-900 font-bold rounded-xl cursor-pointer disabled:opacity-50'
        >
          {loading ? 'Guardando...' : submitLabel}
        </button>
      </div>
    </form>
  );
};
