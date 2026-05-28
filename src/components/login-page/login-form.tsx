import { useForm, type SubmitHandler } from 'react-hook-form';
import { useState } from 'react';
import { TextInput } from '../ticket-form-page/form/text-input';
import { Button } from '../ticket-form-page/form/button';
import { useAuthStore } from '../../store/auth';
import { IconInfo } from '../../assets/icon-info';
import { API_ENDPOINTS } from '../../config';

type LoginInputs = {
  email: string;
  password: string;
};

export const LoginForm = () => {
  const [serverError, setServerError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const setAuthenticated = useAuthStore((s) => s.setAuthenticated);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginInputs>();

  const onSubmit: SubmitHandler<LoginInputs> = async (data) => {
    setServerError('');
    setLoading(true);
    try {
      const res = await fetch(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) {
        setServerError(json.error || 'Error al iniciar sesión');
        return;
      }
      setAuthenticated(true, json.usuario);
    } catch {
      setServerError('No se pudo conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className='flex flex-col gap-6' onSubmit={handleSubmit(onSubmit)}>
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
      <Button label={loading ? 'Iniciando sesión...' : 'Iniciar Sesión'} disabled={loading} />
    </form>
  );
};
