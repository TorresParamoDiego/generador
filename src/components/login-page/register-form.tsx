import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { TextInput } from '../ticket-form-page/form/text-input';
import { Button } from '../ticket-form-page/form/button';
import { useAuthStore } from '../../store/auth';
import { IconInfo } from '../../assets/icon-info';
import { API_ENDPOINTS } from '../../config';

type RegisterInputs = {
  name: string;
  email: string;
  github: string;
  password: string;
};

export const RegisterForm = () => {
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<RegisterInputs>();

  const onSubmit: SubmitHandler<RegisterInputs> = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.REGISTER, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || 'Error al registrarse');
        return;
      }
      setAuthenticated(true);
    } catch {
      setServerError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
      <TextInput
        {...register('name', { required: 'El nombre es obligatorio' })}
        label='Nombre completo'
        placeholder='Jonathan Kristof'
        isError={!!errors.name}
        errorMessage={errors.name?.message}
      />
      <TextInput
        {...register('email', {
          required: 'El correo es obligatorio',
          pattern: {
            value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/i,
            message: 'Ingresa un correo válido',
          },
        })}
        label='Correo electrónico'
        placeholder='tu@correo.com'
        type='email'
        isError={!!errors.email}
        errorMessage={errors.email?.message}
      />
      <TextInput
        {...register('github')}
        label='GitHub (opcional)'
        placeholder='@tuusuario'
      />
      <TextInput
        {...register('password', { required: 'La contraseña es obligatoria' })}
        label='Contraseña'
        placeholder='••••••••'
        type='password'
        isError={!!errors.password}
        errorMessage={errors.password?.message}
      />
      {serverError && (
        <p className='flex gap-1 items-center text-Orange-500'>
          <IconInfo />
          {serverError}
        </p>
      )}
      <Button label={loading ? 'Registrando...' : 'Crear cuenta'} disabled={loading} />
    </form>
  );
};
